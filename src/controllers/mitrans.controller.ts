import { snap } from "@/libs/mitrans";
import prisma from "@/libs/prisma/db";
import { ca } from "date-fns/locale";
import { use } from "react";

export const createTransaction = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      cart: {
        where: {
          isChecked: true,
        },
        include: {
          product: true,
        },
      },
      address: true,
    },
  });

  if (!user) {
    throw new Error("User not found.");
  }

  const grossAmount =
    user.cart?.reduce(
      (acc, curr) => {
        const isDiscounted = (curr.product.discount ?? 0) > 0;
        const discount = isDiscounted ? curr.product.price * ((curr.product.discount ?? 0) / 100) : 0;
        return acc + (curr.product.price - discount) * curr.quantity;
      },
      0
    ) || 0;

  const item_details =
    user.cart?.map((cart) => {
      return {
        id: cart.product.id,
        name: cart.product.name,
        price: cart.product.price,
        quantity: cart.quantity,
        category: "",
        brand: "Domsat",
        merchant_name: "Domsat",
        url: `https://domsat-course.vercel.app/store/${cart.product.slug}`,
      };
    }) || [];

  const parameter = {
    transaction_details: {
      order_id: `ORDER-${Date.now()}_${user.id}`,
      gross_amount: grossAmount,
    },
    customer_details: {
      first_name: user.name,
      last_name: user.name,
      email: user.email,
      phone: user.address?.phone,
      billing_address: {
        first_name: user.name,
        last_name: user.name,
        email: user.email,
        phone: user.address?.phone,
        address: user.address?.address,
        city: user.address?.city,
        postal_code: user.address?.zip,
        country_code: "IDN",
      },
      shipping_address: {
        first_name: user.name,
        last_name: user.name,
        email: user.email,
        phone: user.address?.phone,
        address: user.address?.address,
        city: user.address?.city,
        postal_code: user.address?.zip,
        country_code: "IDN",
      },
    },
    item_details,
  };
  // return parameter;
  try {
    console.log(process.env.MIDTRANS_SERVER_KEY, 'server keyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy');
    console.log(process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY, 'client keyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy');
    const token = await snap.createTransaction(parameter);
    return { orderData: parameter, transactionToken: token };
  } catch (error) {
    console.error("Midtrans error:", error);
    throw new Error("Failed to create transaction.");
  }
};
