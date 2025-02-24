export type Subscription = {
    plan: 'monthly' | 'annually';
    paymentMethod: 'credit_card' | 'gopay';
    payload: any;
};