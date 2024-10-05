import { useState } from 'react';
import AccountLayout from '@/layouts/client/account'
import { Button, Card, CardBody, Chip, Input, Typography } from '@material-tailwind/react'
import GenerateMetaData from '@/components/GenerateMetaData'
import DatePickerComponent from '@/components/DatePicker';
import Image from 'next/image'
import { ConvertCurrency } from '@/helpers/appFunction';
import OrderItem from '@/components/client/OrderItem';

const OrderTab = [
  {
    label: 'All',
    value: 'all'
  },
  {
    label: 'Pending',
    value: 'pending'
  },
  {
    label: 'Processing',
    value: 'processing'
  },
  {
    label: 'Completed',
    value: 'completed'
  },
  {
    label: 'Cancelled',
    value: 'cancelled'
  }
]

const OrderItems = [
  {
    date: '01 Oct 2024',
    invoice: 'INV/20240714/MPL/4025529567',
    status: 'pending',
    products: [
      {
        name: 'KOODO Gecko 60% Layout RGB Mechanical Keyboard Outemu',
        image: 'https://images.unsplash.com/photo-1712396901531-605f06a423aa?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        price: 100000,
        quantity: 3
      },
      {
        name: 'KOODO Gecko 60% Layout RGB Mechanical Keyboard Outemu',
        image: 'https://images.unsplash.com/photo-1712396901531-605f06a423aa?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        price: 100000,
        quantity: 3
      }
    ]
  },
  {
    date: '28 Sep 2024',
    invoice: 'INV/20240714/MPL/4025529567',
    status: 'completed',
    products: [
      {
        name: 'KOODO Gecko 60% Layout RGB Mechanical Keyboard Outemu',
        image: 'https://images.unsplash.com/photo-1712396901531-605f06a423aa?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        price: 100000,
        quantity: 3
      }
    ]
  },
  {
    date: '01 Oct 2024',
    invoice: 'INV/20240714/MPL/4025529567',
    status: 'processing',
    products: [
      {
        name: 'KOODO Gecko 60% Layout RGB Mechanical Keyboard Outemu',
        image: 'https://images.unsplash.com/photo-1712396901531-605f06a423aa?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        price: 100000,
        quantity: 3
      }
    ]
  },
  {
    date: '01 Oct 2024',
    invoice: 'INV/20240714/MPL/4025529567',
    status: 'cancelled',
    products: [
      {
        name: 'KOODO Gecko 60% Layout RGB Mechanical Keyboard Outemu',
        image: 'https://images.unsplash.com/photo-1712396901531-605f06a423aa?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        price: 100000,
        quantity: 3
      }
    ]
  }
]

const ClientAccountOrdersPage = () => {
  return (
    <AccountLayout>
      <GenerateMetaData title='Orders | Account' desc='Orders Page' />
      <div className='space-y-3'>
        <div className='flex gap-2 justify-between'>
          <Input
            crossOrigin={false}
            name='search'
            type='text'
            label='Search Orders'
          />
          <DatePickerComponent />
        </div>
        <div className="flex items-center gap-2">
          {OrderTab.map(({ label }) => (
            <Button
              key={label}
              variant='outlined'
              size='sm'
              className='border-gray-600 capitalize font-semibold'
              ripple={false}
            >
              {label}
            </Button>
          ))}
          <Button
            variant='text'
            size='sm'
            className='capitalize font-semibold'
            ripple={false}
          >
            Reset
          </Button>
        </div>
        <div className='space-y-5'>
          {OrderItems.map((order, index: number) =>
            <OrderItem key={index} date={order.date} invoice={order.invoice} products={order.products} status={order.status} />
          )}
        </div>
      </div>
    </AccountLayout>
  )
}

export default ClientAccountOrdersPage