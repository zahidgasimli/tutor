import { Box, Container, Grid, Hidden, Typography } from '@mui/material';
import { Spinner } from 'components';
import { CourseSectionField } from 'components/form';
import { headerHeight } from 'config';
import { useLayoutStore } from 'context/layout/store';
import useCourse from 'queries/use-course';
import useCourses from 'queries/use-courses';
import useInstructor from 'queries/use-instructor';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CourseContent } from './course-content';
import { CourseHeader } from './course-header';
import { CoursePricingSummary } from './course-pricing-summary';
import { CourseReviews } from './course-reviews';
import { SimilarCoursesList } from './similar-courses-list';
import { ReactComponent as NotFoundIcon } from 'assets/icons/not-found.svg';
import { useTranslation } from 'react-i18next';

export const CourseDetail = () => {
    const { t } = useTranslation('course-detail');
    const { slug } = useParams<{ slug: string }>();
    const changeHeaderWidth = useLayoutStore((state) => state.changeHeaderWidth);
    const resetHeaderWidth = useLayoutStore((state) => state.resetHeaderWidth);

    const { data: courseData, isLoading: courseLoading, isError, error } = useCourse(slug, {
        enabled: !!slug,
        retry: false,
    });
    const course = courseData?.data;

    const { data: instructorData, isLoading: instructorLoading } = useInstructor(course?.instructor_id, {
        enabled: !!course?.instructor_id,
    });
    const instructor = instructorData?.data;

    const { data: similarCoursesData, isLoading: similarCoursesLoading } = useCourses(
        undefined,
        course
            ? {
                  subjects: [course.sub_category],
                  lesson_formats: [course.lesson_format],
                  study_types: [course.study_type],
                  metros: course.address_metros,
                  languages: [course.language],
              }
            : {},
        { enabled: !!course },
    );

    const similarCourses = (similarCoursesData?.data || []).filter((c) => c.id !== course?.id);

    useEffect(() => {
        changeHeaderWidth('xl');
        return resetHeaderWidth;
    }, []);

    if (courseLoading || instructorLoading) {
        return <Spinner />;
    }

    if (isError) {
        return (
            <Box flex={1} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <NotFoundIcon style={{ maxWidth: 400, width: '100%', height: 'auto' }} />
                <Typography fontSize={{ xs: 20, sm: 28 }} fontWeight={600} mt={{ xs: 4, sm: 8 }}>
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(error as any).response.data.message}
                </Typography>
            </Box>
        );
    }

    if (!course || !instructor) {
        return null;
    }

    return (
        <Box sx={{ py: 3 }}>
            <Container maxWidth="xl">
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8.5} lg={9}>
                        <Grid container spacing={{ xs: 3, sm: 5 }}>
                            <Grid item xs={12}>
                                <CourseHeader
                                    id={course.id}
                                    title={course.title}
                                    image={instructor.image}
                                    average_rating={course.average_rating}
                                    language={course.language}
                                    lesson_format={course.lesson_format}
                                    study_type={course.study_type}
                                    instructor={{
                                        first_name: instructor.first_name,
                                        last_name: instructor.last_name,
                                        experience_year: instructor.experience_year,
                                        experience_month: instructor.experience_month,
                                    }}
                                    is_in_wishlist={course.is_in_wishlist}
                                />
                            </Grid>
                            <Hidden mdUp>
                                <Grid item xs={12}>
                                    <CoursePricingSummary
                                        id={course.id}
                                        slug={course.slug}
                                        title={course.title}
                                        image={instructor.image}
                                        monthly_price={course.monthly_price}
                                        lesson_format={course.lesson_format}
                                        is_applied={course.is_applied}
                                        apply_status={course.apply_status}
                                        instructor={{
                                            first_name: instructor.first_name,
                                            last_name: instructor.last_name,
                                        }}
                                        variant="mobile"
                                    />
                                </Grid>
                            </Hidden>
                            <Grid item xs={12}>
                                <CourseContent
                                    description={course.description}
                                    address_metros={course.address_metros}
                                    address_city={course.address_city}
                                    address_state={course.address_state}
                                    direction={course.direction}
                                    lesson_format={course.lesson_format}
                                    study_type={course.study_type}
                                    educations={instructor.educations}
                                    jobs={instructor.jobs}
                                    certificates={instructor.certificates}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <CourseSectionField
                                    title={t('schedule')}
                                    value={course.sections}
                                    readonly
                                    sx={{ p: { xs: 2.5, sm: 4 } }}
                                    TitleProps={{ sx: { fontSize: { xs: 18, sm: 22 }, fontWeight: 600 } }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <CourseReviews
                                    course_id={course.id}
                                    average_rating={course.average_rating}
                                    rating_count={course.rating_count}
                                    is_rated={course.is_rated}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Hidden mdDown>
                        <Grid item md={3.5} lg={3}>
                            <Box style={{ position: 'relative', height: '100%' }}>
                                <Box style={{ position: 'sticky', top: headerHeight + 24 }}>
                                    <CoursePricingSummary
                                        id={course.id}
                                        slug={course.slug}
                                        title={course.title}
                                        image={instructor.image}
                                        monthly_price={course.monthly_price}
                                        lesson_format={course.lesson_format}
                                        is_applied={course.is_applied}
                                        apply_status={course.apply_status}
                                        instructor={{
                                            first_name: instructor.first_name,
                                            last_name: instructor.last_name,
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Grid>
                    </Hidden>
                </Grid>
            </Container>
            {similarCourses.length > 0 && !similarCoursesLoading && (
                <Box overflow="hidden" mt={{ xs: 2.5, sm: 4 }}>
                    <Container maxWidth="xl">
                        <SimilarCoursesList courses={similarCourses} loading={similarCoursesLoading} />
                    </Container>
                </Box>
            )}
        </Box>
    );
};
