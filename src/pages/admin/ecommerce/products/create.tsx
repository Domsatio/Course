import React from 'react'
import FormInput from '@/components/admin/FormInput'
import { FormInputList } from '../../../../constants/admin/InputLists/inputLayoutProduct'
import { productServices } from '@/services/serviceGenerator'
import GenerateMetaData from '@/components/GenerateMetaData'

export default function Create() {
  return (
    <div>
      <GenerateMetaData title="Create Product" desc="Create Product Page" />
      <FormInput
        title="Create Product"
        inputList={FormInputList}
        method='POST'
        service={productServices}
      />
    </div>
  )
}
