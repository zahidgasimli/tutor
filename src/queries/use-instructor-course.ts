import { axiosClient } from 'api';
import { AxiosInstance } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import { Course } from './use-course';

export const QUERY_KEY_INSTRUCTOR_COURSE = 'instructor_course';

export type GetInstructorCoursesResponse = { data: Course; message: string; meta: null };

const getInstructorCourse = async (axiosClient: AxiosInstance, id?: string): Promise<GetInstructorCoursesResponse> => {
    const response = await axiosClient.get<GetInstructorCoursesResponse>(`instructor/course/${id}`);
    return response.data;
};

export default function useInstructorCourse(
    id?: string,
    options?: UseQueryOptions<GetInstructorCoursesResponse, unknown, GetInstructorCoursesResponse, string[]>,
) {
    return useQuery([QUERY_KEY_INSTRUCTOR_COURSE + id], () => getInstructorCourse(axiosClient, id), {
        enabled: !!id,
        cacheTime: 0,
        ...options,
    });
}
