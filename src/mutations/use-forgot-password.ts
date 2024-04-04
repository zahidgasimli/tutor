import { useMutation } from 'react-query';
import { AxiosInstance, AxiosResponse } from 'axios';
import * as Yup from 'yup';
import { axiosClient } from 'api';

export interface ForgotPasswordResponse {
    email: string;
}

export type ForgotPasswordInput = {
    email: string;
};

export const forgotPasswordFormSchema = Yup.object().shape({
    email: Yup.string().email('E-poçt yanlış formatdadır').required('E-poçt daxil olunmalıdır'),
});

const forgotPassword = async (axiosClient: AxiosInstance, props: ForgotPasswordInput) => {
    const response = await axiosClient.post<
        ForgotPasswordResponse,
        AxiosResponse<ForgotPasswordResponse>,
        ForgotPasswordInput
    >('forgot-password', props);
    return response;
};

export default function useForgotPassword() {
    return useMutation((props: ForgotPasswordInput) => forgotPassword(axiosClient, props));
}
