import { AxiosInstance } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import { Metro } from 'types';
import { CourseDirection, CourseLanguage, CourseSection, LessonFormat, StudyType } from './types';
import { axiosClient } from 'api';
import { StudentApplicationStatus } from './use-student-applications';

export const QUERY_KEY_COURSE = 'course';

export type CourseRating = 1 | 2 | 3 | 4 | 5;

export type Course = {
    id: number;
    slug: string;
    title: string;
    description: string;
    sub_category: string;
    language: CourseLanguage;
    price: number;
    monthly_price: number;
    study_type: StudyType;
    lesson_format: LessonFormat;
    address_city: string;
    address_state: string;
    address_metros: Metro[];
    direction: CourseDirection;
    start_date: string;
    end_date: string;
    sections: CourseSection[];
    image: string | null;
    average_rating?: number;
    rating_count?: number;
    instructor_id: number;
    apply_status: StudentApplicationStatus;
    is_applied?: boolean;
    is_in_wishlist?: boolean;
    is_rated?: boolean;
};

export type GetCoursesResponse = { data: Course; message: string; meta: null };

const getCourse = async (axiosClient: AxiosInstance, slug?: string): Promise<GetCoursesResponse> => {
    const response = await axiosClient.get<GetCoursesResponse>(`course/${slug}`);
    const course = response.data.data;
    const average_rating = course.average_rating;
    return {
        ...response.data,
        data: { ...course, average_rating: average_rating ? Number(average_rating.toFixed(1)) : undefined },
    };
};

export default function useCourse(
    slug?: string,
    options?: UseQueryOptions<GetCoursesResponse, unknown, GetCoursesResponse, string[]>,
) {
    return useQuery([QUERY_KEY_COURSE + slug], () => getCourse(axiosClient, slug), options);
}
