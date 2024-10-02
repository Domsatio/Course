import { Fragment, useEffect, useState } from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  Button,
  Typography,
  Badge,
} from "@material-tailwind/react";
import Image from "next/image";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { cartServices } from "@/services/serviceGenerator";
import { GetCart } from "@/types/cart.type";
import { ConvertCurrency } from "@/helpers/appFunction";
import  useGlobalStore from "@/store/globalStore";

export function NavCart() {
  const [openMenu, setOpenMenu] = useState(false);
  const [carts, setCarts] = useState<GetCart[]>([]);
  const [isGetCartError, setIsGetCartError] = useState(false);
  const [totalCart, setTotalCart] = useState(0);

  const { cartTrigger } = useGlobalStore();

  const getCarts = async () => {
    try {
      setIsGetCartError(false);
      const {
        data: { data, totalData },
      } = await cartServices.getItems();
      setCarts(data);
      setTotalCart(totalData);
    } catch (error) {
      setIsGetCartError(true);
      console.error("Error getting cart:", error);
    }
  };

  useEffect(() => {
    if (openMenu) {
      getCarts();
    }
  }, [openMenu]);

  useEffect(() => {
    getCarts();
  }, [cartTrigger]);


  return (
    <Menu open={openMenu} handler={setOpenMenu} allowHover>
      <MenuHandler>
        <Link href="/cart" className="flex items-center">
          <Badge content={totalCart} withBorder placement="top-end">
            <ShoppingCartIcon className="h-6 w-6" />
          </Badge>
        </Link>
      </MenuHandler>
      <MenuList className="p-0 hidden w-[36rem] gap-3 overflow-visible lg:grid">
        <div className="w-full px-3 pt-3 flex justify-between items-center">
          <Typography variant="h6" color="black">
            Cart <span className="font-normal">({totalCart})</span>
          </Typography>
          <Link href="/cart" className="text-green-500 font-bold">
            View
          </Link>
        </div>
        <hr className="border-gray-200" />
        <div className="px-3 pb-3 space-y-3">
          {carts.length > 0 ? carts.map((cart, index: number) => (
            <div
              key={index}
              className="w-full flex justify-between"
            >
              <div className="flex gap-3">

                <div className="h-14 w-14">
                  <Image
                    src={cart.product.thumbnail}
                    alt={cart.product.name + " thumbnail"}
                    className="transform transition-transform duration-500 h-full w-full object-contain rounded-lg"
                    height={50}
                    width={50}
                    priority
                  />
                </div>
                <div className="flex flex-col self-start">
                  <Link href={`/store/${cart.product.slug}`} className="flex gap-x-2">
                    <Typography variant="small" color="black" className="line-clamp-1 font-semibold">
                      {cart.product.name}
                    </Typography>
                  </Link>
                  {/* <p className="text-sm text-gray-600 font-normal line-clamp-1">
                    {cart.product.description}
                    </p> */}
                </div>
              </div>
              <Typography variant="small" color="black" className="font-semibold">
                {cart.quantity} x {ConvertCurrency(cart.product.price)}
              </Typography>
            </div>
          )) : (
            <div className="flex flex-col gap-3 items-center justify-center">
              <Typography variant="h6" color="black" className="text-center">
                Looks like your cart is empty
              </Typography>
              <Link href='/store'>
                <Button variant="outlined" className="px-4 py-2">
                  Shop Now
                </Button>
              </Link>
            </div>
          )}
        </div>
      </MenuList>
    </Menu>
  );
}
