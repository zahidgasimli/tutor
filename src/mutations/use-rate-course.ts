import { axiosClient } from 'api';
import { AxiosInstance, AxiosResponse } from 'axios';
import { QUERY_KEY_COURSE } from 'queries/use-course';
import { QUERY_KEY_COURSE_REVIEWS } from 'queries/use-course-reviews';
import { useMutation, useQueryClient } from 'react-query';
import * as Yup from 'yup';

export type RateCourseResponse = {
    data: null;
    message: string;
    meta: null;
};

export type RateCourseInput = {
    rate: string;
    feedback: string;
};

export const rateCourseFormSchema = Yup.object().shape({
    feedback: Yup.string().required('Məlumat daxil olunmalıdır'),
});

const rateCourse = async (
    axiosClient: AxiosInstance,
    { course_id, ...props }: RateCourseInput & { course_id: number },
) => {
    const response = await axiosClient.post<
        RateCourseResponse,
        AxiosResponse<RateCourseResponse>,
        Omit<RateCourseInput, 'course_id'>
    >(`course/${course_id}/rating`, props);
    return response;
};

export default function useRateCourse(course_id: number) {
    const qc = useQueryClient();
    return useMutation((props: RateCourseInput) => rateCourse(axiosClient, { ...props, course_id }), {
        onSuccess: () => {
            qc.invalidateQueries(QUERY_KEY_COURSE_REVIEWS + course_id);
            qc.invalidateQueries(QUERY_KEY_COURSE + course_id);
        },
    });
}
