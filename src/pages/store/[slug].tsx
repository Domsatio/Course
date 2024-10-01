import { ConvertCurrency } from "@/helpers/appFunction";
import { productServices } from "@/services/serviceGenerator";
import { GetProduct } from "@/types/product.type";
import { Button, Typography } from "@material-tailwind/react";
import { GetServerSideProps } from "next";
import Image from "next/image";
import React, { FC, Fragment, useState } from "react";
import GenerateMetaData from "@/components/GenerateMetaData";
import ModalShare from "@/components/ModalShare";
import ContentWrapper from "@/layouts/client/contentWrapper";
import ButtonShare from "@/components/client/ButtonShare";
import { cartServices } from "@/services/serviceGenerator";
import toast from "react-hot-toast";
import Link from "next/link";

const DetailStore: FC<Omit<GetProduct, "createdAt" | "updatedAt">> = ({ id, name, description, price, finalPrice, discount, thumbnail }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const addToCart = async () => {
    try {
      const { data: cart } = await cartServices.addItem({
        productId: id,
        quantity: 1,
      });
      toast.success("Added to cart");
      console.log("Cart:", cart);
    } catch (error) {
      toast.error("Failed to add to cart");
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <Fragment>
      <GenerateMetaData title={name} desc={`Detail ${name}`} thumbnail={thumbnail} />
      <ContentWrapper className="grid grid-cols-1 lg:grid-cols-2">
        <div className="max-h-96 lg:max-h-[500px]">
          <Image
            src={thumbnail}
            alt={name}
            width={400}
            height={400}
            priority
            className="rounded-lg h-full w-full object-contain"
          />
        </div>
        <div className="flex flex-col gap-7">
          <Typography variant="h3" color="black">
            {name}
          </Typography>
          <div className="flex gap-3">
            <Typography color="blue-gray" className="text-4xl font-bold text-black">
              {ConvertCurrency(finalPrice)}
            </Typography>
            {discount > 0 && (
              <Typography color="gray" className="line-through text-base self-start">
                {ConvertCurrency(price)}
              </Typography>
            )}
            {discount > 0 && (
              <Typography className="text-sm py-1 px-2 bg-black text-white rounded-lg self-start">
                -{discount}% Off
              </Typography>
            )}
          </div>
          <div className="space-y-2">
            <Typography variant="h5" color="black">
              Description
            </Typography>
            <Typography variant="paragraph" color="blue-gray">
              {description}
            </Typography>
          </div>
          <div className="grid grid-cols-5 gap-2">
            <Link href='/cart/checkout' className="col-span-2">
              <Button className="rounded-full w-full">Buy Now</Button>
            </Link>
            <Button variant='outlined' className="rounded-full col-span-2" onClick={() => addToCart()}>
              Add to Cart
            </Button>

            <ButtonShare setIsOpen={setIsOpen} className="rounded-full" />
            <ModalShare
              isOpen={isOpen}
              handler={setIsOpen}
              title="Share This Product"
            />
          </div>
        </div>
      </ContentWrapper>
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query;
  try {
    const {
      data: { data },
    } = await productServices.getItem({ slug });
    return {
      props: data,
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

export default DetailStore;
