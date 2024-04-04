import { useMutation } from 'react-query';
import { AxiosInstance, AxiosResponse } from 'axios';
import * as Yup from 'yup';
import { axiosClient } from 'api';

export interface ResetPasswordResponse {
    new_password: string;
    confirm_new_password: string;
}

export type ResetPasswordInput = {
    token: string;
    new_password: string;
    confirm_new_password: string;
};

export const resetPasswordFormSchema = Yup.object().shape({
    new_password: Yup.string().min(8, 'Minimum 8 simvol olmalıdır').required('Şifrə daxil olunmalıdır'),
    confirm_new_password: Yup.string()
        .oneOf([Yup.ref('new_password')], 'Şifrələr eyni deyil')
        .required('Şifrə daxil olunmalıdır'),
});

const resetPassword = async (axiosClient: AxiosInstance, { token, ...props }: ResetPasswordInput) => {
    const response = await axiosClient.put<
        ResetPasswordResponse,
        AxiosResponse<ResetPasswordResponse>,
        Omit<ResetPasswordInput, 'token'>
    >(`reset-password/${token}`, props);
    return response;
};

export default function useResetPassword() {
    return useMutation((props: ResetPasswordInput) => resetPassword(axiosClient, props));
}
