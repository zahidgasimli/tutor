import { axiosClient } from 'api';
import { AxiosInstance } from 'axios';
import { useMutation } from 'react-query';

export type WishlistCourseResponse = {
    data: null;
    message: string;
    meta: null;
};

const wishlistCourse = async (axiosClient: AxiosInstance, course_id: number) => {
    const response = await axiosClient.put<WishlistCourseResponse>(`wishlist/courses/${course_id}`);
    return response;
};

export default function useWishlistCourse() {
    return useMutation((course_id: number) => wishlistCourse(axiosClient, course_id));
}
