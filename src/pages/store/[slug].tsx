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

const FinalPrice = ({
  price,
  discount,
}: {
  price: number;
  discount: number;
}) => {
  const discountedPrice =
    discount !== undefined ? price - (price * discount) / 100 : price;

  return (
    <div>
      <Typography color="blue-gray" className="text-2xl font-bold">
        {ConvertCurrency(discountedPrice)}
      </Typography>
      {discount > 0 && (
        <div className="flex gap-2 mt-2">
          <Typography className="text-base py-1 px-2 bg-green-200 text-green-900 font-semibold rounded-lg">
            -{discount}%
          </Typography>
          <Typography color="gray" className="line-through text-base">
            {ConvertCurrency(price)}
          </Typography>
        </div>
      )}
    </div>
  );
};

const DetailStore: FC<Omit<GetProduct, "createdAt" | "updatedAt">> = (
  data
) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { push } = useRouter();

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
            className="rounded-lg h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-5 lg:gap-10">
          <Typography color="black" className="font-medium text-2xl">
            {data.name}
          </Typography>
          <FinalPrice price={data.price} discount={data.discount} />
          <div className="flex items-center gap-3">
            <Button className="rounded-full px-8 py-[14px]" onClick={() => push('/cart/check-out')}>Buy</Button>
            <Button className="rounded-full px-8 py-[14px]" onClick={() => addToCart()}>+ Cart</Button>

            <ButtonShare name="share" setIsOpen={setIsOpen} />
            <ModalShare
              isOpen={isOpen}
              handler={setIsOpen}
              title="Share this product"
            />
          </div>
          <Typography variant="paragraph" color="black">
            {data.description}
          </Typography>
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
