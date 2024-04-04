import { axiosClient } from 'api';
import { AxiosInstance, AxiosResponse } from 'axios';
import { useMutation } from 'react-query';

export interface RegisterResponse {
    refresh: string;
    access: string;
}

export type RegisterInput = {
    email: string;
    password: string;
    confirm_password: string;
};

const register = async (axiosClient: AxiosInstance, props: RegisterInput) => {
    const response = await axiosClient.post<RegisterResponse, AxiosResponse<RegisterResponse>, RegisterInput>(
        'signup',
        props,
    );
    return response;
};

export default function useRegister() {
    return useMutation((props: RegisterInput) => register(axiosClient, props));
}
