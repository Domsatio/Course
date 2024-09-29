import { useEffect, useState } from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Typography,
  Badge,
} from "@material-tailwind/react";
import Image from "next/image";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { cartServices } from "@/services/serviceGenerator";
import { GetCarts } from "@/types/cart.type";
import { ConvertCurrency } from "@/helpers/appFunction";
import { useRouter } from "next/router";

export function NavCart() {
  const [openMenu, setOpenMenu] = useState(false);
  const [carts, setCarts] = useState<GetCarts[]>([]);
  const [isGetCartError, setIsGetCartError] = useState(false);
  const [totalCart, setTotalCart] = useState(0);

  const { push } = useRouter();

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
  }, []);


  return (
    <Menu open={openMenu} handler={setOpenMenu} allowHover>
      <MenuHandler>
        <Button className="text-black bg-transparent shadow-none outline-none hover:shadow-none p-0">
          <Badge content={totalCart} withBorder placement="top-end">
            <ShoppingCartIcon className="h-7 w-7" onClick={() => push('/cart')} />
          </Badge>
        </Button>
      </MenuHandler>
      <MenuList className="hidden w-[36rem] gap-3 overflow-visible lg:grid">
        <ul className="col-span-4 flex w-full flex-col gap-1">
          <div className="w-full flex justify-between items-center mb-3">
            <Typography variant="h6" color="black">
              Cart
            </Typography>
            <Link href="/cart" className="text-green-500 font-bold">
              Look
            </Link>
          </div>
          {carts.map((cart: GetCarts, index: number) => (
            <div
              key={index}
              className="w-full flex justify-between items-center"
            >
              <div className="flex gap-x-2">
                <Image
                  src={cart.product.thumbnail}
                  alt={cart.product.name + " thumbnail"}
                  className="transform transition-transform duration-500 max-h-[50px]"
                  style={{ objectFit: "cover" }}
                  height={50}
                  width={50}
                  priority
                />
                <div className="flex flex-col">
                  <Typography variant="h6" color="blue-gray" className="mb-1">
                    {cart.product.name}
                  </Typography>
                  <p className="text-sm text-gray-500 font-normal line-clamp-1">
                    {cart.product.description}
                  </p>
                </div>
              </div>
              <Typography variant="small" color="black" className="font-semibold">
                {cart.quantity} x {ConvertCurrency(cart.product.price)}
              </Typography>
            </div>
          ))}
        </ul>
      </MenuList>
    </Menu>
  );
}
