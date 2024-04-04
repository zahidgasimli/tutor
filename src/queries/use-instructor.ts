import { axiosClient } from 'api';
import { AxiosInstance } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import { InstructorEducation, InstructorJob, InstructorCertificate, InstructorGender } from 'types';

export const QUERY_KEY_INSTRUCTOR = 'instructor';

export type Instructor = {
    first_name: string;
    last_name: string;
    gender: InstructorGender;
    image: string;
    experience_year: number;
    experience_month: number;
    birth_date: string;
    educations: InstructorEducation[];
    jobs: InstructorJob[];
    certificates: InstructorCertificate[];
};

export type GetInstructorResponse = { message: string; data: Instructor };

const getInstructor = async (axiosClient: AxiosInstance, id?: number) => {
    const path = id ? `instructor/${id}` : 'instructor';
    const response = await axiosClient.get<GetInstructorResponse>(path);
    return response.data;
};

export default function useInstructor(
    id?: number,
    options?: UseQueryOptions<GetInstructorResponse, unknown, GetInstructorResponse, string[]>,
) {
    return useQuery([QUERY_KEY_INSTRUCTOR + id], () => getInstructor(axiosClient, id), options);
}
