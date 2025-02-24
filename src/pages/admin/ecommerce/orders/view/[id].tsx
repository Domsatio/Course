import { ConvertCurrency, NullProof } from "@/helpers/appFunction";
import { DetailPage } from "@/components/admin/DetailPage";
import { Typography } from "@material-tailwind/react";
import { GetServerSideProps } from "next/types";
import { orderServices } from "@/services/serviceGenerator";
import { FC } from "react";
import Image from "next/image";
import GenerateMetaData from "@/components/GenerateMetaData";
import { dateFormater } from "@/utils/date";
import { Order } from "@/types/order.type";

const DetailOrderAdmin: FC<Order> = (data) => {
  const { transactionTime, settlementTime, products, customerDetails, grossAmount, totalDiscount } = data;
  const shippingAddress = `${customerDetails.shipping_address.address}, ${customerDetails.shipping_address.city}, ${customerDetails.shipping_address.state}, ${customerDetails.shipping_address.postal_code}`
  const totalItems = products.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <>
      <GenerateMetaData title="Order Detail | Admin" desc={NullProof({ input: data, params: "title" }) || "Order Detail"} />
      <DetailPage title="Order">
        <div className="space-y-5">
          <div className='space-y-4'>
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
          <div className='border border-gray-300 rounded-lg'>
            <div className="border-b border-gray-300 px-4 py-2">
              <Typography variant='lead' className='font-semibold' color='black'>Product Detail</Typography>
            </div>
            <div className='space-y-2'>
              {products.map(({ id, name, thumbnail, price, quantity }, index: number) =>
                <div key={id} className={`px-4 py-2 flex justify-between ${index !== products.length - 1 && 'border-b border-gray-300'}`}>
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
                      <Typography color='black' variant='paragraph' className='line-clamp-1 font-semibold'>{name}</Typography>
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
          <div className='space-y-4'>
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
          <div className='space-y-4'>
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
                <Typography variant='small' color='black'>{totalDiscount !== 0 ? ConvertCurrency(totalDiscount) : '-'}</Typography>
              </div>
              <div className='flex justify-between items-center'>
                <Typography variant='lead' color='black' className='font-bold'>Grand Total</Typography>
                <Typography variant='lead' color='black' className='font-bold'>{ConvertCurrency(grossAmount)}</Typography>
              </div>
            </div>
          </div>
        </div>
      </DetailPage>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  try {
    const { data: { data } } = await orderServices.getItem({ id });
    console.log(data, 'fffffffffffffffffffffffffffffff');
    
    return {
      props: data
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        data: {},
      },
    };
  }
};

export default DetailOrderAdmin;
