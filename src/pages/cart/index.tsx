import { GetServerSideProps } from 'next/types';
import cookie from 'cookie';
import { BASE_URL } from '@/libs/axios/instance';
import { GetCarts } from '@/types/cart.type';
import ContentWrapper from '@/layouts/client/contentWrapper';
import { Button } from '@material-tailwind/react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { cartServices } from '@/services/serviceGenerator';
import toast from 'react-hot-toast';
import { ConvertCurrency } from '@/helpers/appFunction';
import Link from 'next/link';

export default function index(data: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [carts, setCarts] = useState<GetCarts[]>(data.data);
  const [selectedCart, setSelectedCart] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const handleDeleteSelectedCart = async () => {
    setLoading(true);
    try {
      await cartServices.deleteItem({idCart: selectedCart});
      setCarts(carts.filter((cart: GetCarts) => !selectedCart.includes(cart.id)));  
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
      setSelectedCart(carts.map((cart: GetCarts) => cart.id));
    }
  }

  useEffect(() => {
    setTotalPrice( 
      carts.reduce((acc: number, cart: GetCarts) => {
        if (selectedCart.includes(cart.id)) {
          return acc + cart.product.price;
        }
        return acc;
      }, 0)
    );
  }, [selectedCart]);
  
  return (
    <ContentWrapper>
      <h1 className="text-3xl font-bold mb-8 text-center">Cart</h1>
      <div className='flex flex-wrap justify-between'>
        <div className="basis-full lg:basis-4/6 lg:pr-5">

          <div className="flex flex-col gap-4">
            <div className='flex items-center justify-between p-4 shadow-md rounded-tl-lg rounded-tr-lg'>
              <div className='flex items-center gap-2'>
                <Checkbox color="success" checked={selectedCart.length === carts.length} onChange={() => handleSelectAll()} />
                <p className='text-lg font-semibold'>Select All ({carts.length})</p>
              </div>
              {selectedCart.length > 0 && <Button color='red' onClick={() => {}}>Delete</Button>}
            </div>
            {carts.map((cart: GetCarts, index: number) => (
                <div key={index} className="flex items-center justify-between gap-3 shadow-md rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <Checkbox color="success" checked={selectedCart.includes(cart.id)} onChange={() => handleChangeSelectedCart(cart.id)} />
                    <div className="w-20 h-20 relative">
                      <img
                        src={cart.product.thumbnail}
                        alt={cart.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h2 className="text-lg font-semibold">{cart.product.name}</h2>
                      <p className="text-sm text-gray-400">{cart.product.description}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">{cart.quantity} X {ConvertCurrency(cart.product.price)}</p>
                  </div>
                </div>
            ))}
          </div>
        </div>
        <div className="basis-full lg:basis-1/3 mt-5 lg:mt-0">
            <div className='rounded-lg shadow-md p-5'>
                <h2 className='text-xl font-semibold'>Summary</h2>
                <div className='flex justify-between items-center mt-2'>
                    <p className='text-lg font-semibold'>Total</p>
                    <p className='text-lg font-semibold'>{ConvertCurrency(totalPrice)}</p>
                </div>
                <Link href='/cart/check-out'>
                  <Button className='w-full bg-green-500 text-white px-4 py-2 rounded-md mt-4'>Buy</Button>
                </Link>
            </div>
        </div>
      </div>
    </ContentWrapper>
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
        props: {data: data},
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