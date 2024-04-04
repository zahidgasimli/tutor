import { useMutation } from 'react-query';
import { AxiosInstance, AxiosResponse } from 'axios';
import * as Yup from 'yup';
import { axiosClient } from 'api';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ChangePasswordResponse {}

export type ChangePasswordInput = {
    old_password: string;
    new_password: string;
    confirm_new_password: string;
};

export const changePasswordFormSchema = Yup.object().shape({
    old_password: Yup.string().min(8, 'Ən azı 8 simvol olmalıdır').required('Cari parol daxil olunmalıdır'),
    new_password: Yup.string()
        .min(8, 'Ən azı 8 simvol olmalıdır')
        .notOneOf([Yup.ref('old_password')], 'Yeni şifrə cari şifrə ilə eyni ola bilməz')
        .required('Yeni parol daxil olunmalıdır'),
    confirm_new_password: Yup.string()
        .oneOf([Yup.ref('new_password')], 'Şifrələr eyni deyil')
        .min(8, 'Ən azı 8 simvol olmalıdır')
        .required('Yeni parol təkrarı daxil olunmalıdır'),
});

const changePassword = async (axiosClient: AxiosInstance, props: ChangePasswordInput) => {
    const response = await axiosClient.put<
        ChangePasswordResponse,
        AxiosResponse<ChangePasswordResponse>,
        ChangePasswordInput
    >('change-password', props);
    return response;
};

export default function useChangePassword() {
    return useMutation((props: ChangePasswordInput) => changePassword(axiosClient, props));
}
