import { axiosClient } from 'api';
import { AxiosInstance, AxiosResponse } from 'axios';
import { useMutation } from 'react-query';

export type FinishRegisterResponse = FinishRegisterInput;

export type FinishRegisterInput = {
    first_name: string;
    last_name: string;
    phone_number: string;
};

const finishRegister = async (axiosClient: AxiosInstance, props: FinishRegisterInput & { accessToken: string }) => {
    const { accessToken, ...variables } = props;
    const response = await axiosClient.put<
        FinishRegisterResponse,
        AxiosResponse<FinishRegisterResponse>,
        FinishRegisterInput
    >('signup/finish', variables, {
        headers: {
            Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
            'Content-Type': 'application/json',
        },
    });
    return response;
};

export default function useFinishRegister() {
    return useMutation((props: FinishRegisterInput & { accessToken: string }) => finishRegister(axiosClient, props));
}
