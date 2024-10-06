import { useEffect, useState } from 'react';
import AccountLayout from '@/layouts/client/account'
import { Button, Input, Typography } from '@material-tailwind/react'
import GenerateMetaData from '@/components/GenerateMetaData'
import DatePickerComponent from '@/components/DatePicker';
import OrderItem from '@/components/client/OrderItem';
import { orderServices } from '@/services/serviceGenerator';
import { useSession } from 'next-auth/react';
import { Order } from '@/types/order.type';
import Link from 'next/link';

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
    label: 'Completed',
    value: 'completed'
  },
]

const ClientAccountOrdersPage = () => {
  const { data: session } = useSession()
  const userId = session?.user?.id;
  const [orders, setOrders] = useState<Order[] | []>([])
  console.log(orders);

  const fetchData = async () => {
    try {
      const { data: { data } } = await orderServices.getItem({ userId })
      setOrders(data)
    } catch (error) {
      console.error("Error getting orders data:", error);
    }
  }

  useEffect(() => {
    if (!userId) return
    fetchData()
  }, [userId])

  return (
    <AccountLayout>
      <GenerateMetaData title='Orders | Account' desc='Orders Page' />
      <div className='space-y-3'>
        <div className='flex gap-2 justify-between'>
          <Input
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
          {orders.length > 0 ? orders.map((order, index: number) =>
            <OrderItem key={index} {...order} />
          ) : (
            <div className='h-32 flex flex-col gap-3 items-center justify-center'>
              <Typography variant='lead'>No orders found</Typography>
              <Link href='/store'>
                <Button>
                  Shop Now
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </AccountLayout>
  )
}

export default ClientAccountOrdersPage