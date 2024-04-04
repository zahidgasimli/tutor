import axios from 'axios';
import { API_URL } from 'config';
import { useAuthStore } from 'context/auth/store';
import { renewAccessToken } from 'mutations/use-refresh-token';

export const API_BASE_URL = `${API_URL}/api/v1/`;

const axiosClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 40000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Adding Authorization header for all requests
axiosClient.interceptors.request.use(
    (config) => {
        const accessToken = useAuthStore.getState().accessToken;
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// Adding a retry to the request to fetch a new accessToken if the request failed with 401(old accessToken expired)
axiosClient.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;

        if (originalConfig.url !== 'login' && err.response) {
            // Access Token was expired
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;

                try {
                    const response = await renewAccessToken({ refresh: useAuthStore.getState().refreshToken || '' });

                    const accessToken = response.access;
                    const refreshToken = response.refresh;

                    useAuthStore.setState({ accessToken, refreshToken });

                    return axiosClient(originalConfig);
                } catch (_error) {
                    // Logging out the user by removing all the tokens from state because refreshToken is expired
                    useAuthStore.getState().logout();
                    return Promise.reject(_error);
                }
            }
        }

        return Promise.reject(err);
    },
);

export { axiosClient };
