import { axiosClient } from 'api';
import { AxiosInstance } from 'axios';
import { QUERY_KEY_COURSE } from 'queries/use-course';
import { QUERY_KEY_STUDENT } from 'queries/use-student';
import { useMutation, useQueryClient } from 'react-query';

export type CourseApplyResponse = {
    data: null;
    message: string;
    meta: null;
};

const courseApply = async (axiosClient: AxiosInstance, id: number) => {
    const response = await axiosClient.post<CourseApplyResponse>(`course/${id}/apply`);
    return response;
};

export default function useCourseApply(course_id: number, course_slug: string) {
    const qc = useQueryClient();
    return useMutation(() => courseApply(axiosClient, course_id), {
        onSuccess: () => {
            qc.invalidateQueries(QUERY_KEY_COURSE + course_slug);
            qc.invalidateQueries(QUERY_KEY_STUDENT);
        },
    });
}
