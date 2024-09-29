import AccountLayout from '@/layouts/client/account'
import { userServices } from '@/services/serviceGenerator';
import { Alert, Button } from '@material-tailwind/react'
import { object } from "yup";
import { useFormik } from 'formik';
import { FC, useEffect, useState } from 'react';
import { InputList } from '../../../constants/client/InputLists/settings.InputList';
import InputRender from '@/components/client/InputRender';
import { useSession } from "next-auth/react"
import type { AlertProps } from "@material-tailwind/react";
import GenerateMetaData from '@/components/GenerateMetaData';

type AlertState = {
  open: boolean;
  message: string;
  color: AlertProps["color"];
}

const ClientAccountDetailsPage: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [displayAlert, setDisplayAlert] = useState<AlertState>({
    open: false,
    message: '',
    color: 'green'
  })

  const { data: session } = useSession()
  const id = session?.user?.id;

  const initialValues = InputList.reduce((acc: Record<string, any>, item) => {
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
    onSubmit: async ({ name, email, currentPassword, newPassword, confirmNewPassword }) => {
      setIsLoading(true)

      if (newPassword || confirmNewPassword) {
        if (newPassword !== confirmNewPassword) {
          formik.setErrors({
            newPassword: 'Password does not match',
            confirmNewPassword: 'Password does not match'
          })
          setIsLoading(false)
          return
        }
      }

      const payload: any = { name, email }

      if (currentPassword || newPassword) {
        payload.currentPassword = currentPassword
        payload.newPassword = newPassword
      }

      try {
        await userServices.updateItem(payload, { id })
        setDisplayAlert({
          open: true,
          message: 'Successfully updated',
          color: 'green'
        })
      } catch (error: any) {
        setIsLoading(false)
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
      const { data: { data } } = await userServices.getItem({ id })
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
    if (!id) return
    fetchData()
  }, [id])

  return (
    <AccountLayout>
      <GenerateMetaData title='Account Settings' desc='Account settings page' />
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
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </form>
    </AccountLayout>
  )
}

export default ClientAccountDetailsPage