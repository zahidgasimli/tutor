import { axiosClient } from 'api';
import { AxiosInstance, AxiosResponse } from 'axios';
import { QUERY_KEY_COURSE_REQUESTS } from 'queries/use-course-requests';
import { useMutation, useQueryClient } from 'react-query';

export interface MakeCourseRequestDecisionResponse {
    is_accepted: boolean;
}

export type MakeCourseRequestDecisionInput = {
    request_id: number;
    is_accepted: boolean;
};

const makeCourseRequestDecision = async (axiosClient: AxiosInstance, props: MakeCourseRequestDecisionInput) => {
    const response = await axiosClient.post<
        MakeCourseRequestDecisionResponse,
        AxiosResponse<MakeCourseRequestDecisionResponse>,
        Pick<MakeCourseRequestDecisionInput, 'is_accepted'>
    >(`course/requests/${props.request_id}/decision`, { is_accepted: props.is_accepted });
    return response;
};

export default function useMakeCourseRequestDecision() {
    const qc = useQueryClient();
    return useMutation((props: MakeCourseRequestDecisionInput) => makeCourseRequestDecision(axiosClient, props), {
        onSuccess() {
            qc.invalidateQueries(QUERY_KEY_COURSE_REQUESTS);
        },
    });
}
