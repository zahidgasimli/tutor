import { AxiosInstance } from 'axios';
import { stringify, parse } from 'query-string';
import { useQuery, UseQueryOptions } from 'react-query';
import { InstructorGender, Metro } from 'types';
import { CourseLanguage, LessonFormat, StudyType } from './types';
import { axiosClient } from 'api';
import { isArray } from 'lodash';

export const QUERY_KEY_COURSES = 'courses';

export type Course = {
    id: number;
    slug: string;
    instructor_first_name: string;
    instructor_last_name: string;
    instructor_image: string | null;
    price: number;
    monthly_price: number;
    description: string;
    sub_category: string;
    is_applied?: boolean;
    is_in_wishlist?: boolean;
};

export type CoursesMeta = {
    count: number;
    next: string | null;
    previous: string | null;
};

export type GetCoursesResponse = {
    data: Course[];
    message: string;
    meta: CoursesMeta;
};

export type CourseFilters = {
    page?: number;
    pageSize?: number;
    query?: string;
    study_types?: StudyType[];
    lesson_formats?: LessonFormat[];
    languages?: CourseLanguage[];
    subjects?: string[];
    metros?: string[];
    price_min?: number;
    price_max?: number;
    instructor_genders?: InstructorGender[];
};

export const initialCourseFilters: Required<CourseFilters> = {
    page: 1,
    pageSize: 12,
    query: '',
    study_types: [],
    lesson_formats: [],
    languages: [],
    subjects: [],
    metros: [],
    price_min: 0,
    price_max: 100,
    instructor_genders: [],
};

export const generateCourseSearchParams = (params: CourseFilters) => {
    return stringify(params, { arrayFormat: 'comma', skipNull: true, skipEmptyString: true });
};

export const getArrayOrUndefined = <T>(prop: T | T[]): T[] => {
    return prop ? (isArray(prop) ? prop : [prop]) : [];
};

export const getCourseFiltersFromSearchParams = (searchParams: URLSearchParams): CourseFilters => {
    const filters = parse(decodeURIComponent(generateCourseSearchParams(Object.fromEntries([...searchParams]))), {
        arrayFormat: 'comma',
        parseBooleans: true,
        parseNumbers: true,
    });
    const instructor_genders = filters.instructor_genders as InstructorGender | InstructorGender[];
    const languages = filters.languages as CourseLanguage | CourseLanguage[];
    const lesson_formats = filters.lesson_formats as LessonFormat | LessonFormat[];
    const metros = filters.metros as Metro | Metro[];
    const study_types = filters.study_types as StudyType | StudyType[];
    const subjects = (filters.subjects as unknown) as number | number[];
    return {
        ...filters,
        instructor_genders: getArrayOrUndefined(instructor_genders),
        languages: getArrayOrUndefined(languages),
        lesson_formats: getArrayOrUndefined(lesson_formats),
        metros: getArrayOrUndefined(metros),
        study_types: getArrayOrUndefined(study_types),
        subjects: getArrayOrUndefined(subjects).map((subject) => subject.toString()),
    };
};

const getCourses = async (axiosClient: AxiosInstance, params: CourseFilters) => {
    const searchParams = generateCourseSearchParams(params);
    const response = await axiosClient.get<GetCoursesResponse>(`courses?${searchParams}`);
    return response.data;
};

export default function useCourses(
    key?: string,
    params?: CourseFilters,
    options?: UseQueryOptions<GetCoursesResponse, unknown, GetCoursesResponse, string[]>,
) {
    return useQuery(
        key ? [QUERY_KEY_COURSES, key] : [QUERY_KEY_COURSES],
        () => getCourses(axiosClient, params || initialCourseFilters),
        options,
    );
}
