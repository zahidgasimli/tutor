import { useMutation } from 'react-query';
import { AxiosInstance, AxiosResponse } from 'axios';
import * as Yup from 'yup';
import { axiosClient } from 'api';
import { AuthRole } from 'context/auth/store';

export interface LoginResponse {
    refresh: string;
    access: string;
}

export interface UserFromToken {
    activated_by: string;
    exp: number;
    first_name: string;
    iat: number;
    image: string | null;
    jti: string;
    last_name: string;
    role: AuthRole;
    token_type: 'access' | 'refresh';
    user_id: number;
    is_completed: boolean;
}

export type LoginInput = {
    email: string;
    password: string;
};

export const loginFormSchema = Yup.object().shape({
    email: Yup.string().email('E-poçt yanlış formatdadır').required('E-poçt daxil olunmalıdır'),
    password: Yup.string().min(8).required('Parol daxil olunmalıdır'),
});

const login = async (axiosClient: AxiosInstance, props: LoginInput) => {
    const response = await axiosClient.post<LoginResponse, AxiosResponse<LoginResponse>, LoginInput>('login', props);
    return response;
};

export default function useLogin() {
    return useMutation((props: LoginInput) => login(axiosClient, props));
}
