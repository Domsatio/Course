import { Button, Card, CardBody, Chip, Typography } from '@material-tailwind/react'
import React, { FC } from 'react'
import Image from 'next/image'
import { ConvertCurrency } from '@/helpers/appFunction'

type OrderItemProps = {
  date: string
  invoice: string
  status: string
  products: {
    name: string
    image: string
    price: number
    quantity: number
  }[]
}

const OrderStatus = (status: string) => {
  if (status === 'pending') {
    return <Chip color='yellow' size='sm' value={status} className='capitalize' />
  } else if (status === 'processing') {
    return <Chip color='blue' size='sm' value={status} className='capitalize' />
  } else if (status === 'completed') {
    return <Chip color='green' size='sm' value={status} className='capitalize' />
  } else if (status === 'cancelled') {
    return <Chip color='red' size='sm' value={status} className='capitalize' />
  } else {
    return <Chip color='gray' size='sm' value={status} className='capitalize' />
  }
}

const OrderItem: FC<OrderItemProps> = ({ date, invoice, products, status }) => {
  return (
    <Card className='shadow-none border border-gray-300'>
      <CardBody className='p-0 space-y-2'>
        <div className='p-2 flex justify-between items-center border-b border-gray-300'>
          <div className='ml-1 flex gap-2'>
            <Typography color='black' variant='small'>{date}</Typography>
            <Typography variant='small'>{invoice}</Typography>
          </div>
          {OrderStatus(status)}
        </div>
        {products.map(({ image, name, price, quantity }, index) =>
          <div key={index} className='px-4 flex gap-4'>
            <div className="w-20 h-20 relative">
              <Image
                src={image}
                alt={`${name} image`}
                className="w-full h-full object-contain"
                height={60}
                width={60}
              />
            </div>
            <div>
              <Typography color='black' variant='paragraph' className='line-clamp-1'>{name}</Typography>
              <Typography color='gray' variant='small'>{quantity} x <span className='font-semibold text-black'>{ConvertCurrency(price)}</span></Typography>
            </div>
          </div>
        )}
        <div className='p-2 flex justify-between items-center border-t border-gray-300'>
          <Typography color='black' variant='small' className='ml-2'>Total Price: <span className='font-semibold'>{ConvertCurrency(100000)}</span></Typography>
          <Button
            size='sm'
            variant='text'
            className='capitalize font-semibold'
            ripple={false}
          >
            Detail
          </Button>
        </div>
      </CardBody>
    </Card>
  )
}

export default OrderItem