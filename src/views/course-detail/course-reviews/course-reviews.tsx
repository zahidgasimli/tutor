import StarIcon from '@mui/icons-material/Star';
import { Box, Button, Divider, Grid, Hidden, LinearProgress, Paper, Rating, Typography } from '@mui/material';
import { createSx } from 'theme';
import { CourseReviewItem } from './course-review-item';
import { Course } from 'queries/use-course';
import useCourseReviews from 'queries/use-course-reviews';
import { Spinner } from 'components';
import { useState } from 'react';
import { CourseRatingFeedbackDialog } from 'components/course/course-rating-feedback-dialog';
import { isInteger } from 'lodash';
import { useAuthStore } from 'context/auth/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { useConfirmStore } from 'context/confirm/store';
import { useTranslation } from 'react-i18next';

type CourseReviewsProps = {
    course_id: Course['id'];
    average_rating: Course['average_rating'];
    rating_count: Course['rating_count'];
    is_rated: Course['is_rated'];
};

export const CourseReviews: React.FC<CourseReviewsProps> = ({ course_id, is_rated, average_rating, rating_count }) => {
    const { t } = useTranslation();
    const sx = makeSx();
    const getConfirmation = useConfirmStore((state) => state.open);
    const isInstructor = useAuthStore((state) => state.user?.isInstructor);
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const { data: courseReviewsData, isLoading: courseReviewsLoading } = useCourseReviews(course_id);
    const courseReviews = courseReviewsData?.data || [];

    const [showAll, setShowAll] = useState(false);
    const [ratingDialogOpen, setRatingDialogOpen] = useState(false);

    const openRatingDialog = () => setRatingDialogOpen(true);
    const closeRatingDialog = () => setRatingDialogOpen(false);

    const toggleShowAll = () => setShowAll((p) => !p);

    const onRateClick = () => {
        if (!isLoggedIn) {
            getConfirmation({
                title: t('confirm-dialog:courseRateTitle'),
                description: t('confirm-dialog:courseRateDescription'),
                onConfirm: () => navigate('/auth/sign-in', { state: { redirectPath: pathname } }),
            });
        } else {
            openRatingDialog();
        }
    };

    const ratingPercentages = courseReviews
        .map((review) => review.rate)
        .reduce(
            (accumulator, value) => {
                return { ...accumulator, [value]: (accumulator[value] || 0) + 1 };
            },
            { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
        );

    return (
        <Paper sx={sx.root}>
            <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
                <Typography sx={sx.title}>{t('course-detail:rating')}</Typography>

                {!isInstructor && (
                    <Button onClick={onRateClick} variant="outlined" size="small" disabled={is_rated}>
                        {is_rated ? t('course-detail:rated') : t('course-detail:rate')}
                    </Button>
                )}
                {!is_rated && (
                    <CourseRatingFeedbackDialog
                        open={ratingDialogOpen}
                        course_id={course_id}
                        onClose={closeRatingDialog}
                    />
                )}
            </Box>
            <Divider light sx={sx.titleDivider} />
            {rating_count && rating_count > 0 ? (
                <Box display="flex">
                    <Hidden smDown>
                        <Box sx={sx.averageRatingContainer}>
                            <Typography fontSize={56} fontWeight={500} lineHeight={1}>
                                {average_rating}
                            </Typography>
                            <Rating
                                sx={sx.averageRating}
                                value={average_rating}
                                readOnly
                                precision={0.1}
                                size="large"
                            />
                            <Typography>{t('course-detail:review', { count: rating_count })}</Typography>
                        </Box>
                        <Divider light orientation="vertical" sx={sx.verticalDivider} />
                    </Hidden>
                    <Box sx={sx.ratingList}>
                        {Object.keys(ratingPercentages)
                            .sort((a, b) => (a > b ? -1 : 1))
                            .map((key) => {
                                const percentage = (ratingPercentages[key] * 100) / courseReviews.length;
                                return (
                                    <Box key={key} sx={sx.ratingItemContainer}>
                                        <Box
                                            width={32}
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="space-between"
                                        >
                                            <Typography fontWeight={700}>{key}</Typography>
                                            <StarIcon sx={sx.starIcon} />
                                        </Box>
                                        <LinearProgress value={percentage} variant="determinate" sx={sx.ratingBar} />
                                        <Box width={42}>
                                            <Typography fontWeight={500}>
                                                {isInteger(percentage) ? percentage : percentage.toFixed(1)}%
                                            </Typography>
                                        </Box>
                                    </Box>
                                );
                            })}
                    </Box>
                </Box>
            ) : (
                <Box height={200} display="flex" justifyContent="center" alignItems="center">
                    <Typography>{t('course-detail:ratingEmpty')}</Typography>
                </Box>
            )}
            {courseReviewsLoading ? (
                <Box height={200}>
                    <Spinner />
                </Box>
            ) : (
                courseReviews.length > 0 && (
                    <>
                        <Divider light sx={sx.reviewDivider} />

                        <Grid container spacing={2}>
                            {courseReviews.slice(0, showAll ? courseReviews.length : 2).map((review) => (
                                <Grid item xs={12} lg={6} key={review.id}>
                                    <CourseReviewItem
                                        student_image={review.student_image}
                                        student_first_name={review.student_first_name}
                                        student_last_name={review.student_last_name}
                                        rate={review.rate}
                                        feedback={review.feedback}
                                        created_at={review.created_at}
                                    />
                                </Grid>
                            ))}
                        </Grid>

                        {courseReviews.length > 2 && (
                            <Box sx={sx.moreButtonContainer}>
                                <Button variant="contained" fullWidth sx={sx.moreButton} onClick={toggleShowAll}>
                                    {showAll ? t('course-detail:less') : t('course-detail:more')}
                                </Button>
                            </Box>
                        )}
                    </>
                )
            )}
        </Paper>
    );
};

const makeSx = createSx(() => {
    return {
        root: { p: { xs: 2.5, sm: 4 } },
        title: { fontSize: { xs: 18, sm: 22 }, fontWeight: 600, flex: 1 },
        titleDivider: { my: { xs: 2.5, sm: 4 } },
        averageRatingContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            py: 2,
            pl: 2,
            pr: 5,
        },
        averageRating: { my: 2, color: 'warning.light' },
        verticalDivider: { height: 'unset', minHeight: '100%' },
        ratingList: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            pl: { xs: 1, sm: 5 },
            pr: { xs: 0, sm: 1, lg: 5 },
        },
        ratingItemContainer: { my: 1, display: 'flex', alignItems: 'center' },
        starIcon: { fontSize: 16, color: 'warning.light' },
        ratingBar: {
            flex: 1,
            mx: 3,
            height: 8,
            borderRadius: 20,
            bgcolor: (theme) => theme.palette.grey[300],
            '& .MuiLinearProgress-bar': {
                bgcolor: 'warning.light',
            },
        },
        reviewDivider: { my: { xs: 2.5, sm: 4 } },
        moreButtonContainer: { display: 'flex', justifyContent: 'center', mt: { xs: 4, sm: 6 } },
        moreButton: { maxWidth: 500 },
    };
});
