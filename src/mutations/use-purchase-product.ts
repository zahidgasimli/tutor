import { axiosClient } from 'api';
import { AxiosInstance } from 'axios';
import { useMutation } from 'react-query';

export type PurchaseProductResponse = {
    data: {
        page_url: string;
        token: string;
    };
    message: string;
    meta: null;
};

const purchaseProduct = async (axiosClient: AxiosInstance, productId: string) => {
    const response = await axiosClient.post<PurchaseProductResponse>(`products/${productId}/url`);
    return response;
};

export default function usePurchaseProduct() {
    return useMutation((productId: string) => purchaseProduct(axiosClient, productId));
}
