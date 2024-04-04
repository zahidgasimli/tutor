import { axiosClient } from 'api';
import { AxiosInstance, AxiosResponse } from 'axios';
import { DateTime } from 'luxon';
import { CourseDirection, CourseLanguage, CourseSection, LessonFormat, StudyType } from 'queries/types';
import { useMutation } from 'react-query';
import { Metro, Weekday } from 'types';
import * as Yup from 'yup';

export type CreateCourseInput = {
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

export type CreateCourseResponse = CreateCourseInput;

export type CreateCourseParams = Omit<CreateCourseInput, 'start_date' | 'end_date'> & {
    start_date?: string;
    end_date?: string;
};

export const createCourseFormSchema = [
    Yup.object().shape({
        title: Yup.string().required('Kurs adı daxil olunmalıdır'),
        language: Yup.string()
            .oneOf(Object.values(CourseLanguage), 'Dil seçimi yanlışdır')
            .required('Dil seçilməlidir'),
        study_type: Yup.string()
            .oneOf(Object.values(StudyType), 'Tədris növü seçimi yanlışdır')
            .required('Tədris növü seçilməlidir'),
        lesson_format: Yup.string()
            .oneOf(Object.values(LessonFormat), 'Dərs formatı seçimi yanlışdır')
            .required('Dərs formatı seçilməlidir'),
        address_city: Yup.string().required('Şəhər adı daxil olunmalıdır'),
    }),
    Yup.object().shape({
        description: Yup.string()
            .test('len', 'Ən azı 50 simvol olmalıdır', (val) => !!val && val.length > 50)
            .required('Kurs haqqında məlumat daxil olunmalıdır'),
        sub_category: Yup.string().required('Fənn seçilməlidir'),
        price: Yup.number().moreThan(0, 'Kursun qiyməti 0-dan böyük olmalıdır').required('Qiymət daxil olunmalıdır'),
        direction: Yup.string()
            .oneOf(Object.values(CourseDirection), 'İstiqamət seçimi yanlışdır')
            .required('İstiqamət seçilməlidir'),
        sections: Yup.array()
            .of(
                Yup.object().shape({
                    week_day: Yup.string().oneOf(Object.values(Weekday)).required(),
                    start_time: Yup.string()
                        .notOneOf(['Invalid DateTime'], 'Başlama saatı seçmək məcburidir')
                        .required('Başlama saatı seçmək məcburidir'),
                    end_time: Yup.string()
                        .notOneOf(['Invalid DateTime'], 'Bitmə saatı seçmək məcburidir')
                        .required('Bitmə saatı seçmək məcburidir'),
                }),
            )
            .min(1, 'Ən azı 1 tarix seçilməlidir')
            .required('Ən azı 1 tarix seçilməlidir'),
    }),
];

const createCourse = async (axiosClient: AxiosInstance, props: CreateCourseInput) => {
    const normalizedProps = { ...props, start_date: props.start_date?.toISODate(), end_date: props.end_date?.toISO() };
    const response = await axiosClient.post<
        CreateCourseResponse,
        AxiosResponse<CreateCourseResponse>,
        CreateCourseParams
    >('instructor/courses', normalizedProps);
    return response;
};

export default function useCreateCourse() {
    return useMutation((props: CreateCourseInput) => createCourse(axiosClient, props));
}
