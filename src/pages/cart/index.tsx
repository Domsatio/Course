import { GetServerSideProps } from 'next/types';
import cookie from 'cookie';
import { BASE_URL } from '@/libs/axios/instance';
import { GetCart } from '@/types/cart.type';
import ContentWrapper from '@/layouts/client/contentWrapper';
import { Button, Typography } from '@material-tailwind/react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { FC, useEffect, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { cartServices } from '@/services/serviceGenerator';
import toast from 'react-hot-toast';
import { ConvertCurrency } from '@/helpers/appFunction';
import Link from 'next/link';
import Image from 'next/image';

const EmptyCart = () => {
  return (
    <div className='flex flex-col gap-4 h-96 items-center justify-center p-4 shadow-md rounded-lg'>
      <Typography variant="h5" color="black" className="text-center">
        Looks like your cart is empty
      </Typography>
      <Link href='/store'>
        <Button variant="outlined">
          Shop Now
        </Button>
      </Link>
    </div>
  )
}

const Cart: FC<{ data: GetCart[] }> = ({ data }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [carts, setCarts] = useState<GetCart[]>(data);
  const [selectedCart, setSelectedCart] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // const getCarts = async () => {
  //   setLoading(true);
  //   try {
  //     const { data: {data}} = await cartServices.getItems();
  //     setCarts(data);
  //   } catch (error) {
  //     console.error("Error getting cart:", error);
  //   }
  //   setLoading(false);
  // }

  const handleDeleteSelectedCart = async () => {
    setLoading(true);
    try {
      await cartServices.deleteItem({ idCart: selectedCart });
      setCarts(carts.filter((cart: GetCart) => !selectedCart.includes(cart.id)));
    } catch (error) {
      console.error("Error deleting cart:", error);
    }
    setLoading(false);
  }

  const handleChangeSelectedCart = (id: string) => {
    if (selectedCart.includes(id)) {
      setSelectedCart(selectedCart.filter((cart) => cart !== id));
    } else {
      setSelectedCart([...selectedCart, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedCart.length === carts.length) {
      setSelectedCart([]);
    } else {
      setSelectedCart(carts.map((cart: GetCart) => cart.id));
    }
  }

  useEffect(() => {
    setTotalPrice(
      carts.reduce((acc: number, cart: GetCart) => {
        if (selectedCart.includes(cart.id)) {
          return acc + cart.product.price;
        }
        return acc;
      }, 0)
    );
  }, [selectedCart]);

  // useEffect(() => {
  //   getCarts();
  // }, []);

  return (
    <ContentWrapper className='bg-transparent'>
      <Typography variant="h2" color="black" className='flex justify-center'>
        Cart
      </Typography>
      <div className='flex flex-col justify-between gap-5 lg:flex-row'>
        <div className="w-full lg:w-4/6">
          {carts.length > 0 ? (
            <div className="space-y-2">
              <div className='flex items-center justify-between p-4 shadow-md rounded-tl-lg rounded-tr-lg'>
                <div className='flex items-center gap-2'>
                  <Checkbox color="success" checked={selectedCart.length === carts.length} onChange={() => handleSelectAll()} />
                  <p className='font-semibold'>Select All <span className='font-normal'>({carts.length})</span></p>
                </div>
                {selectedCart.length > 0 && <Button variant='text' color='red' onClick={() => { }}>Remove</Button>}
              </div>
              {carts.map((cart, index: number) => (
                <div key={cart.id} className={`flex items-center justify-between gap-3 shadow-md p-4 ${index === carts.length - 1 && 'rounded-b-lg'}`}>
                  <div className="flex gap-3">
                    <Checkbox color="success" className='self-center' checked={selectedCart.includes(cart.id)} onChange={() => handleChangeSelectedCart(cart.id)} />
                    <div className="w-20 h-20 relative">
                      <Image
                        src={cart.product.thumbnail}
                        alt={cart.product.name}
                        className="w-full h-full object-contain"
                        height={60}
                        width={60}
                      />
                    </div>
                    <div className="self-start">
                      <Link href={`/store/${cart.product.slug}`} className="flex items-center gap-2">
                        <h2 className='font-semibold'>{cart.product.name}</h2>
                      </Link>
                      {/* <p className="text-sm text-gray-600 line-clamp-2">{cart.product.description}</p> */}
                    </div>
                  </div>
                  <div className='self-start'>
                    <p className="font-semibold">{cart.quantity} X {ConvertCurrency(cart.product.price)}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : <EmptyCart />}
        </div >

        <div className="w-full lg:w-2/6">
          <div className='rounded-lg flex flex-col shadow-md p-4 gap-2'>
            <h2 className='text-lg font-semibold'>Summary</h2>
            <div className='flex justify-between items-center'>
              <p>Total</p>
              <p className='font-semibold'>{carts.length > 0 ? ConvertCurrency(totalPrice) : '-'}</p>
            </div>
            <Link href='/cart/checkout' className='w-full mt-2'>
              <Button color='green' fullWidth>Checkout</Button>
            </Link>
          </div>
        </div>
      </div >
    </ContentWrapper >
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = cookie.parse(context.req.headers.cookie || "");
  const token = cookies["next-auth.session-token"];
  try {
    const response = await fetch(`${BASE_URL}/api/cart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const { data } = await response.json();

    return {
      props: { data },
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

export default Cart;