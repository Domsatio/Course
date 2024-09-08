"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
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

interface FormInputProps {
  title: string;
  inputList: InputListProps[];
  method: "POST" | "PUT" | "GET";
  id?: string
  service: any
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
  id = '',
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
            (item.component || []).reduce((acc: Record<string, any>, component) => {
              acc[component.name] = component.validator || Yup.string();
              return acc;
            }, {})
          )
        );
      } else {
        acc[item.name] = item.validator || Yup.string();
      }
      // acc[item.name] = item.validator || Yup.string(); // Default to Yup.string() if no validator is provided
      return acc;
    }, {})
  );

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      // const containsFile = inputList.some((input) => input.type === "image");
      // if (containsFile) {
      //   Object.keys(values).forEach((key) => {
      //     formData.append(key, values[key]);
      //   });
      // }
      try {
        let response;
        if (method === "POST") {
          response = await service.addItem(values)
        } else if (method === "PUT") {
          response = await service.updateItem(values, { id })
        } else {
          response = await service.getItems()
        }

        if (response?.data && onSuccess) {
          onSuccess(response.data.data);
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
    // if (formik.touched[name]) {
    //   formik.setFieldTouched(name, false);
    // }
    if (isFilter) {
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          [name]: value,
        },
      });
    }
  };

  useEffect(() => {
    console.log("formik.values", formik.values);
  }, [formik.values]);

  useEffect(() => {
    if (method === "PUT") {
      fetchData();
    }
  }, [method]);

  const fetchData = async () => {
    try {
      const { data: { data } } = await service.getItems({ id })
      Object.keys(data).forEach((key) => {
        inputList.filter((input) => input.name === key).length > 0 && formik.setFieldValue(key, data[key]);
      })
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  //   const handleSubmit = async (e: any) => {
  //     e.preventDefault();
  //     try {
  //       let response;
  //       const url = new URL(route.url);
  //       Object.keys(route.query).forEach((key) =>
  //         url.searchParams.append(key, route.query[key])
  //       );
  //       if (route.method === "POST") {
  //         response = await axios.post(url.toString(), formik.values);
  //       } else if (route.method === "PUT") {
  //         response = await axios.put(url.toString(), formik.values);
  //       } else {
  //         response = await axios.get(url.toString());
  //       }

  //       if (onSuccess) {
  //         onSuccess(response.data.data);
  //       }
  //     } catch (error) {
  //       console.log("error", error);
  //     }
  //   };

  const clearForm = () => {
    formik.resetForm();
  };

  const renderFormContent = () => (
    <>
      {inputList.map((input, index) => {
        if (input.type === "component") {
          return (
            <div key={index} className="flex flex-col">
              <label>{input.label}</label>
              {formik.values[input.name] &&
                formik.values[input.name]?.map((item: any, i: number) => (
                  <div key={i}>
                    {input.component?.map((component, ii) => (
                      <InputListRenderer
                        key={ii}
                        {...component}
                        value={item[component.name]}
                        onChange={(e: any) => {
                          const { name, value } = e.target;
                          console.log("name", name);
                          console.log("value", value);
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
                        error={formik.errors[component.name]?.toString() || ""}
                      />
                    ))}
                    <Button
                      color="red"
                      size="sm"
                      className="p-2 mb-2"
                      onClick={() => {
                        const newValues = formik.values[input.name].filter(
                          (removItem: any, idx: number) => i !== idx
                        );
                        formik.setFieldValue(input.name, newValues);
                      }}
                    >
                      <TrashIcon className="h-5 w-5" />
                    </Button>
                  </div>
                ))}
              <div className="flex justify-center mb-3">
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
            }
            clearForm();
          }}
        >
          Cancel
        </Button>
        <Button type="submit" className="btn" color="green" disabled={disabled}>
          Create
        </Button>
      </div>
    </>
  );

  if (asModal) {
    return (
      <Dialog open={asModal.isOpen} handler={() => asModal.handler(true)}>
        <DialogHeader color="blue">{title}</DialogHeader>
        <DialogBody>
          <form onSubmit={formik.handleSubmit}>{renderFormContent()}</form>
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
        <form onSubmit={formik.handleSubmit}>{renderFormContent()}</form>
      </CardBody>
    </Card>
  );
}
