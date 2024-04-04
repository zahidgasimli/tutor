import { Weekday } from 'types';

export enum StudyType {
    INDIVIDUAL = 'INDIVIDUAL',
    GROUP = 'GROUP',
}

export enum LessonFormat {
    'IN-INSTRUCTOR' = 'IN-INSTRUCTOR',
    'IN-STUDENT' = 'IN-STUDENT',
    ONLINE = 'ONLINE',
}

export enum CourseDirection {
    'PRIMARY-SCHOOL' = 'PRIMARY-SCHOOL',
    'HIGH-SCHOOL' = 'HIGH-SCHOOL',
    UNIVERSITY = 'UNIVERSITY',
    PERSONAL_DEVELOPMENT = 'PERSONAL_DEVELOPMENT',
}

export enum CourseLanguage {
    ENGLISH = 'ENGLISH',
    AZERBAIJANI = 'AZERBAIJANI',
    TURKISH = 'TURKISH',
    RUSSIAN = 'RUSSIAN',
}

export type CourseSectionTimeRange = {
    start_time: string | null;
    end_time: string | null;
};
export type CourseSection = { week_day: Weekday } & CourseSectionTimeRange;
