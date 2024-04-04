import { AxiosInstance } from 'axios';
import { UseQueryOptions, useQuery } from 'react-query';
import { CourseDirection, CourseLanguage, CourseSection, LessonFormat, StudyType } from './types';
import { axiosClient } from 'api';

export const QUERY_KEY_INSTRUCTOR_COURSES = 'instructor_courses';

export type InstructorCourseStatus = 'ACTIVE' | 'DRAFT' | 'ARCHIVED';
export type InstructorCoursesParams = { status: InstructorCourseStatus };

export type InstructorCourse = {
    id: number;
    slug: string;
    status: InstructorCourseStatus;
    title: string;
    description: string;
    sub_category?: string;
    language?: CourseLanguage;
    price: number;
    study_type?: StudyType;
    lesson_format?: LessonFormat;
    address_city?: string;
    address_state?: string;
    address_metros?: string[];
    direction?: CourseDirection;
    start_date: string;
    end_date: string;
    sections: CourseSection[];
};

export type GetInstructorCoursesResponse = {
    message: string;
    data: InstructorCourse[];
};

const getInstructorCourses = async (axiosClient: AxiosInstance, params: InstructorCoursesParams) => {
    const response = await axiosClient.get<GetInstructorCoursesResponse>(`instructor/courses?status=${params.status}`);
    return response.data;
};

export default function useInstructorCourses(
    key?: string,
    params?: InstructorCoursesParams,
    options?: UseQueryOptions<GetInstructorCoursesResponse, unknown, GetInstructorCoursesResponse, string[]>,
) {
    return useQuery(
        key ? [QUERY_KEY_INSTRUCTOR_COURSES, key] : [QUERY_KEY_INSTRUCTOR_COURSES],
        () => getInstructorCourses(axiosClient, params || { status: 'ACTIVE' }),
        { refetchOnMount: false, refetchOnReconnect: false, refetchOnWindowFocus: false, ...options },
    );
}
