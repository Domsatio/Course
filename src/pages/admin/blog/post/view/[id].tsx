import React, {useState} from 'react'
import { useRouter } from 'next/router'
import { DetailPage, NullProof } from '@/helpers/appFunction'

export default function view() {
  const { Page, data } = DetailPage({
    api: "/post",
  })
  return (
    <Page title='Post'>
      <div>
        <div>
          <h3>Product Name</h3>
          <p>{NullProof({input:data, params:'name'})}</p>
        </div>
        <div>
          <h3>Product Name</h3>
          <p>{NullProof({input:data, params:'price', type:"currency"})}</p>
        </div>
        <div>
          <h3>Product Name</h3>
          <p>{NullProof({input:data, params:'updatedAt', type:"date"})}</p>
        </div>
      </div>
    </Page>
  )
}


