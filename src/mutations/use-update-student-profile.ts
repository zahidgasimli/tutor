import { axiosClient } from 'api';
import { AxiosInstance, AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import { phoneNumberSchema } from 'utils/phone-number-helper';
import * as Yup from 'yup';

export interface UpdateStudentProfileResponse {
    first_name: string;
    last_name: string;
    phone_number: string;
    address: string;
    image: File | null;
}

export type UpdateStudentProfileInput = {
    first_name: string;
    last_name: string;
    phone_number: string;
    address: string;
    image?: File | null;
};

export type UpdateStudentProfileParams = FormData;

export const updateStudentProfileFormSchema = Yup.object().shape({
    first_name: Yup.string().required('Ad daxil olunmalıdır'),
    last_name: Yup.string().required('Soyad daxil olunmalıdır'),
    phone_number: phoneNumberSchema.required('Nömrə daxil olunmalıdır'),
    address: Yup.string().required('Adres daxil olunmalıdır'),
});

const updateStudentProfile = async (axiosClient: AxiosInstance, props: FormData) => {
    const response = await axiosClient.patch<
        UpdateStudentProfileResponse,
        AxiosResponse<UpdateStudentProfileResponse>,
        UpdateStudentProfileParams
    >('users', props, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response;
};

export default function useUpdateStudentProfile() {
    return useMutation((props: FormData) => updateStudentProfile(axiosClient, props));
}
