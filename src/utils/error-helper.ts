import { AxiosError } from 'axios';

type ErrorMessageData = {
    detail?: string;
    message?: string;
};

export const extractErrorMessageFromAxiosError = (err: AxiosError<ErrorMessageData>) => {
    const errorData = err.response?.data;
    if (errorData) {
        const errorMessage = errorData.detail || errorData.message || '';
        if (errorMessage) return errorMessage;
        return JSON.stringify(errorData);
    } else return 'Xəta baş verdi';
};
