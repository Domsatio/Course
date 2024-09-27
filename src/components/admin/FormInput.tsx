import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FormikErrors, useFormik } from "formik";
import * as Yup from "yup";
import { InputListProps } from "@/types/form.type";
import { InputListRenderer } from "./InputTemplate";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Card,
  CardHeader,
  CardBody,
  IconButton,
} from "@material-tailwind/react";
import { getQueryParams, convertStringToBoolean } from "@/helpers/appFunction";
import { children } from "@material-tailwind/react/types/components/accordion";
import { ArrowLeftIcon, PlusIcon } from "@heroicons/react/24/solid";
import { cn } from "@/libs/cn";
import toast from 'react-hot-toast';

interface FormInputProps {
  title?: string;
  inputList: InputListProps[];
  method: "POST" | "PUT" | "GET";
  id?: string;
  service: any;
  onSubmit?: (data?: any) => void;
  onSuccess?: (data: any) => void;
  onChange?: (e: any) => void;
  asModal?: {
    isOpen: boolean;
    handler: (value: boolean) => void | undefined;
  };
  isFilter?: boolean;
  redirect?: string | false;
  isUseHeader?: boolean;
  customCard?: (child: children) => JSX.Element;
  isUseCancelButton?: boolean;
  CustomButtonSubmit?: (loading: boolean) => React.ReactNode;
  toastMessage: {
    success: string;
    error: string;
  }
}

export const FormInput = ({
  title = "",
  inputList,
  method,
  service,
  id = "",
  onSubmit,
  onSuccess,
  onChange,
  asModal,
  isFilter = false,
  redirect,
  isUseHeader = true,
  customCard,
  isUseCancelButton = true,
  CustomButtonSubmit,
  toastMessage,
}: FormInputProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const initialValues = inputList.reduce((acc: Record<string, any>, item) => {
    acc[item.name] = item.value;
    return acc;
  }, {});

  const validationSchema = Yup.object(
    inputList.reduce((acc: Record<string, any>, item) => {
      if (item.type === "component") {
        acc[item.name] = Yup.array().of(
          Yup.object().shape(
            (item.component || []).reduce(
              (acc: Record<string, any>, component) => {
                acc[component.name] = component.validator || Yup.string();
                return acc;
              },
              {}
            )
          )
        );
      } else {
        acc[item.name] = item.validator || Yup.string();
      }
      return acc;
    }, {})
  );

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      let finalValues = values;
      const listInputRemoveOnSubmit = inputList.filter(
        (input) => input.removeOnSubmit === true
      );
      listInputRemoveOnSubmit.forEach((input) => {
        delete finalValues[input.name];
      });
      try {
        let response;
        if (method === "POST") {
          response = await service.addItem(finalValues);
        } else if (method === "PUT") {
          response = await service.updateItem(finalValues, { id });
        } else if (isFilter && !onSubmit) {
          response = await service.getItems({ ...getQueryParams() });
        } else {
          // filter finalValues ​​that are not empty
          const filterQuery = Object.keys(finalValues).reduce(
            (acc: Record<string, any>, key) => {
              if (finalValues[key] !== "") {
                if (Array.isArray(finalValues[key])) {
                  acc[key] = finalValues[key].join(",");
                } else {
                  acc[key] = finalValues[key];
                }
              }
              return acc;
            },
            {}
          );

          const searchQuery =
            router.query.search && router.query.search !== ""
              ? { search: router.query.search }
              : {};
          await router.replace({
            pathname: router.pathname,
            query: {
              ...searchQuery,
              ...filterQuery,
            },
          });
          onSubmit?.(values);
        }

        if (response?.data) {
          onSuccess?.(response.data.data);
        }
        if ((method === "POST" || method === "PUT") && !isFilter) {
          formik.resetForm();
          toast.success(toastMessage.success);
        }

        asModal?.handler(false);
        if (typeof redirect === "string") {
          router.push(redirect);
        } else if (redirect === false) {
          return
        } else if (method === "POST" || method === "PUT") {
          router.back();
        }

      } catch (error) {
        toast.error(toastMessage.error);
        console.error("Form submission error:", error);
      } finally {
        setLoading(false);
      }
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
  };

  useEffect(() => {
    onChange?.(formik);
  }, [formik.values]);

  // a function to take the data to be edited if method is PUT
  const fetchData = async () => {
    try {
      const {
        data: { data },
      } = await service.getItems({ id });
      // set data as required by the form input
      Object.keys(data).forEach((key) => {
        const input = inputList.filter((input) => input.name === key);
        const isOnInputList = input.length > 0;
        if (isOnInputList && !input[0].valueID) {
          formik.setFieldValue(key, data[key]);
        } else if (isOnInputList && input[0].valueID) {
          const ArrayValue = data[key].map((item: any) => {
            const value = input[0].valueID ? item[input[0].valueID] : null;
            return value;
          });
          formik.setFieldValue(key, ArrayValue);
        }
      });
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  useEffect(() => {
    if (method === "PUT") {
      if (!id) return;
      fetchData();
    } else if (isFilter) {
      // get query parameter from url and set it to formik values
      Object.keys(getQueryParams()).forEach((key) => {
        const input: InputListProps =
          inputList.filter((input) => input.name === key)[0] || null;
        const isValueBoolean =
          getQueryParams()[key] === "true" || getQueryParams()[key] === "false";
        const isValueArray = input?.validator.type === "array" || false;
        if (isValueArray) {
          formik.setFieldValue(key, getQueryParams()[key].split(","));
        } else if (input) {
          formik.setFieldValue(
            key,
            isValueBoolean
              ? convertStringToBoolean(getQueryParams()[key])
              : getQueryParams()[key]
          );
        }
      });
    }
  }, [method, id]);

  const resetForm = () => {
    formik.resetForm();
  };

  const parseQueryString = (queryString: string) => {
    return queryString
      .split("&")
      .map((param) => param.split("="))
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
  };

  const buildQueryString = (queryObj: Record<string, any>) => {
    return Object.entries(queryObj)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
  };

  const generateInputForm = () => (
    <Fragment>
      {inputList.map((input: InputListProps, index: number) => {
        const listWatchInput = input.watch ? input.watch.split(",") : [];
        const checkIsDisabled =
          listWatchInput.length > 0
            ? listWatchInput.some(
              (item) =>
                formik.values[item] === "" ||
                (Array.isArray(formik.values[item]) &&
                  formik.values[item].length === 0)
            )
            : false;
        let option_query = input?.option?.query ? input.option.query : null;
        if (option_query && listWatchInput.length > 0) {
          const updateQueryString = (
            array: any[],
            queryString: string,
            formikValues: Record<string, any>
          ) => {
            let queryObj = parseQueryString(queryString);
            array.forEach((key) => {
              if (queryObj[key as keyof typeof queryObj]) {
                (queryObj as Record<string, any>)[key] = formikValues[key];
              }
            });
            return buildQueryString(queryObj);
          }
          option_query = updateQueryString(listWatchInput, option_query, formik.values);
        }

        if (input.type === "component") {
          return (
            <div key={index} className={cn('w-full', input.className)}>
              <label className="after:content-['*'] after:text-red-600 after:ml-1">{input.label}</label>
              {formik.values[input.name] &&
                formik.values[input.name]?.map((item: any, i: number) => (
                  <div key={i} className="flex flex-col p-5 mt-2 rounded-lg border border-gray-300">
                    {/* setup input component */}
                    {input.component?.map(
                      (component: InputListProps, ii: number) => (
                        <InputListRenderer
                          key={ii}
                          {...component}
                          label={`${component.label} ${i + 1}`}
                          value={item[component.name]}
                          onChange={(e: any) => {
                            const { value } = e.target;
                            const newValues = formik.values[input.name].map(
                              (pastValue: any, idx: number) => {
                                if (i === idx) {
                                  pastValue[component.name] = value;
                                }
                                return pastValue;
                              }
                            );
                            formik.setFieldValue(input.name, newValues);
                          }}
                          error={
                            (formik.errors[
                              input.name
                            ] as FormikErrors<any>[][0])
                              ? (
                                formik.errors[
                                input.name
                                ] as FormikErrors<any>[]
                              )[i]?.[component.name]?.toString()
                              : ""
                          }
                        />
                      )
                    )}
                    {/* button to remove input component */}
                    <div className="flex justify-center">
                      <Button
                        color="red"
                        onClick={() => {
                          const newValues = formik.values[input.name].filter(
                            (removeItem: any, idx: number) => i !== idx
                          );
                          formik.setFieldValue(input.name, newValues);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              <div className="flex justify-center my-3">
                {/* button to add new input component */}
                <Button
                  color="blue"
                  className="max-w-max flex items-center gap-2"
                  onClick={() => {
                    const newValues = input.component?.reduce(
                      (acc: Record<string, any>, item) => {
                        acc[item.name] = "";
                        return acc;
                      },
                      {}
                    );
                    formik.setFieldValue(input.name, [
                      ...formik.values[input.name],
                      { ...newValues },
                    ]);
                  }}
                >
                  <PlusIcon className="h-5 w-5" />
                  Add {input.label}
                </Button>
              </div>
            </div>
          );
        }

        return (
          <InputListRenderer
            key={index}
            {...input}
            disabled={input.watch ? checkIsDisabled : input.disabled || false}
            value={formik.values[input.name]}
            option={
              option_query
                ? {
                  ...input.option,
                  query: option_query,
                  type: input.option?.type || "select",
                  id: input.option?.id || "",
                }
                : input.option
            }
            onChange={(data: any) => {
              handleChange(data);
            }}
            error={formik.errors[input.name]?.toString() || ""}
          />
        );
      })}
    </Fragment>
  );

  const Form = () => (
    <form onSubmit={formik.handleSubmit} className='w-full flex flex-wrap gap-x-2'>
      {generateInputForm()}
      <div className="w-full flex justify-end items-center gap-2">
        {isUseCancelButton && (
          <Button
            variant="text"
            color="red"
            onClick={() => {
              if (asModal) {
                asModal.handler(false);
              } else {
                router.back();
                resetForm();
              }
            }}
          >
            Cancel
          </Button>
        )}
        {CustomButtonSubmit ? (
          CustomButtonSubmit(loading)
        ) : (
          <Button
            type="submit"
            className="btn"
            color="green"
            // disabled={disabled}
            loading={loading}
          >
            {method === "PUT" ? "Update" : isFilter ? "Apply" : "Create"}
          </Button>
        )}
      </div>
    </form>
  );

  if (asModal) {
    return (
      <Dialog open={asModal.isOpen} handler={() => asModal.handler(false)}>
        {isUseHeader && <DialogHeader color="blue">{title}</DialogHeader>}
        <DialogBody>
          {customCard ? (
            customCard(
              Form()
            )
          ) : (
            Form()
          )}
        </DialogBody>
      </Dialog>
    );
  }

  return (
    <Fragment>
      {customCard ? (
        customCard(
          Form()
        )
      ) : (
        <Card placeholder='' className="mt-6">
          {isUseHeader && (
            <CardHeader color="blue" className="p-3">
              <div className="flex items-center gap-3">
                <IconButton
                  variant="text"
                  onClick={() => router.back()}
                >
                  <ArrowLeftIcon className="h-5 w-5 text-white" />
                </IconButton>
                <h1>{title}</h1>
              </div>
            </CardHeader>
          )}
          <CardBody>
            {Form()}
          </CardBody>
        </Card>
      )}
    </Fragment>
  );
}
