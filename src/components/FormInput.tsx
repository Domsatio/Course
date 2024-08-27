"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
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
  DialogFooter,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import { Form } from "formik";

interface FormInputProps {
  title: string;
  inputList: InputListProps[];
  route: {
    url: string;
    query: any;
    method: "POST" | "PUT";
  };
  onSuccess?: (data: any) => void;
  asModal?: {
    isOpen: boolean;
    handler: (value: boolean) => void | undefined;
  };
  isFilter?: boolean;
}

export default function FormInput({
  title = "",
  inputList,
  route = { url: "", query: {}, method: "POST" },
  onSuccess,
  asModal,
  isFilter = false,
}: FormInputProps) {
  const router = useRouter();
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
  const createUrl = (route: any) => {
    const url = new URL(route.url, baseUrl);
    Object.entries(route.query).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
    return url.toString();
  };

  const initialValues = inputList.reduce((acc: Record<string, any>, item) => {
    acc[item.name] = item.value || "";
    return acc;
  }, {});

  const validationSchema = Yup.object(
    inputList.reduce((acc: Record<string, any>, item) => {
      acc[item.name] = item.validator || Yup.string(); // Default to Yup.string() if no validator is provided
      return acc;
    }, {})
  );

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        let response;
        if (route.method === "POST") {
          response = await axios.post(createUrl(route), values);
        } else if (route.method === "PUT") {
          response = await axios.put(createUrl(route), values);
        } else {
          response = await axios.get(createUrl(route));
        }

        if (response?.data && onSuccess) {
          onSuccess(response.data.data);
        }
        asModal?.handler(false);
      } catch (error) {
        console.error("Form submission error:", error);
      }
    },
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
    if (formik.touched[name]) {
      formik.setFieldTouched(name, false);
    }
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
    if (route.method === "PUT") {
      fetchData;
    }
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(createUrl(route));
      response.data?.data?.forEach((item: any) => {
        formik.setFieldValue(item.name, item.value);
      });
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
      {inputList.map((input, index) => (
        <InputListRenderer
          key={index}
          {...input}
          value={formik.values[input.name]}
          onChange={(data) => {
            handleChange(data);
          }}
          error={formik.errors[input.name]?.toString() || ""}
        />
      ))}
      <div className="flex justify-end items-center gap-2">
        <Button
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
        <Button type="submit" className="btn btn-primary">
          Submit
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
