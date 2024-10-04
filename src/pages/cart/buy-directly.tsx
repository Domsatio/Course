import ContentWrapper from "@/layouts/client/contentWrapper";
import { FormInput } from "@/components/admin/FormInput";
import {
  InputListAddress,
  InputList,
} from "@/constants/client/InputLists/checkout.InputList";
import {
  addressServices,
  temporaryCartServices,
} from "@/services/serviceGenerator";
import { Button, Typography } from "@material-tailwind/react";
import { FC, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import cookie from "cookie";
import { BASE_URL, NODE_ENV } from "@/libs/axios/instance";
import { UpdateAddress } from "@/types/address.type";
import { GetCart } from "@/types/cart.type";
import { ConvertCurrency } from "@/helpers/appFunction";
import { GetProduct } from "@/types/product.type";
import { getItem } from "@/utils/localstorage";
import CartItem from "@/components/client/CartItem";
import toast from "react-hot-toast";

type CheckoutProps = {
  address: UpdateAddress;
  carts: {
    id: string;
    productId: string;
    userId: string;
    quantity: number;
    createdAt: string;
    updatedAt: string;
    product: GetProduct;
  }[];
};

const BuyDirectly: FC<CheckoutProps> = (data) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpenAddress, setIsOpenAddress] = useState<boolean>(false);
  const [address, setAddress] = useState<UpdateAddress>(data.address);
  const [cart, setCart] = useState<GetCart>({
    id: "",
    productId: "",
    userId: "",
    quantity: 0,
    product: {
      id: "",
      name: "",
      price: 0,
      finalPrice: 0,
      thumbnail: "",
      slug: "",
      description: "",
      discount: 0,
      quantity: 0,
    },
  });
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [shippingAddress, setShippingAddress] = useState<string>(
    `${data.address?.address}, ${data.address?.city}, ${data.address?.state}, ${data.address?.country}, ${data.address?.zip}, ${data.address?.phone}` ||
    "No address available"
  );

  const getTemporaryCart = async () => {
    if (typeof window !== "undefined") {
      const idBD = getItem("idBD");
      if (idBD) {
        const {
          data: { data },
        } = await temporaryCartServices.getItems({ idProduct: idBD });
        setCart(data);
      }
    }
  };

  const handleCheckout = async () => {
    setLoading(true);
    const res = await fetch(`/api/checkout?BD=true`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { success, data } = await res.json();
    if (success) {
      console.log("success", data);
      window.snap.pay(data.token.token, {
        onSuccess: function (result: any) {
          toast.success("Checkout successfull!");
        },
        onPending: function (result: any) {
          toast.success("Checkout pending!");
        },
        onError: function (result: any) {
          toast.error("Failed to checkout!");
          setLoading(false);
        },
        onClose: function () {
          setLoading(false);
        },
      });
    } else {
      toast.error("Failed to checkout!");
      setLoading(false);
    }
  };

  useEffect(() => {
    setAddress(data.address || null);
  }, [data]);

  useEffect(() => {
    const shippingAddress = address
      ? `${address.address}, ${address.city}, ${address.state}, ${address.country}, ${address.zip}, ${address.phone}`
      : "No address available";
    setShippingAddress(shippingAddress);
  }, [address]);

  useEffect(() => {
    getTemporaryCart();
  }, []);

  useEffect(() => {
    const countPrice = cart.quantity * cart.product.finalPrice;
    setTotalPrice(countPrice);
  }, [cart]);

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
                {data.address ? "Update" : "Add"}
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
              {cart.id !== "" ? (
                <CartItem
                  cart={cart}
                  setLoading={setLoading}
                  service={temporaryCartServices}
                  handleSetQuantity={(id, quantity) =>
                    setCart((prev) => ({ ...prev, quantity }))
                  }
                />
              ) : (
                <p>No items in the cart.</p>
              )}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-2/6">
          <div className="rounded-lg flex flex-col shadow-md p-4 gap-2">
            <h2 className="text-lg font-semibold">Order Summary</h2>
            <div className="flex justify-between items-center">
              <span>Total</span>
              <span className="font-semibold">
                {ConvertCurrency(totalPrice)}
              </span>
            </div>
            <Button
              color="green"
              className="mt-2"
              fullWidth
              loading={loading}
              onClick={() => handleCheckout()}
            >
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = cookie.parse(context.req.headers.cookie || "");
  const token =
    NODE_ENV === "development"
      ? cookies["next-auth.session-token"]
      : cookies["__Secure-next-auth.session-token"];

  if (!token) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  try {
    const res_address = await fetch(`${BASE_URL}/api/address`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // const res_carts = await fetch(`${BASE_URL}/api/cart/temporary?idProduct=${idBD}`, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    // });

    const { data: address } = await res_address.json();
    // const { data: carts } = await res_carts.json();

    return {
      props: { address },
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

export default BuyDirectly;
