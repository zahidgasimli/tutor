import { Box, Typography, useTheme } from '@mui/material';
import { CourseItem, CourseItemSkeleton } from 'components';
import { Course } from 'queries/use-courses';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.css';

export type SimilarCoursesListProps = { courses: Course[]; loading: boolean };

export const SimilarCoursesList: React.FC<SimilarCoursesListProps> = ({ courses, loading }) => {
    const { t } = useTranslation('course-detail');
    const theme = useTheme();

    const breakpoints = useMemo(
        () => ({
            [theme.breakpoints.values.xs]: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            [theme.breakpoints.values.sm]: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            [theme.breakpoints.values.md]: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            [theme.breakpoints.values.lg]: {
                slidesPerView: 4,
                spaceBetween: 24,
            },
        }),
        [theme],
    );

    return (
        <Box>
            <Typography fontSize={{ xs: 18, sm: 22 }} fontWeight={600} gutterBottom>
                {t('similarCourses')}
            </Typography>
            <Swiper
                spaceBetween={24}
                slidesPerView={4}
                style={{ padding: '24px 0', overflow: 'visible' }}
                breakpoints={breakpoints}
            >
                {loading &&
                    new Array(5).fill(0).map((_, index) => (
                        <SwiperSlide style={{ height: 'unset' }} key={index}>
                            <CourseItemSkeleton />
                        </SwiperSlide>
                    ))}
                {courses.map((course) => (
                    <SwiperSlide style={{ height: 'unset' }} key={course.id}>
                        <CourseItem course={course} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    );
};
