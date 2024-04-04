import { axiosClient } from 'api';
import { AxiosInstance } from 'axios';
import { useQuery } from 'react-query';
import { CourseSection } from './types';

export const QUERY_KEY_WISHLISTED_COURSES = 'wishlisted_courses';

export type WishlistedCourse = {
    id: number;
    slug: string;
    instructor_first_name: string;
    instructor_last_name: string;
    instructor_image: string | null;
    title: string;
    price: number;
    monthly_price: number;
    sub_category: string;
    sections: CourseSection[];
};

export type GetWishlistedCoursesResponse = { data: { id: number; courses: WishlistedCourse[] }; message: string };

const getWishlistedCourses = async (axiosClient: AxiosInstance) => {
    const response = await axiosClient.get<GetWishlistedCoursesResponse>(`student/wishlist`);
    return response.data;
};

export default function useWishlistedCourses() {
    return useQuery([QUERY_KEY_WISHLISTED_COURSES], () => getWishlistedCourses(axiosClient));
}
