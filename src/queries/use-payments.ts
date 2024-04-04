import { axiosClient } from 'api';
import { AxiosInstance } from 'axios';
import { useQuery } from 'react-query';
import { Currency } from './use-payment-products';

export const QUERY_KEY_PAYMENTS = 'payments';

export type PaymentStatus = 'SUCCESS' | 'FAIL' | 'CANCEL';

export type Payment = {
    created_at: string;
    currency: Currency;
    description: string;
    id: string;
    paid_price: number;
    status: PaymentStatus;
};

export type GetPaymentsResponse = {
    message: string;
    data: Payment[];
};

const getPayments = async (axiosClient: AxiosInstance) => {
    const response = await axiosClient.get<GetPaymentsResponse>(`payments`);
    return response.data;
};

export default function usePayments() {
    return useQuery([QUERY_KEY_PAYMENTS], () => getPayments(axiosClient));
}
