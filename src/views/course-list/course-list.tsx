import { Box, Container, Pagination, Paper, Typography } from '@mui/material';
import { isAxiosError } from 'axios';
import { CourseList } from 'components';
import { mobileSize } from 'config';
import { useNotifications } from 'context/NotificationsContext';
import { useCourseListStore } from 'context/course-list/store';
import { useLayoutStore } from 'context/layout/store';
import useCourses, { generateCourseSearchParams, initialCourseFilters } from 'queries/use-courses';
import { useEffect } from 'react';
import { createSx } from 'theme';
import { extractErrorMessageFromAxiosError } from 'utils/error-helper';
import { CourseFilterForm } from './course-filter-form';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { isEqual } from 'lodash';

export const CourseListPage = () => {
    const { t } = useTranslation('course-list');
    const sx = makeSx();
    const filters = useCourseListStore((state) => state.filters);
    const filtersAck = useCourseListStore((state) => state.filtersAck);
    const refetchCourses = useCourseListStore((state) => state.refetchCourses);
    const changePage = useCourseListStore((state) => state.changePage);
    const [, setSearchParams] = useSearchParams();
    const { notify } = useNotifications();

    const { data: coursesData, isLoading, error } = useCourses(filtersAck.getTime().toString(), filters, {
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    });

    const courses = coursesData?.data || [];
    const courseListMeta = coursesData?.meta || { count: 0 };
    const pageCount = Math.ceil(courseListMeta.count / (filters.pageSize || initialCourseFilters.pageSize));

    const changeHeaderWidth = useLayoutStore((state) => state.changeHeaderWidth);
    const resetHeaderWidth = useLayoutStore((state) => state.resetHeaderWidth);

    useEffect(() => {
        changeHeaderWidth('xl');
        return resetHeaderWidth;
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [filters.page]);

    useEffect(() => {
        if (isAxiosError(error)) {
            notify({ type: 'error', message: extractErrorMessageFromAxiosError(error) });
        }
    }, [error]);

    return (
        <Container maxWidth="xl" sx={sx.root}>
            <Typography variant="h2" mb={5} whiteSpace="pre-wrap">
                {t('title')}
            </Typography>
            <Box sx={sx.content}>
                <Box width={{ xs: '100%', [mobileSize]: 290 }} mr={{ xs: 0, [mobileSize]: 3 }}>
                    <Paper sx={{ px: 2, py: { xs: 2, [mobileSize]: 3 } }}>
                        <CourseFilterForm />
                    </Paper>
                </Box>
                <Box sx={sx.list}>
                    <CourseList
                        loading={isLoading}
                        courses={courses}
                        type={2}
                        GridItemProps={{ xs: 12, md: 6, lg: 4 }}
                        emptyStateText={
                            !isEqual(filters, initialCourseFilters) ? 'Axtarışınıza uyğun kurs tapılmadı' : undefined
                        }
                        emptyStateQueryText={filters.query}
                        onRefetch={refetchCourses}
                    />
                    {pageCount > 1 && (
                        <Box mt={3} display="flex" justifyContent="center">
                            <Pagination
                                color="primary"
                                count={pageCount}
                                page={Number(filters.page)}
                                onChange={(_e, newPage) => {
                                    if (Number(filters.page) !== newPage) {
                                        changePage(newPage);
                                        setSearchParams(generateCourseSearchParams({ ...filters, page: newPage }), {
                                            replace: true,
                                            preventScrollReset: true,
                                        });
                                    }
                                }}
                            />
                        </Box>
                    )}
                </Box>
            </Box>
        </Container>
    );
};

const makeSx = createSx(() => {
    return {
        root: {
            py: 4,
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
        },
        content: {
            display: 'flex',
            flexDirection: { xs: 'column', [mobileSize]: 'row' },
            flex: 1,
        },
        list: {
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            mt: { xs: 2, md: 0 },
        },
    };
});
