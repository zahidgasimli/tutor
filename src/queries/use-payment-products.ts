import { axiosClient } from 'api';
import { AxiosInstance } from 'axios';
import { useQuery } from 'react-query';

export const QUERY_KEY_PAYMENT_PRODUCTS = 'payment_products';

export type Currency = 'AZN' | 'TRY';

export type PaymentProduct = {
    currency: 'AZN' | 'TRY';
    description: string;
    id: string;
    name: string;
    price: number;
};

export type GetPaymentProductsResponse = {
    message: string;
    data: PaymentProduct[];
};

const getPaymentProducts = async (axiosClient: AxiosInstance) => {
    const response = await axiosClient.get<GetPaymentProductsResponse>(`products`);
    return response.data;
};

export default function usePaymentProducts() {
    return useQuery([QUERY_KEY_PAYMENT_PRODUCTS], () => getPaymentProducts(axiosClient));
}
