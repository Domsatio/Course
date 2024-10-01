import ContentWrapper from "@/layouts/client/contentWrapper";
import { FormInput } from "@/components/admin/FormInput";
import {
  InputListAddress,
  InputList,
} from "@/constants/client/InputLists/checkout.InputList";
import { addressServices } from "@/services/serviceGenerator";
import { Button, Typography } from "@material-tailwind/react";
import { FC, useState } from "react";
import { GetServerSideProps } from "next";
import cookie from "cookie";
import { BASE_URL } from "@/libs/axios/instance";
import { UpdateAddress } from "@/types/address.type";
import { GetCart } from "@/types/cart.type";
import { ConvertCurrency } from "@/helpers/appFunction";
import Image from "next/image";
import Link from "next/link";
import { GetProduct } from "@/types/product.type";

type Carts = {
  id: string
  productId: string
  userId: string
  quantity: number
  createdAt: string
  updatedAt: string
  product: GetProduct
}

type CheckoutProps = {
  address: UpdateAddress
  carts: Carts[]
}

const Checkout: FC<CheckoutProps> = (data) => {
  console.log(data);

  const [isOpenAddress, setIsOpenAddress] = useState<boolean>(false);
  const [address, setAddress] = useState<UpdateAddress>(data.address);
  const [carts, setCarts] = useState<Carts[]>(data.carts);
  const totalPrice = carts.reduce((acc: number, cart: GetCart) => {
    return acc + cart.product.price * cart.quantity;
  }, 0);
  const shippingAddress = address.address + ", " + address.city + ", " + address.state + ", " + address.country + ", " + address.zip + ", " + address.phone;

  return (
    <ContentWrapper>
      <Typography variant="h2" color="black" className='flex justify-center'>
        Checkout
      </Typography>
      <div className="flex flex-col-reverse lg:flex-row justify-between gap-5">

        {/* Billing Details */}
        <div className="w-full lg:w-4/6 flex flex-col gap-7">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Shipping Address</h2>
            <div className="rounded-lg border border-gray-500 p-4 space-y-3">
              <p>{shippingAddress}</p>
              <p
                className="text-green-400 text-sm font-semibold cursor-pointer"
                onClick={() => setIsOpenAddress(true)}
              >
                Change
              </p>
              <FormInput
                inputList={InputListAddress}
                method="PUT"
                service={addressServices}
                toastMessage={{
                  success: "Checkout successfull!",
                  error: "Failed to checkout!",
                }}
                title="Update Address"
                redirect={false}
                asModal={{
                  isOpen: isOpenAddress,
                  handler: setIsOpenAddress,
                }}
                onSuccess={(e) => {
                  setAddress(e);
                }}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Items</h2>
            <div className="space-y-2">
              {carts.map((cart: GetCart, index: number) => (
                <div key={index} className="flex items-center justify-between gap-3 shadow-md rounded-lg p-4">
                  <div className="flex gap-3">
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
          </div>

          <FormInput
            inputList={InputList}
            method="POST"
            service={addressServices}
            toastMessage={{
              success: "Checkout successfull!",
              error: "Failed to checkout!",
            }}
            isUseCancelButton={false}
            customCard={(child) => <div>{child}</div>}
            customButtonSubmit={() => (
              <Button color="green" className="mt-2" fullWidth>
                Checkout
              </Button>
            )}
            redirect={false}
            onSuccess={(e) => {
              console.log(`Success`);
            }}
          />
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-2/6">
          <div className="rounded-lg flex flex-col shadow-md p-4 gap-2">
            <h2 className="text-lg font-semibold">Order Summary</h2>
            {/* <ul className="space-y-4">
            <li className="flex justify-between">
              <span>Item 1</span>
              <span>$50.00</span>
            </li>
            <li className="flex justify-between">
              <span>Item 2</span>
              <span>$30.00</span>
              </li>
            <li className="flex justify-between">
              <span>Item 3</span>
              <span>$20.00</span>
            </li>
          </ul> */}

            <div className=" flex justify-between items-center">
              <span>Total</span>
              <span className="font-semibold">{ConvertCurrency(totalPrice)}</span>
            </div>
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = cookie.parse(context.req.headers.cookie || "");
  const token = cookies["next-auth.session-token"];
  try {
    const res_address = await fetch(`${BASE_URL}/api/address`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const res_carts = await fetch(`${BASE_URL}/api/cart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const { data: address } = await res_address.json();
    const { data: carts } = await res_carts.json();

    return {
      props: { address: { ...address }, carts: [...carts] },
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

export default Checkout;
