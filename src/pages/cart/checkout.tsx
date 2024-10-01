import ContentWrapper from "@/layouts/client/contentWrapper";
import { FormInput } from "@/components/admin/FormInput";
import {
  InputListAddress,
  InputList,
} from "@/constants/client/InputLists/checkout.InputList";
import { addressServices } from "@/services/serviceGenerator";
import { Button, Typography } from "@material-tailwind/react";
import { FC, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import cookie from "cookie";
import { BASE_URL, NODE_ENV } from "@/libs/axios/instance";
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
  const [isOpenAddress, setIsOpenAddress] = useState<boolean>(false);
  const [address, setAddress] = useState<UpdateAddress | null>(
    data.address || null
  );
  const [carts, setCarts] = useState<GetCart[]>(data.carts || []);
  const [shippingAddress, setShippingAddress] = useState<string>(
    `${data.address.address}, ${data.address.city}, ${data.address.state}, ${data.address.country}, ${data.address.zip}, ${data.address.phone}` ||
    "No address available"
  );

  const totalPrice = carts.reduce((acc: number, cart: GetCart) => {
    return acc + cart.product.price * cart.quantity;
  }, 0);

  useEffect(() => {
    setAddress(data.address || null);
    setCarts(data.carts || []);
  }, [data]);

  useEffect(() => {
    const shippingAddress = address
      ? `${address.address}, ${address.city}, ${address.state}, ${address.country}, ${address.zip}, ${address.phone}`
      : "No address available";
    setShippingAddress(shippingAddress);
  }, [address]);

  return (
    <ContentWrapper>
      <Typography variant="h2" color="black" className="flex justify-center">
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
              {/* FormInput for updating address */}
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
              {carts.length > 0 ? (
                carts.map(({ id, product, quantity }) => (
                  <div
                    key={id}
                    className="flex items-center justify-between gap-3 shadow-md rounded-lg p-4"
                  >
                    <div className="flex gap-3">
                      <div className="w-20 h-20 relative">
                        <Image
                          src={product.thumbnail}
                          alt={product.name}
                          className="w-full h-full object-contain"
                          height={60}
                          width={60}
                        />
                      </div>
                      <div className="self-start">
                        <Link
                          href={`/store/${product.slug}`}
                          className="flex items-center gap-2"
                        >
                          <h2 className="font-semibold">{product.name}</h2>
                        </Link>
                      </div>
                    </div>
                    <div className="self-start">
                      <p className="font-semibold">
                        {quantity} X {ConvertCurrency(product.price)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No items in the cart.</p>
              )}
            </div>
          </div>

          {/* Submit form */}
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
            <div className="flex justify-between items-center">
              <span>Total</span>
              <span className="font-semibold">
                {carts.length > 0 ? ConvertCurrency(totalPrice) : "-"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = cookie.parse(context.req.headers.cookie || "");
  const token = NODE_ENV === "development"
    ? cookies["next-auth.session-token"]
    : cookies["__Secure-next-auth.session-token"];

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
