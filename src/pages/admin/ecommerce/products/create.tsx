import React from 'react'
import FormInput from '@/components/FormInput'
import { FormInputList } from './inputLayout'
import { productServices } from '@/services/serviceGenerator'

export default function Create() {
  return (
    <div>
      <FormInput
        title="Create Product"
        inputList={FormInputList}
        method='POST'
        service={productServices}
      />
    </div>
  )
}
