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
import { useRouter } from "next/router";
import { cartServices } from "@/services/serviceGenerator";
import toast from "react-hot-toast";
import Link from "next/link";

const FinalPrice = ({
  price,
  discount,
}: {
  price: number;
  discount: number;
}) => {
  const discountedPrice = discount !== undefined ? price - (price * discount) / 100 : price;

  return (
    <div className="flex gap-3">
      <Typography color="blue-gray" className="text-4xl font-bold text-black">
        {ConvertCurrency(discountedPrice)}
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
  );
};

const DetailStore: FC<Omit<GetProduct, "createdAt" | "updatedAt">> = (
  data
) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const addToCart = async () => {
    try {
      const { data: cart } = await cartServices.addItem({
        productId: data.id,
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
      <GenerateMetaData title={data.name} desc={`Detail ${data.name}`} thumbnail={data.thumbnail} />
      <ContentWrapper className="grid grid-cols-1 lg:grid-cols-2">
        <div className="max-h-96 lg:max-h-[500px]">
          <Image
            src={data.thumbnail}
            alt={data.name}
            width={400}
            height={400}
            priority
            className="rounded-lg h-full w-full object-contain"
          />
        </div>
        <div className="flex flex-col gap-7">
          <Typography variant="h3" color="black">
            {data.name}
          </Typography>
          <FinalPrice price={data.price} discount={data.discount} />
          <div className="space-y-2">
            <Typography variant="h5" color="black">
              Description
            </Typography>
            <Typography variant="paragraph" color="blue-gray">
              {data.description}
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
