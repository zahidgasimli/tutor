import { axiosClient } from 'api';
import { AxiosInstance, AxiosResponse } from 'axios';
import { DateTime } from 'luxon';
import { useMutation } from 'react-query';
import * as Yup from 'yup';

export interface UpdateInstructorExperienceResponse {
    refresh: string;
    access: string;
}

export type InstructorEducationInput = {
    id?: number;
    university: string;
    faculty: string;
    start_date: DateTime | null;
    end_date?: DateTime | null;
    is_ongoing: boolean;
};

export type InstructorJobInput = {
    id?: number;
    company: string;
    position: string;
    start_date: DateTime | null;
    end_date?: DateTime | null;
    is_ongoing: boolean;
};

export type InstructorSertificateInput = {
    id?: number;
    name: string;
    file?: File | string;
};

export type UpdateInstructorExperienceInput = {
    educations: InstructorEducationInput[];
    jobs: InstructorJobInput[];
    certificates: InstructorSertificateInput[];
};

export type UpdateInstructorExperienceParams = FormData;

export const updateInstructorExperienceFormSchema = Yup.object().shape({
    educations: Yup.array()
        .of(
            Yup.object().shape({
                university: Yup.string().required('Müəssisə daxil olunmalıdır'),
                faculty: Yup.string().required('İxtisas daxil olunmalıdır'),
                start_date: Yup.mixed().nonNullable().required('Başlama tarixi daxil olunmalıdır'),
                is_ongoing: Yup.boolean(),
                end_date: Yup.mixed().when('is_ongoing', {
                    is: false, // alternatively: (val) => val == true
                    then: (schema) => schema.nonNullable().required('Bitmə tarixi daxil olunmalıdır'),
                    otherwise: (schema) => schema.nullable(),
                }),
            }),
        )
        .min(1, 'Ən azı 1 təhsil əlavə olunmalıdır')
        .required('Ən azı 1 təhsil əlavə olunmalıdır'),
    jobs: Yup.array()
        .of(
            Yup.object().shape({
                company: Yup.string().required('İş yeri daxil olunmalıdır'),
                position: Yup.string().required('Vəzifə daxil olunmalıdır'),
                start_date: Yup.mixed().nonNullable().required('Başlama tarixi daxil olunmalıdır'),
                is_ongoing: Yup.boolean(),
                end_date: Yup.mixed().when('is_ongoing', {
                    is: false, // alternatively: (val) => val == true
                    then: (schema) => schema.nonNullable().required('Bitmə tarixi daxil olunmalıdır'),
                    otherwise: (schema) => schema.nullable(),
                }),
            }),
        )
        .min(1, 'Ən azı 1 iş yeri əlavə olunmalıdır')
        .required('Ən azı 1 iş yeri əlavə olunmalıdır'),
    certificates: Yup.array().of(
        Yup.object().shape({
            name: Yup.string().required('Sertifikat adı daxil olunmalıdır'),
            file: Yup.mixed().required('Sertifikat faylı yüklənməlidir'),
        }),
    ),
});

const updateInstructorExperience = async (axiosClient: AxiosInstance, props: FormData) => {
    const response = await axiosClient.put<
        UpdateInstructorExperienceResponse,
        AxiosResponse<UpdateInstructorExperienceResponse>,
        UpdateInstructorExperienceParams
    >('instructor/experince', props, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response;
};

export default function useUpdateInstructorExperience() {
    return useMutation((props: FormData) => updateInstructorExperience(axiosClient, props));
}
