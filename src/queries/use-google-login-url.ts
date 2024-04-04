import { axiosClient } from 'api';
import { AxiosInstance } from 'axios';
import { useQuery } from 'react-query';

export const QUERY_KEY_GOOGLE_LOGIN_URL = 'google_login_url';

export type GetGoogleLoginUrlResponse = { url: string };

const getGoogleLoginUrl = async (axiosClient: AxiosInstance): Promise<GetGoogleLoginUrlResponse> => {
    const response = await axiosClient.get<GetGoogleLoginUrlResponse>('google/login/url');
    return response.data;
};

export default function useGoogleLoginUrl() {
    return useQuery([QUERY_KEY_GOOGLE_LOGIN_URL], () => getGoogleLoginUrl(axiosClient));
}
