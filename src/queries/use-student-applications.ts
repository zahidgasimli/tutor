import { axiosClient } from 'api';
import { AxiosInstance } from 'axios';
import { useQuery } from 'react-query';

export const QUERY_KEY_STUDENT_APPLICATIONS = 'student_applications';

export enum StudentApplicationStatus {
    APPLIED = 'APPLIED',
    WAITING = 'WAITING',
    ENROLLED = 'ENROLLED',
    DECLINED = 'DECLINED',
}

export type StudentApplication = {
    instructor_first_name: string;
    instructor_last_name: string;
    course_name: string;
    course_sub_category: string;
    status: StudentApplicationStatus;
    applied_date: string;
};

export type GetStudentApplicationsResponse = {
    message: string;
    data: StudentApplication[];
};

const getStudentApplications = async (axiosClient: AxiosInstance) => {
    const response = await axiosClient.get<GetStudentApplicationsResponse>(`student/requests`);
    return response.data;
};

export default function useStudentApplications() {
    return useQuery([QUERY_KEY_STUDENT_APPLICATIONS], () => getStudentApplications(axiosClient));
}
