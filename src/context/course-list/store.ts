import { Course, CourseFilters, initialCourseFilters } from 'queries/use-courses';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type CourseListState = {
    courses: Course[];
    isLoading: boolean;
    filters: CourseFilters;
    initialFilters: CourseFilters;
    filtersAck: Date;
    refetchCourses: () => void;
    changeFilters: (filters: CourseFilters) => void;
    changePage: (page: CourseFilters['page']) => void;
    changeInitialFilters: (initialFilters: CourseFilters) => void;
};

export const useCourseListStore = create<CourseListState>()(
    devtools((set) => ({
        courses: [],
        isLoading: true,
        filters: initialCourseFilters,
        initialFilters: initialCourseFilters,
        filtersAck: new Date(),
        refetchCourses: () => set({ filtersAck: new Date() }),
        changeFilters: (filters: CourseFilters) => set({ filters, filtersAck: new Date() }),
        changePage: (page: CourseFilters['page']) =>
            set((prev) => ({ filters: { ...prev.filters, page }, filtersAck: new Date() })),
        changeInitialFilters: (initialFilters: CourseFilters) => set({ initialFilters }),
    })),
);
