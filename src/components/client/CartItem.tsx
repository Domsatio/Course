import { ConvertCurrency } from "@/helpers/appFunction";
import { cartServices } from "@/services/serviceGenerator";
import { GetCart } from "@/types/cart.type";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import Checkbox from "@mui/material/Checkbox";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { cn } from "@/libs/cn";

type CartItemProps = {
  index?: number;
  cart: GetCart;
  cartLength?: number;
  selectedCart?: string[];
  setSelectedCart?: (id: string) => void;
  handleDeleteCart?: (id: string[]) => void;
  handleSetQuantity?: (id: string, quantity: number) => void;
  setLoading?: (loading: boolean) => void;
  service?: any;
};

export default function CartItem({
  index = 1,
  cart,
  cartLength = 1,
  selectedCart,
  setSelectedCart,
  handleDeleteCart,
  handleSetQuantity,
  setLoading,
  service = cartServices,
}: CartItemProps) {
  const [quantity, setQuantity] = useState<number>(cart.quantity || 0);
  const [increment, setIncrement] = useState<number>(0);
  const [debouncedIncremental] = useDebounce(increment, 500);

  const setQuantityCart = async () => {
    setLoading?.(true);
    try {
      const addQuantitiy = await service.updateItem({
        id: cart.id,
        quantity: debouncedIncremental,
      });
      if (!addQuantitiy) {
        throw new Error("Failed to update cart");
      }
      setQuantity(debouncedIncremental);
      handleSetQuantity?.(cart.id, debouncedIncremental);
    } catch (error) {
      console.error("Error updating cart:", error);
    }
    setLoading?.(false);
  };

  useEffect(() => {
    if (debouncedIncremental !== 0) {
      setQuantityCart();
    }
  }, [debouncedIncremental]);

  return (
    <div
      key={cart.id}
      className={cn(
        "relative flex items-center justify-between gap-3 shadow-md p-4",
        { "rounded-b-lg": index === cartLength - 1 }
      )}
    >
      <div className="flex gap-3">
        {selectedCart && setSelectedCart && (
          <Checkbox
            color="success"
            className="self-center"
            checked={selectedCart.includes(cart.id)}
            onChange={() => {
              setSelectedCart(cart.id);
            }}
          />
        )}
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
          <Link
            href={`/store/${cart.product.slug}`}
          >
            <h2 className="font-semibold">{cart.product.name}</h2>
            <p className="block md:hidden text-xs">
              {quantity} X {ConvertCurrency(cart.product.finalPrice)}
            </p>
          </Link>
        </div>
      </div>
      <div className="self-start">
        <p className="hidden lg:block font-semibold">
          {quantity} X {ConvertCurrency(cart.product.finalPrice)}
        </p>
      </div>
      <div className="absolute flex items-center gap-2 bottom-3 right-3">
        {handleDeleteCart && (
          <IconButton
            className="w-7 h-7 bg-transparent text-black shadow-none hover:shadow-none"
            onClick={() => handleDeleteCart([cart.id])}
          >
            <TrashIcon className="h-4 w-4" />
          </IconButton>
        )}
        <div className="ml-4 py-2 gap-5 h-7 flex items-center rounded-lg max-w-min border border-gray-300">
          <IconButton
            className="w-7 h-7 bg-transparent text-black shadow-none hover:shadow-none"
            disabled={quantity === 1}
            onClick={() => {
              setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
              setIncrement((prev) => {
                if (prev === 0) {
                  return prev + cart.quantity - 1;
                } else {
                  return prev > 1 ? prev - 1 : 1;
                }
              });
            }}
          >
            <MinusIcon className="h-4 w-4" />
          </IconButton>
          <span className="text-sm">{quantity}</span>
          <IconButton
            className="w-7 h-7 bg-transparent text-black shadow-none hover:shadow-none"
            onClick={() => {
              setQuantity((prev) => prev + 1);
              setIncrement((prev) => {
                if (prev !== 0) {
                  return prev + 1;
                } else {
                  return prev + cart.quantity + 1;
                }
              });
            }}
          >
            <PlusIcon className="h-4 w-4" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
