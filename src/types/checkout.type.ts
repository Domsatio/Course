export type ItemDetails = {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

export type CustomerDetails = {
    name: string;
    email: string;
    phone: string;
    country: string;
    city: string;
    address: string;
    postcode: string;
}

export type TransactionDetails = {
    orderId: string;
    grossAmount: number;
}

export type Checkout =  {
    transactionDetails?: TransactionDetails;
    customerDetails: CustomerDetails;
    item_details: ItemDetails[];
}