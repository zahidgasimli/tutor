import { axiosClient } from 'api';
import { AxiosInstance, AxiosResponse } from 'axios';
import { DateTime } from 'luxon';
import { CourseDirection, CourseLanguage, CourseSection, LessonFormat, StudyType } from 'queries/types';
import { useMutation } from 'react-query';
import { Metro } from 'types';

export type UpdateCourseInput = {
    id?: number;
    title?: string;
    description: string;
    sub_category: string | null;
    language: CourseLanguage;
    price: number;
    study_type: StudyType;
    lesson_format: LessonFormat;
    address_city: string;
    address_state: string;
    address_metros: Metro[];
    direction: CourseDirection;
    start_date?: DateTime;
    end_date?: DateTime;
    sections: CourseSection[];
};

export type UpdateCourseResponse = UpdateCourseInput;

export type UpdateCourseParams = Omit<UpdateCourseInput, 'start_date' | 'end_date'> & {
    start_date?: string;
    end_date?: string;
};

const updateCourse = async (axiosClient: AxiosInstance, { id, ...props }: UpdateCourseInput) => {
    const normalizedProps = { ...props, start_date: props.start_date?.toISODate(), end_date: props.end_date?.toISO() };
    const response = await axiosClient.put<
        UpdateCourseResponse,
        AxiosResponse<UpdateCourseResponse>,
        UpdateCourseParams
    >(`instructor/course/${id}`, normalizedProps);
    return response;
};

export default function useUpdateCourse() {
    return useMutation((props: UpdateCourseInput) => updateCourse(axiosClient, props));
}
