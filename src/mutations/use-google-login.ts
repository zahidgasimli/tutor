import { axiosClient } from 'api';
import { AxiosInstance, AxiosResponse } from 'axios';
import { useMutation } from 'react-query';

export interface GoogleLoginResponse {
    refresh_token: string;
    access_token: string;
}

export type GoogleLoginInput = {
    code: string;
};

const googleLogin = async (axiosClient: AxiosInstance, props: GoogleLoginInput) => {
    const response = await axiosClient.post<GoogleLoginResponse, AxiosResponse<GoogleLoginResponse>, GoogleLoginInput>(
        'google/login',
        props,
    );
    return response;
};

export default function useGoogleLogin() {
    return useMutation((props: GoogleLoginInput) => googleLogin(axiosClient, props));
}
