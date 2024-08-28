"use client"
import React from 'react'
import FormInput from '@/components/FormInput'
import { FormInputList } from './inputLayout'

export default function tambah() {
  return (
    <div>
      <FormInput
        title="Tambah Produk"
        inputList={FormInputList}
        route={{
          url: "/products",
          query: {},
          method: "POST",
        }}
      />
    </div>
  )
}
