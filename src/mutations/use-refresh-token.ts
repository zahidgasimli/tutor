import { API_BASE_URL } from 'api';
import axios, { AxiosResponse } from 'axios';
import { useMutation } from 'react-query';

export interface RenewAccessTokenResponse {
    access: string;
    refresh: string;
}

export type RenewAccessTokenInput = {
    refresh: string;
};

export const renewAccessToken = async (props: RenewAccessTokenInput) => {
    const response = await axios.post<
        RenewAccessTokenResponse,
        AxiosResponse<RenewAccessTokenResponse>,
        RenewAccessTokenInput
    >(`${API_BASE_URL}refresh-token`, props);
    return response.data;
};

export default function useRenewAccessToken() {
    return useMutation((props: RenewAccessTokenInput) => renewAccessToken(props));
}
