import { axiosClient } from 'api';
import { AxiosInstance, AxiosResponse } from 'axios';
import { useMutation } from 'react-query';

export interface VerifyCodeResponse {
    code: string;
}

export type VerifyCodeInput = {
    code: string;
};

const verifyCode = async (axiosClient: AxiosInstance, props: VerifyCodeInput & { accessToken: string }) => {
    const { accessToken, code } = props;
    const response = await axiosClient.post<VerifyCodeResponse, AxiosResponse<VerifyCodeResponse>, VerifyCodeInput>(
        'activate',
        { code },
        {
            headers: {
                Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
                'Content-Type': 'application/json',
            },
        },
    );
    return response;
};

export default function useVerifyCode() {
    return useMutation((props: VerifyCodeInput & { accessToken: string }) => verifyCode(axiosClient, props));
}
