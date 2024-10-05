import {
  Button, Card, CardBody, Chip, Typography, Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  IconButton,
} from '@material-tailwind/react'
import React, { FC } from 'react'
import Image from 'next/image'
import { ConvertCurrency } from '@/helpers/appFunction'
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid'

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
    return <Chip color='yellow' size='sm' value='Waiting Payment' className='capitalize' />
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

const handleCopyPaymentLink = () => {
  const paymentLink: string = "some kind of payment link"; // FIXME: Replace this with payment link
  navigator.clipboard.writeText(paymentLink);
};

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
          {status === 'pending' ? (
            <div className='space-x-2'>
              <Button
                size='sm'
                className='capitalize font-semibold'
                ripple={false}
                onClick={() => console.log('Pay Now')} // TODO: show payment gateway popup
              >
                Pay Now
              </Button>
              <Menu placement='bottom-end'>
                <MenuHandler>
                  <IconButton size='sm' variant='text'><EllipsisVerticalIcon className='w-4 h-4' /></IconButton>
                </MenuHandler>
                <MenuList className='p-2'>
                  <MenuItem className='p-0'>
                    <Button
                      size='sm'
                      variant='text'
                      className='text-start capitalize font-semibold w-full px-3'
                      ripple={false}
                      onClick={handleCopyPaymentLink}
                    >
                      Copy Payment Link
                    </Button>
                  </MenuItem>
                  <MenuItem className='p-0'>
                    <Button
                      size='sm'
                      color='red'
                      variant='text'
                      className='text-start capitalize font-semibold w-full px-3'
                      ripple={false}
                      onClick={() => console.log('Cancel Transaction')} // TODO: cancel transaction
                    >
                      Cancel Transaction
                    </Button>
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>
          ) : (
            <Button
              size='sm'
              variant='text'
              className='capitalize font-semibold'
              ripple={false}
            >
              Detail
            </Button>
          )}
        </div>
      </CardBody>
    </Card >
  )
}

export default OrderItem