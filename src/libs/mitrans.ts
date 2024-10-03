import midtransClient from "midtrans-client";

export const MISTRANS_BASE_URL = process.env.NEXT_PUBLIC_MIDTRANS_BASE_URL;
export const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
});
