import { snap } from "@/libs/midtrans";
import prisma from "@/libs/prisma/db";
import { generateRandomString, formatMidtransExpiryDate } from "@/helpers/appFunction";

const mapItemDetails = (cartItems: any[]) => {
  return cartItems.map((cart) => ({
    id: cart.product.id,
    name: cart.product.name,
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
      ? curr.product.price * (curr.product.discount / 100)
      : 0;
    return acc + (curr.product.price - discount) * curr.quantity;
  }, 0);
};

const createCustomerDetails = (user: any) => ({
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
});

const createTransactionParams = (user: any, cartItems: any[]) => {
  const grossAmount = calculateGrossAmount(cartItems);
  const itemDetails = mapItemDetails(cartItems);

  return {
    transaction_details: {
      order_id: `${user.id}_${generateRandomString(10)}`,
      gross_amount: grossAmount,
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

  console.log(user.TemporaryCart);

  const params = createTransactionParams(user, Array.isArray(user.TemporaryCart) ? user.TemporaryCart : [user.TemporaryCart]);

  try {
    const token = await snap.createTransaction(params);
    return { orderData: params, transactionToken: token };
  } catch (error) {
    console.error("Midtrans error:", error);
    return false;
  }
};