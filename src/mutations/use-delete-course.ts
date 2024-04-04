import { axiosClient } from 'api';
import { AxiosInstance } from 'axios';
import { QUERY_KEY_INSTRUCTOR_COURSES } from 'queries/use-instructor-courses';
import { useMutation, useQueryClient } from 'react-query';

const deleteCourse = async (axiosClient: AxiosInstance, id: number) => {
    const response = await axiosClient.delete(`instructor/course/${id}`);
    return response;
};

export default function useDeleteCourse() {
    const qc = useQueryClient();
    return useMutation((id: number) => deleteCourse(axiosClient, id), {
        onSuccess() {
            qc.invalidateQueries(QUERY_KEY_INSTRUCTOR_COURSES);
        },
    });
}
