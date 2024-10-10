import {
  Button, Card, CardBody, Chip, Typography, Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  IconButton,
  Dialog,
  DialogHeader,
  DialogBody,
} from '@material-tailwind/react'
import React, { FC, useState } from 'react'
import Image from 'next/image'
import { ConvertCurrency } from '@/helpers/appFunction'
import { EllipsisVerticalIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { Order } from '@/types/order.type'
import { dateFormater } from '@/utils/date'
import toast from 'react-hot-toast'
import { cn } from '@/libs/cn'

const OrderStatus = (status: string) => {
  if (status === 'pending') {
    return <Chip color='yellow' size='sm' value='Waiting Payment' className='capitalize' />
  } else if (status === 'settlement' || status === 'capture') {
    return <Chip color='green' size='sm' value="completed" className='capitalize' />
  }
}

type OrderItemProps = {
  order: Order,
  cancelTransaction: () => void
}

const OrderItem: FC<OrderItemProps> = ({ order, cancelTransaction }) => {
  const { products, grossAmount, transactionStatus, transactionTime, token } = order;

  const handleCopyPaymentLink = (paymentLink: string): void => {
    navigator.clipboard.writeText(paymentLink);
    toast.success("Payment link copied!");
  };

  const handlePaymentSnap = (token: string): void => {
    window.snap.pay(token, {
      onSuccess: function (result: any) {
        toast.success("Checkout successfully!");
      },
      onPending: function (result: any) {
        toast("Checkout pending!");
      },
      onError: function (result: any) {
        toast.error("Failed to checkout!");
      },
      onClose: function () {
      },
    });
  }

  const handleCancelTransaction = () => {

  }


  return (
    <Card className='shadow-none border border-gray-300'>
      <CardBody className='p-0 space-y-2'>
        <div className='p-2 flex justify-between items-center border-b border-gray-300'>
          <div className='ml-1 flex gap-2'>
            <Typography color='black' variant='small'>{dateFormater(String(transactionTime), 'detail')}</Typography>
          </div>
          {OrderStatus(transactionStatus)}
        </div>
        {products.map(({ id, name, thumbnail, price, quantity }) =>
          <div key={id} className='px-4 flex gap-4'>
            <div className="w-20 h-20 relative">
              <Image
                src={thumbnail}
                alt={name}
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
          <Typography color='black' variant='small' className='ml-2'>Total Price: <span className='font-semibold'>{ConvertCurrency(Number(grossAmount))}</span></Typography>
          {transactionStatus === 'pending' ? (
            <div className='space-x-2'>
              <Button
                size='sm'
                color='blue'
                className='capitalize font-semibold'
                ripple={false}
                onClick={() => handlePaymentSnap(token.token)}
              >
                Pay Now
              </Button>
              <Menu placement='bottom-end'>
                <MenuHandler>
                  <IconButton size='sm' variant='text'><EllipsisVerticalIcon className='w-4 h-4' /></IconButton>
                </MenuHandler>
                <MenuList className='p-2'>
                  <MenuItem onClick={() => handleCopyPaymentLink(token.redirect_url)}>
                    Copy Payment Link
                  </MenuItem>
                  <MenuItem className='text-red-600 hover:text-red-600' onClick={() => {
                    toast((t) => (
                      <div
                        className={cn(`max-w-md w-full bg-white pointer-events-auto flex flex-col`,
                          t.visible ? 'animate-fade-in-up' : 'animate-fade-out-down'
                        )}
                      >
                        <div className="p-4 text-center">
                          <Typography variant='h6' color='black'>Are you sure you want to cancel this transaction?</Typography>
                        </div>
                        <div className="w-full flex justify-end gap-2">
                          <Button
                            size='sm'
                            onClick={() => toast.dismiss(t.id)}
                          >
                            Close
                          </Button>
                          <Button
                            size='sm'
                            color='red'
                            onClick={() => {
                              cancelTransaction();
                              toast.dismiss(t.id);
                            }}
                          >
                            Confirm
                          </Button>
                        </div>
                      </div>
                    ),
                      {
                        duration: 6000,
                      }
                    )
                  }}>
                    Cancel Transaction
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>
          ) : (
            <DetailOrder {...order} />
          )}
        </div>
      </CardBody>
    </Card >
  )
}

const DetailOrder: FC<Order> = (props) => {
  const { products, grossAmount, transactionTime, settlementTime, customerDetails, totalDiscount } = props;
  const [open, setOpen] = useState(false);
  const shippingAddress = `${customerDetails.shipping_address.address}, ${customerDetails.shipping_address.city}, ${customerDetails.shipping_address.state}, ${customerDetails.shipping_address.postal_code}`
  const totalItems = products.reduce((acc, curr) => acc + curr.quantity, 0);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button
        size='sm'
        variant='text'
        className='capitalize font-semibold'
        ripple={false}
        onClick={handleOpen}
      >
        Detail
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className='flex justify-between text-black border-b border-gray-300'>
          Transaction Detail
          <IconButton onClick={handleOpen} variant='text' size='sm'>
            <XMarkIcon className='h-5 w-5' />
          </IconButton>
        </DialogHeader>
        <DialogBody className='p-0 bg-gray-300 space-y-4 max-h-[30rem] overflow-auto rounded-b-lg'>
          <div className='space-y-4 bg-white p-4'>
            <Typography variant='lead' className='font-semibold' color='black'>Transaction Info</Typography>
            <div className='space-y-2'>
              <div className='flex justify-between items-center'>
                <Typography variant='small' color='gray'>Transaction Time</Typography>
                <Typography variant='small' color='black'>{dateFormater(String(transactionTime), 'detail')}</Typography>
              </div>
              <div className='flex justify-between items-center'>
                <Typography variant='small' color='gray'>Payment Time</Typography>
                <Typography variant='small' color='black'>{dateFormater(String(settlementTime), 'detail')}</Typography>
              </div>
            </div>
          </div>
          <div className='space-y-4 bg-white p-4'>
            <Typography variant='lead' className='font-semibold' color='black'>Product Detail</Typography>
            <div className='space-y-2'>
              {products.map(({ id, name, thumbnail, price, quantity }) =>
                <div key={id} className='flex justify-between'>
                  <div className='flex gap-4'>
                    <div className="w-20 h-20 relative">
                      <Image
                        src={thumbnail}
                        alt={name}
                        className="w-full h-full object-contain"
                        height={60}
                        width={60}
                      />
                    </div>
                    <div>
                      <Typography color='black' variant='paragraph' className='line-clamp-1'>{name}</Typography>
                      <Typography color='gray' variant='small'>{quantity} x <span className='text-black'>{ConvertCurrency(price)}</span></Typography>
                    </div>
                  </div>
                  <div className='flex flex-col'>
                    <Typography variant='small' color='gray'>Total Price</Typography>
                    <Typography variant='small' color='black' className='font-semibold'>{ConvertCurrency(price * quantity)}</Typography>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className='space-y-4 bg-white p-4'>
            <Typography variant='lead' className='font-semibold' color='black'>Customer Details</Typography>
            <div className='grid grid-rows-3'>
              <div className='grid grid-cols-[1fr_auto_3fr]'>
                <Typography variant='small' color='gray'>First Name</Typography>
                <span className='w-4'>:</span>
                <Typography variant='small' color='black' className='font-semibold'>{customerDetails.first_name}</Typography>
              </div>
              <div className='grid grid-cols-[1fr_auto_3fr]'>
                <Typography variant='small' color='gray'>Phone</Typography>
                <span className='w-4'>:</span>
                <Typography variant='small' color='black'>{customerDetails.phone}</Typography>
              </div>
              <div className='grid grid-cols-[1fr_auto_3fr]'>
                <Typography variant='small' color='gray'>Shipping Address</Typography>
                <span className='w-4'>:</span>
                <Typography variant='small' color='black'>{shippingAddress}</Typography>
              </div>
            </div>
          </div>
          <div className='space-y-4 bg-white p-4'>
            <Typography variant='lead' className='font-semibold' color='black'>Payment Details</Typography>
            <div className='space-y-2'>
              <div className='flex justify-between items-center'>
                <Typography variant='small' color='gray'>Payment Method</Typography>
                <Typography variant='small' color='black'>BCA</Typography> {/* FIXME: change the payment method */}
              </div>
              <div className='flex justify-between items-center'>
                <Typography variant='small' color='gray'>Total Price ({totalItems} items)</Typography>
                <Typography variant='small' color='black'>{ConvertCurrency(grossAmount)}</Typography>
              </div>
              <div className='flex justify-between items-center'>
                <Typography variant='small' color='gray'>Total Discount</Typography>
                <Typography variant='small' color='black'>-{ConvertCurrency(totalDiscount)}</Typography>
              </div>
              <div className='flex justify-between items-center'>
                <Typography variant='lead' color='black' className='font-bold'>Grand Total</Typography>
                <Typography variant='lead' color='black' className='font-bold'>{ConvertCurrency(grossAmount)}</Typography>
              </div>
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </>
  )
}

export default OrderItem