import { ConvertCurrency } from '@/helpers/appFunction';
import { productServices } from '@/services/serviceGenerator';
import { GetProduct } from '@/types/product.type'
import { Button, Typography } from '@material-tailwind/react';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react'

const FinalPrice = ({ price, discount }: { price: number, discount?: number }) => {
  const discountedPrice = discount !== undefined ? price - (price * discount) / 100 : price;

  return (
    <div className="mt-7">
      <Typography color="blue-gray" className="text-2xl font-bold">
        {ConvertCurrency(discountedPrice)}
      </Typography>
      <div className='flex gap-2 mt-2'>
        {discount !== undefined && (
          <Typography className="text-base py-1 px-2 bg-green-200 text-green-900 font-semibold rounded-lg">
            -{discount}%
          </Typography>
        )}
        {discount !== undefined && (
          <Typography color="gray" className="line-through text-base">
            {ConvertCurrency(price)}
          </Typography>
        )}
      </div>
    </div>
  );
}

const DetailStore: FC<Omit<GetProduct, 'id' | 'createdAt' | 'updatedAt'>> = (data) => {
  return (
    <main className="flex min-h-screen flex-col items-center bg-[#f4f4f4] justify-between py-24">
      <section className="grid grid-cols-2 container 2xl:max-w-[75rem] p-10 rounded-3xl bg-white">
        <Image
          src={data.image}
          alt={data.name}
          width={400}
          height={400}
          priority
          className='rounded-lg'
        />
        <div>
          <Typography color="black" className='font-medium text-2xl'>
            {data.name}
          </Typography>
          <FinalPrice price={data.price} discount={data.discount} />
          <Link href=''>
            <Button className='rounded-full px-10 mt-10'>
              Buy
            </Button>
          </Link>
          <Typography variant='paragraph' color="black" className='mt-10'>
            {data.description}
          </Typography>
        </div>
      </section>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query;
  try {
    const { data: { data } } = await productServices.getItem({ slug });
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

export default DetailStore