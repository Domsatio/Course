import { snap } from "@/libs/mitrans";
import prisma from "@/libs/prisma/db";
import { generateRandomString, formatMidtransExpiryDate } from "@/helpers/appFunction";

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

  if (!user || !user.cart || user.cart.length === 0) {
    return false;
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
        price: cart.product.discount ? cart.product.price - (cart.product.price * cart.product.discount) / 100 : cart.product.price,
        quantity: cart.quantity,
        category: "",
        brand: "Domsat",
        merchant_name: "Domsat",
        url: `https://domsat-course.vercel.app/store/${cart.product.slug}`,
      };
    }) || [];

  const parameter = {
    transaction_details: {
      order_id: `${user.id}_${generateRandomString(10)}`,
      gross_amount: grossAmount,
    },
    customer_details: {
      first_name: user.name,
      last_name: "",
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
    expiry: {
      start_time: formatMidtransExpiryDate(new Date()),
      unit: "day",
      duration: 1,
    },
    page_expiry: {
      duration: 1,
      unit: "day",
    }
  };
  // return parameter;
  try {
    const token = await snap.createTransaction(parameter);
    return { orderData: parameter, transactionToken: token };
  } catch (error) {
    console.error("Midtrans error:", error);
    return false;
  }
};
