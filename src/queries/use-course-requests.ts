import { axiosClient } from 'api';
import { AxiosInstance } from 'axios';
import { useQuery, useQueryClient } from 'react-query';
import { StudentApplicationStatus } from './use-student-applications';
import { CourseSection } from './types';

export const QUERY_KEY_COURSE_REQUESTS = 'course_requests';
export const QUERY_KEY_COURSE_STUDENTS = 'course_students';

export type CourseRequest = {
    id: number;
    status: StudentApplicationStatus;
    student_first_name: string;
    student_last_name: string;
    student_phone_number: string;
    course_name: string;
    sections: CourseSection[];
};

export type GetCourseRequestsResponse = { message: string; data: CourseRequest[] };

const getCourseRequests = async (axiosClient: AxiosInstance, statuses?: StudentApplicationStatus[]) => {
    const response = await axiosClient.get<GetCourseRequestsResponse>(
        `course/requests${statuses ? `?status=${statuses.join(',')}` : ''}`,
    );
    return response.data;
};

export default function useCourseRequests(statuses?: StudentApplicationStatus[]) {
    const qc = useQueryClient();
    return useQuery(
        statuses ? [QUERY_KEY_COURSE_STUDENTS] : [QUERY_KEY_COURSE_REQUESTS],
        () => getCourseRequests(axiosClient, statuses),
        {
            onSuccess: () => {
                if (!statuses) {
                    qc.invalidateQueries(QUERY_KEY_COURSE_STUDENTS);
                }
            },
        },
    );
}
