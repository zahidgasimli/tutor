import { axiosClient } from 'api';
import { AxiosInstance } from 'axios';
import { useQuery } from 'react-query';
import { CourseRating } from './use-course';

export const QUERY_KEY_COURSE_REVIEWS = 'course_reviews';

export type CourseReview = {
    id: number;
    student_first_name: string;
    student_last_name: string;
    student_image: string | null;
    rate: CourseRating;
    feedback: string;
    created_at: string;
};

export type GetCourseReviewsResponse = { data: CourseReview[]; message: string };

const getCourseReviews = async (axiosClient: AxiosInstance, course_id: number) => {
    const response = await axiosClient.get<GetCourseReviewsResponse>(`course/${course_id}/ratings`);
    return response.data;
};

export default function useCourseReviews(course_id: number) {
    return useQuery([QUERY_KEY_COURSE_REVIEWS + course_id], () => getCourseReviews(axiosClient, course_id));
}
