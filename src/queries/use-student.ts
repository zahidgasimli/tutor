import { axiosClient } from 'api';
import { AxiosInstance } from 'axios';
import { UseQueryOptions, useQuery } from 'react-query';

export const QUERY_KEY_STUDENT = 'student';

export type Student = {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    address: string | null;
    image: string;
    birth_date: string;
    limits: { 'course-apply-count': number };
};

export type GetStudentResponse = { message: string; data: Student };

const getStudent = async (axiosClient: AxiosInstance) => {
    const response = await axiosClient.get<GetStudentResponse>('student');
    return response.data;
};

export default function useStudent(
    options?: UseQueryOptions<GetStudentResponse, unknown, GetStudentResponse, string[]>,
) {
    return useQuery([QUERY_KEY_STUDENT], () => getStudent(axiosClient), options);
}
