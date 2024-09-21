import AccountLayout from '@/layouts/client/account'
import { addressServices } from '@/services/serviceGenerator';
import { Alert, Button } from '@material-tailwind/react'
import { object } from "yup";
import { useFormik } from 'formik';
import { FC, useEffect, useState } from 'react';
import { InputList } from './InputList';
import InputRender from '@/components/client/InputRender';
import { useSession } from "next-auth/react"
import type { AlertProps } from "@material-tailwind/react";

type AlertState = {
  open: boolean;
  message: string;
  color: AlertProps["color"];
}

const ClientAccountAddressPage: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [displayAlert, setDisplayAlert] = useState<AlertState>({
    open: false,
    message: '',
    color: 'green'
  })

  const { data: session } = useSession()
  const userId = session?.user?.id;

  const initialValues: any = InputList.reduce((acc: Record<string, any>, item) => {
    acc[item.name] = item.value || "";
    return acc;
  }, {});

  const validationSchema = object(
    InputList.reduce((acc: Record<string, any>, item) => {
      acc[item.name] = item.validator
      return acc;
    }, {})
  );

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true)

      try {
        await addressServices.updateItem(values, { userId })
        setDisplayAlert({
          open: true,
          message: 'Successfully updated',
          color: 'green'
        })
      } catch (error: any) {
        console.error("Form submission error:", error.response.data.message);
        setDisplayAlert({
          open: true,
          message: error.response.data.message,
          color: 'red'
        })
      }

      setIsLoading(false)
    },
    validateOnChange: false,
    validateOnBlur: false,
  })

  const fetchData = async () => {
    try {
      const { data: { data } } = await addressServices.getItem({ userId })
      Object.keys(data).forEach((key) => {
        if (formik.values.hasOwnProperty(key)) {
          formik.setFieldValue(key, data[key]);
        }
      })
    } catch (error) {
      console.error("Form submission error:", error);
    }
  }

  useEffect(() => {
    if (!userId) return
    fetchData()
  }, [userId])

  return (
    <AccountLayout>
      <form className='space-y-7' onSubmit={formik.handleSubmit}>
        <Alert
          open={displayAlert.open}
          color={displayAlert.color}
          onClose={() => setDisplayAlert({
            open: false,
            message: '',
            color: 'green'
          })}
        >
          {displayAlert.message}
        </Alert>

        {InputList.map(({ id, label, name, type, placeholder, isRequired }) =>
          <InputRender
            key={id}
            id={id}
            name={name}
            label={label}
            type={type}
            value={formik.values[name]}
            placeholder={placeholder}
            isRequired={isRequired}
            onChange={formik.handleChange}
            error={formik.errors[name]?.toString() || ''}
          />
        )}
        <Button type='submit' loading={isLoading}>
          Save Changes
        </Button>
      </form>
    </AccountLayout>
  )
}

export default ClientAccountAddressPage