import { axiosClient } from 'api';
import { AxiosInstance } from 'axios';
import { useQuery } from 'react-query';

export const QUERY_KEY_CATEGORIES = 'categories';

export type Category = {
    id: number;
    name: 'string';
    sub_categories: Omit<Category, 'sub_categories'>[];
};

export type GetCategoriesResponse = {
    message: string;
    data: Category[];
};

const getCategories = async (axiosClient: AxiosInstance) => {
    const response = await axiosClient.get<GetCategoriesResponse>(`categories`);
    return response.data;
};

export default function useCategories() {
    return useQuery([QUERY_KEY_CATEGORIES], () => getCategories(axiosClient));
}
