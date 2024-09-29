import ContentWrapper from "@/layouts/client/contentWrapper";
import { FormInput } from "@/components/admin/FormInput";
import {
  InputListAddress,
  InputList,
} from "@/constants/client/InputLists/checkout.InputList";
import { addressServices } from "@/services/serviceGenerator";
import { Button } from "@material-tailwind/react";
import { useState } from "react";
import { GetServerSideProps } from "next";
import cookie from "cookie";
import { BASE_URL } from "@/libs/axios/instance";
import { UpdateAddress } from "@/types/address.type";
import { GetCarts } from "@/types/cart.type";
import { ConvertCurrency } from "@/helpers/appFunction";

export default function Checkout(data: any) {
  const [isOpenAddress, setIsOpenAddress] = useState<boolean>(false);
  const [address, setAddress] = useState<UpdateAddress>(data.address);
  const [carts, setCarts] = useState(data.carts);
  const totalPrice = carts.reduce((acc: number, cart: GetCarts) => {
    return acc + cart.product.price * cart.quantity;
  }, 0);

  return (
    <ContentWrapper>
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      <div className="flex flex-col-reverse lg:flex-row justify-between gap-10 lg:gap-2">

        {/* Billing Details */}
        <div className="basis-full lg:basis-2/3 lg:pr-3">
          <h2 className="text-xl font-semibold mb-6">Shipping Address</h2>
          <div className="rounded-lg border border-black p-4">
            <p>
              {address.address}, {address.city}, {address.state},{" "}
              {address.country}, {address.zip},
            </p>
            <p
              className="text-green-400 hover:text-green-500 hover:scale-105 font-bold cursor-pointer mt-3 max-w-min"
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

          <div className="flex flex-col">
            <h2 className="text-xl font-semibold mt-6 mb-6">Items</h2>
            {carts.map((cart: GetCarts, index: number) => (
                <div key={index} className="flex items-center justify-between gap-3 shadow-md rounded-lg p-4">
                  <div className="flex items-center gap-2">
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
              <Button color="green" ripple={true} size="lg" className="w-full">
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
        <div className="bg-white max-h-min p-6 rounded-lg shadow-lg basis-full lg:basis-1/3">
          <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
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

          <div className=" mt-6 pt-4">
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>{ConvertCurrency(totalPrice)}</span>
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
      props: { address, carts },
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
