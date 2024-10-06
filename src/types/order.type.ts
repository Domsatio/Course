export type Order = {
  id: string;
  userId: string;
  token: Token;
  products: Product[];
  grossAmount: number;
  totalDiscount: number;
  transactionStatus: string;
  transactionTime: Date;
  settlementTime: Date;
  customerDetails: CustomerDetails;
  user: User;
};

export type CustomerDetails = {
  email: string;
  phone: string;
  last_name: string;
  first_name: string;
  billing_address: Address;
  shipping_address: Address;
};

export type Address = {
  city: string;
  email: string;
  phone: string;
  address: string;
  state: string;
  last_name: string;
  first_name: string;
  postal_code: string;
  country_code: string;
};

export type Product = {
  id: string;
  url: string;
  name: string;
  thumbnail: string;
  brand: string;
  discount: number;
  price: number;
  finalPrice: number;
  category: string;
  quantity: number;
  merchant_name: string;
};

export type Token = {
  token: string;
  redirect_url: string;
};

export type User = {
  id: string;
  email: string;
  password: null;
  emailVerified: null;
  name: string;
  role: string;
  isSubscribed: boolean;
  subscribeEnd: null;
  subscribeStart: null;
};
