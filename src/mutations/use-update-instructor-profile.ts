import { axiosClient } from 'api';
import { AxiosInstance, AxiosResponse } from 'axios';
import { DateTime } from 'luxon';
import { useMutation } from 'react-query';
import { InstructorGender } from 'types';
import * as Yup from 'yup';

export interface UpdateInstructorProfileResponse {
    first_name: string;
    last_name: string;
    gender: InstructorGender;
    birth_date: DateTime | null;
    experience_month: number;
    experience_year: number;
    image: File | null;
}

export type UpdateInstructorProfileInput = {
    first_name: string;
    last_name: string;
    gender: InstructorGender;
    birth_date?: DateTime | null;
    experience_month?: number;
    experience_year?: number;
    image?: File | string | null;
};

export type UpdateInstructorProfileParams = FormData;

export const updateInstructorProfileFormSchema = Yup.object().shape({
    first_name: Yup.string().required('Ad daxil olunmalıdır'),
    last_name: Yup.string().required('Soyad daxil olunmalıdır'),
    gender: Yup.string()
        .required('Cinsiyyət seçilməlidir')
        .oneOf([InstructorGender.MALE, InstructorGender.FEMALE], 'Cinsiyyət Kişi və ya Qadın olmalıdır'),
    birth_date: Yup.mixed().nonNullable().required('Doğum tarixi daxil olunmalıdır'),
    experience_month: Yup.number().required('Təcrübə ayı daxil olunmalıdır'),
    experience_year: Yup.number().required('Təcrübə ili daxil olunmalıdır'),
    image: Yup.mixed().required('Şəkil yüklənməlidir'),
});

const updateInstructorProfile = async (axiosClient: AxiosInstance, props: FormData) => {
    const response = await axiosClient.post<
        UpdateInstructorProfileResponse,
        AxiosResponse<UpdateInstructorProfileResponse>,
        UpdateInstructorProfileParams
    >('instructor', props, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response;
};

export default function useUpdateInstructorProfile() {
    return useMutation((props: FormData) => updateInstructorProfile(axiosClient, props));
}
