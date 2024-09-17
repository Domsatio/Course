import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FormikErrors, useFormik } from "formik";
import * as Yup from "yup";
import { InputListProps } from "@/helpers/typeProps";
import { InputListRenderer } from "./InputTemplate";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { getQueryParams, convertStringToBoolean } from "@/helpers/appFunction";

interface FormInputProps {
  title: string;
  inputList: InputListProps[];
  method: "POST" | "PUT" | "GET";
  id?: string;
  service: any;
  onSubmit?: (data?: any) => void;
  onSuccess?: (data: any) => void;
  asModal?: {
    isOpen: boolean;
    handler: (value: boolean) => void | undefined;
  };
  isFilter?: boolean;
  redirect?: string;
}

export const FormInputHooks = () => {
  const [disabled, setDisabled] = useState(false);
  return { disabled, setDisabled };
};

export default function FormInput({
  title = "",
  inputList,
  method,
  service,
  id = "",
  onSubmit,
  onSuccess,
  asModal,
  isFilter = false,
  redirect,
}: FormInputProps) {
  const { disabled } = FormInputHooks();
  const router = useRouter();

  const initialValues = inputList.reduce((acc: Record<string, any>, item) => {
    acc[item.name] = item.value || "";
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
      try {
        let response;
        if (method === "POST") {
          response = await service.addItem(values);
        } else if (method === "PUT") {
          response = await service.updateItem(values, { id });
        } else if (isFilter && !onSubmit) {
          response = await service.getItems({ ...getQueryParams() });
        } else {
          // filter values ​​that are not empty
          const filterQuery = Object.keys(values).reduce(
            (acc: Record<string, any>, key) => {
              if (values[key] !== "") {
                if (Array.isArray(values[key])) {
                  acc[key] = values[key].join(",");
                } else {
                  acc[key] = values[key];
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
        asModal?.handler(false);
        if (redirect) {
          router.push(redirect);
        } else if (method === "POST" || method === "PUT") {
          router.back();
        }
      } catch (error) {
        console.error("Form submission error:", error);
      }
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
  };

  useEffect(() => {
    console.log("formik.values", formik.values);
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
          console.log(input);
        if (isValueArray) {
          formik.setFieldValue(key, getQueryParams()[key].split(','));
        } else
        if (input) {
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

  const generateInputForm = () => (
    <React.Fragment>
      {inputList.map((input: InputListProps, index: number) => {
        if (input.type === "component") {
          return (
            <div key={index} className="flex flex-col">
              <label>{input.label}</label>
              {formik.values[input.name] &&
                formik.values[input.name]?.map((item: any, i: number) => (
                  <div key={i}>
                    {/* setup input component */}
                    {input.component?.map(
                      (component: InputListProps, ii: number) => (
                        <InputListRenderer
                          key={ii}
                          {...component}
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
                    <Button
                      color="red"
                      size="sm"
                      className="p-2 mb-2"
                      onClick={() => {
                        const newValues = formik.values[input.name].filter(
                          (removeItem: any, idx: number) => i !== idx
                        );
                        formik.setFieldValue(input.name, newValues);
                      }}
                    >
                      <TrashIcon className="h-5 w-5" />
                    </Button>
                  </div>
                ))}
              <div className="flex justify-center mb-3">
                {/* button to add new input component */}
                <Button
                  color="blue"
                  className="max-w-max"
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
                  Add {input.label} +
                </Button>
              </div>
            </div>
          );
        }

        return (
          <InputListRenderer
            key={index}
            {...input}
            value={formik.values[input.name]}
            onChange={(data: any) => {
              handleChange(data);
            }}
            error={formik.errors[input.name]?.toString() || ""}
          />
        );
      })}
      <div className="flex justify-end items-center gap-2">
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
        <Button type="submit" className="btn" color="green" disabled={disabled}>
          {method === "PUT" ? "Update" : isFilter ? "Apply" : "Create"}
        </Button>
      </div>
    </React.Fragment>
  );

  if (asModal) {
    return (
      <Dialog open={asModal.isOpen} handler={() => asModal.handler(true)}>
        <DialogHeader color="blue">{title}</DialogHeader>
        <DialogBody>
          <form onSubmit={formik.handleSubmit}>{generateInputForm()}</form>
        </DialogBody>
      </Dialog>
    );
  }

  return (
    <Card className="mt-6">
      <CardHeader color="blue" className="p-5">
        <h1>{title}</h1>
      </CardHeader>
      <CardBody>
        <form onSubmit={formik.handleSubmit}>{generateInputForm()}</form>
      </CardBody>
    </Card>
  );
}
