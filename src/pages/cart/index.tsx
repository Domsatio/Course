import { GetServerSideProps } from "next/types";
import cookie from "cookie";
import { BASE_URL, NODE_ENV } from "@/libs/axios/instance";
import { GetCart } from "@/types/cart.type";
import ContentWrapper from "@/layouts/client/contentWrapper";
import { Button, Typography } from "@material-tailwind/react";
import { FC, useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { cartServices } from "@/services/serviceGenerator";
import toast from "react-hot-toast";
import { ConvertCurrency } from "@/helpers/appFunction";
import Link from "next/link";
import CartItem from "@/components/client/CartItem";
import { useRouter } from "next/router";
import useGlobalStore from "@/store/globalStore";

const EmptyCart = () => {
  return (
    <div className="flex flex-col gap-4 h-96 items-center justify-center p-4 shadow-md rounded-lg">
      <Typography variant="h5" color="black" className="text-center">
        Looks like your cart is empty
      </Typography>
      <Link href="/store">
        <Button variant="outlined">Shop Now</Button>
      </Link>
    </div>
  );
};

const Cart: FC<{ data: GetCart[] }> = ({ data = [] }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [carts, setCarts] = useState<GetCart[]>(data || []);
  const [selectedCart, setSelectedCart] = useState<string[]>(
    data
      .filter((cart: GetCart) => cart.isChecked)
      .map((cart: GetCart) => cart.id) || []
  );
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { push } = useRouter();
  const { checkCart } = useGlobalStore();

  const handleDeleteCart = async (id: string[]) => {
    toast
      .promise(
        new Promise<void>(async (resolve, reject) => {
          setLoading(true);
          try {
            await cartServices.deleteItem({ idCart: `[${id}]` });
            const rest_cart = carts.filter(
              (cart: GetCart) => !id.includes(cart.id)
            );
            setCarts(rest_cart);
            if (id === selectedCart) {
              setSelectedCart([]);
            } else {
              setSelectedCart((prev) =>
                prev.filter((prevId: string) => !id.includes(prevId))
              );
            }
            checkCart();
            resolve();
          } catch (error) {
            reject(error);
          }
        }),
        {
          loading: <b>Deleting...</b>,
          success: <b>Cart deleted successfully</b>,
          error: <b>Error deleting cart</b>,
        }
      )
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChangeSelectedCart = async (id: string) => {
    setLoading(true);
    const isChecked = selectedCart.includes(id) ? false : true;
    try {
      if (isChecked) {
        setSelectedCart([...selectedCart, id]);
      } else {
        setSelectedCart(selectedCart.filter((cartId: string) => cartId !== id));
      }
      await cartServices.updateItem({
        id,
        isChecked: isChecked,
      });
    } catch (error) {
      if (isChecked) {
        setSelectedCart(selectedCart.filter((cartId: string) => cartId !== id));
      } else {
        setSelectedCart([...selectedCart, id]);
      }
    }
    setLoading(false);
  };

  const handleSelectAll = async () => {
    setLoading(true);
    const isCheckedAll = selectedCart.length === carts.length ? false : true;
    try {
      if (isCheckedAll) {
        setSelectedCart(carts.map((cart: GetCart) => cart.id));
      } else {
        setSelectedCart([]);
      }
      await cartServices.updateItem({
        id: "all",
        isChecked: isCheckedAll,
      });
    } catch (error) {
      if (isCheckedAll) {
        setSelectedCart([]);
      } else {
        setSelectedCart(carts.map((cart: GetCart) => cart.id));
      }
    }
    setLoading(false);
  };

  const handleSetQuantity = async (id: string, quantity: number) => {
    setCarts((prev) =>
      prev.map((cart: GetCart) => {
        if (cart.id === id) {
          return { ...cart, quantity };
        }
        return cart;
      })
    );
  };

  useEffect(() => {
    if (carts.length) {
      setTotalPrice(
        carts.reduce((acc: number, cart: GetCart) => {
          if (selectedCart.includes(cart.id)) {
            return acc + cart.product.finalPrice * cart.quantity;
          }
          return acc;
        }, 0)
      );
    }
  }, [selectedCart, carts]);

  return (
    <ContentWrapper className="bg-transparent">
      <Typography variant="h2" color="black" className="flex justify-center">
        Cart
      </Typography>
      <div className="flex flex-col justify-between gap-5 lg:flex-row">
        <div className="w-full lg:w-4/6">
          {carts.length > 0 ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between p-4 shadow-md rounded-tl-lg rounded-tr-lg">
                <div className="flex items-center gap-2">
                  <Checkbox
                    color="success"
                    checked={selectedCart.length === carts.length}
                    onChange={() => handleSelectAll()}
                  />
                  <p className="font-semibold">
                    Select All{" "}
                    <span className="font-normal">({carts.length})</span>
                  </p>
                </div>
                {selectedCart.length > 0 && (
                  <Button
                    variant="text"
                    color="red"
                    onClick={() => handleDeleteCart(selectedCart)}
                  >
                    Remove
                  </Button>
                )}
              </div>
              {carts.map((cart, index: number) => (
                <CartItem
                  key={cart.id}
                  index={index}
                  cart={cart}
                  cartLength={carts.length}
                  selectedCart={selectedCart}
                  setSelectedCart={handleChangeSelectedCart}
                  handleDeleteCart={handleDeleteCart}
                  handleSetQuantity={handleSetQuantity}
                  setLoading={setLoading}
                />
              ))}
            </div>
          ) : (
            <EmptyCart />
          )}
        </div>

        <div className="w-full lg:w-2/6">
          <div className="rounded-lg flex flex-col shadow-md p-4 gap-2">
            <h2 className="text-lg font-semibold">Summary</h2>
            <div className="flex justify-between items-center">
              <p>Total</p>
              <p className="font-semibold">
                {carts.length > 0 ? ConvertCurrency(totalPrice) : "-"}
              </p>
            </div>
            <Button
              color="green"
              loading={loading}
              fullWidth
              onClick={() => {
                if (selectedCart.length === 0) {
                  toast("Please select item to checkout", { duration: 2700 });
                  return;
                } else {
                  push("/cart/checkout");
                }
              }}
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

  console.log("Token:", token);

  if (!token) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  try {
    const response = await fetch(`${BASE_URL}/api/cart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    return {
      props: { data: result.data },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        data: [],
      },
    };
  }
};

export default Cart;
