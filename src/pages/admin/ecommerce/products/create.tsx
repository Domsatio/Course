import React from 'react'
import FormInput from '@/components/FormInput'
import { FormInputList } from './inputLayout'
import { productServices } from '@/services/serviceGenerator'

export default function tambah() {
  return (
    <div>
      <FormInput
        title="Tambah Produk"
        inputList={FormInputList}
        method='POST'
        service={productServices}
      />
    </div>
  )
}
