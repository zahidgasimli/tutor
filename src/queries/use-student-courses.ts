import { AxiosInstance } from 'axios';
import { useQuery } from 'react-query';
import { CourseSection } from './types';
import { axiosClient } from 'api';

export const QUERY_KEY_STUDENT_COURSES = 'student_courses';

export type StudentCourse = {
    id: number;
    slug: string;
    instructor_first_name: string;
    instructor_last_name: string;
    instructor_image: string;
    title: string;
    sub_category: string;
    sections: CourseSection[];
};

export type GetStudentCoursesResponse = {
    message: string;
    data: StudentCourse[];
};

const getStudentCourses = async (axiosClient: AxiosInstance) => {
    const response = await axiosClient.get<GetStudentCoursesResponse>(`student/courses`);
    return response.data;
};

export default function useStudentCourses() {
    return useQuery([QUERY_KEY_STUDENT_COURSES], () => getStudentCourses(axiosClient));
}
