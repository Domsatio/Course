import { snap, coreApi } from "@/libs/midtrans";
import prisma from "@/libs/prisma/db";
import {
  generateRandomString,
  formatMidtransExpiryDate,
} from "@/helpers/appFunction";
import axios from "axios";

const mapItemDetails = (cartItems: any[]) => {
  return cartItems.map((cart) => ({
    id: cart.product.id,
    name: cart.product.name,
    thumbnail: cart.product.thumbnail,
    price: cart.product.discount
      ? cart.product.price - (cart.product.price * cart.product.discount) / 100
      : cart.product.price,
    quantity: cart.quantity,
    category: "",
    brand: "Domsat",
    merchant_name: "Domsat",
    url: `https://domsat-course.vercel.app/store/${cart.product.slug}`,
  }));
};

const calculateGrossAmount = (cartItems: any[]) => {
  return cartItems.reduce((acc, curr) => {
    const discount = curr.product.discount
      ? (curr.product.price * curr.product.discount) / 100
      : 0;
    return acc + (curr.product.price - discount) * curr.quantity;
  }, 0);
};

const calculatetotalDiscount = (cartItems: any[]) => {
  return cartItems.reduce((acc, curr) => {
    const discount = curr.product.discount
      ? (curr.product.price * curr.product.discount) / 100
      : 0;
    return acc + discount * curr.quantity;
  }, 0);
};

const createCustomerDetails = (user: any) => ({
  first_name: user.name,
  last_name: "",
  email: user.email,
  phone: user.address?.phone,
  billing_address: {
    first_name: user.name,
    last_name: "",
    email: user.email,
    phone: user.address?.phone,
    address: user.address?.address,
    state: user.address?.state,
    city: user.address?.city,
    postal_code: user.address?.zip,
    country_code: "IDN",
  },
  shipping_address: {
    first_name: user.name,
    last_name: "",
    email: user.email,
    phone: user.address?.phone,
    address: user.address?.address,
    state: user.address?.state,
    city: user.address?.city,
    postal_code: user.address?.zip,
    country_code: "IDN",
  },
});

const createTransactionParams = (user: any, cartItems: any[]) => {
  const grossAmount = calculateGrossAmount(cartItems);
  const totalDiscount = calculatetotalDiscount(cartItems);
  const itemDetails = mapItemDetails(cartItems);

  return {
    transaction_details: {
      order_id: `${user.id}_${generateRandomString(10)}`,
      gross_amount: grossAmount,
      total_discount: totalDiscount,
    },
    customer_details: createCustomerDetails(user),
    item_details: itemDetails,
    expiry: {
      start_time: formatMidtransExpiryDate(new Date()),
      unit: "day",
      duration: 1,
    },
    page_expiry: {
      duration: 1,
      unit: "day",
    },
  };
};

// Main Functions
export const createTransaction = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      cart: {
        where: { isChecked: true },
        include: { product: true },
      },
      address: true,
    },
  });

  if (!user || !user.cart || user.cart.length === 0) {
    return false;
  }

  const params = createTransactionParams(user, user.cart);

  try {
    const token = await snap.createTransaction(params);
    await prisma.order.create({
      data: {
        id: params.transaction_details.order_id,
        userId: user.id,
        products: params.item_details,
        grossAmount: params.transaction_details.gross_amount,
        totalDiscount: params.transaction_details.total_discount,
        token: token,
        transactionStatus: "pending",
        customerDetails: params.customer_details,
      },
    });
    return { orderData: params, transactionToken: token };
  } catch (error) {
    console.error("Midtrans error:", error);
    return false;
  }
};

export const createTransactionBuyDirectly = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      TemporaryCart: { include: { product: true } },
      address: true,
    },
  });

  if (!user || !user.TemporaryCart) {
    return false;
  }

  const params = createTransactionParams(
    user,
    Array.isArray(user.TemporaryCart)
      ? user.TemporaryCart
      : [user.TemporaryCart]
  );

  try {
    const token = await snap.createTransaction(params);
    await prisma.order.create({
      data: {
        id: params.transaction_details.order_id,
        userId: user.id,
        products: params.item_details,
        grossAmount: params.transaction_details.gross_amount,
        totalDiscount: params.transaction_details.total_discount,
        token: token,
        transactionStatus: "pending",
        customerDetails: params.customer_details,
      },
    });
    return { orderData: params, transactionToken: token };
  } catch (error) {
    console.error("Midtrans error:", error);
    return false;
  }
};

export const cencelTransaction = async (orderId: string) => {
  try {
    await axios.post(
      `https://api.sandbox.midtrans.com/v2/${orderId}/cancel`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${Buffer.from(process.env.MIDTRANS_SERVER_KEY + ':').toString('base64')}`,
        },
      }
    );
    return true;
  } catch (error) {
    console.error("Midtrans error:", error);
    return false;
  }
}

export const createSubscription = async (userId: string, duration: 'monthly' | 'annually', paymentMethod: 'credit_card'|'gopay') => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      address: true,
    },
  });

  if (!user) {
    return false;
  }
  let token = '';

  if(paymentMethod === 'credit_card') {
    token = await coreApi.createToken({
      card_number: "4811111111111114",
      card_cvv: "123",
      card_exp_month: "12",
      card_exp_year: "2025",
      client_key: process.env.MIDTRANS_CLIENT_KEY,
    });
  } else {
    token = await coreApi.getPaymentAccount('088985977908')
  }
  console.log(token, 'tpkennnnnnnnnnnnnnnnnnnnnnnnn');
  const params = {
    name: `Domsat ${duration} Subscription`,
    amount: duration === 'monthly' ? 49999 : 529999,
    currency: "IDR",
    payment_type: paymentMethod,
    token: token,
    schedule: {
      interval: 1,
      interval_unit: duration === 'monthly' ? 'month' : 'year',
      max_interval: duration === 'monthly' ? 12 : 1,
      start_time: ""
    },
    metadata: {
      description: "Recurring payment for a Domsat subscription",
    },
    customer_details: {
      first_name: user.name,
      last_name: "",
      email: user.email,
      phone: user.address?.phone,
    },
  };

  try {
    // const token = await coreApi.createSubscription(params);
    return { subcriptionData: params};
  } catch (error) {
    console.error("Midtrans error:", error);
    return false;
  }
};
