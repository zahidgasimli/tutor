import { axiosClient } from 'api';
import { AxiosInstance } from 'axios';
import { useQuery } from 'react-query';

export const QUERY_KEY_NOTIFICATIONS = 'notifications';

export type Notification = {
    title: string;
    description: string;
    extra?: { [key: string]: string };
    created_at: string;
};

export type GetNotificationsResponse = Notification[];

const getNotifications = async (axiosClient: AxiosInstance) => {
    const response = await axiosClient.get<GetNotificationsResponse>(`notifications`);
    return response.data;
};

export default function useNotifications() {
    return useQuery([QUERY_KEY_NOTIFICATIONS], () => getNotifications(axiosClient));
}
