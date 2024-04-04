import { LoadingButton } from '@mui/lab';
import { Box, ButtonProps, Paper, SxProps, Theme, Typography } from '@mui/material';
import { isAxiosError } from 'axios';
import { RatioBox } from 'components';
import { bottombarHeight } from 'config';
import { useNotifications } from 'context/NotificationsContext';
import { useAuthStore } from 'context/auth/store';
import { useConfirmStore } from 'context/confirm/store';
import useCourseApply from 'mutations/use-course-apply';
import { Course } from 'queries/use-course';
import { Instructor } from 'queries/use-instructor';
import useStudent from 'queries/use-student';
import { StudentApplicationStatus } from 'queries/use-student-applications';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { createSx } from 'theme';
import { extractErrorMessageFromAxiosError } from 'utils/error-helper';

export type CoursePricingSummaryProps = Pick<
    Course,
    'id' | 'slug' | 'image' | 'title' | 'lesson_format' | 'is_applied' | 'apply_status' | 'monthly_price'
> & {
    variant?: 'desktop' | 'mobile';
    instructor: Pick<Instructor, 'first_name' | 'last_name'>;
};

export const CoursePricingSummary: React.FC<CoursePricingSummaryProps> = ({
    id,
    slug,
    image,
    title,
    lesson_format,
    monthly_price,
    is_applied,
    instructor,
    apply_status,
    variant = 'desktop',
}) => {
    const { t } = useTranslation();
    const { pathname } = useLocation();
    const sx = makeSx();
    const user = useAuthStore((state) => state.user);
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const { notify } = useNotifications();
    const getConfirmation = useConfirmStore((state) => state.open);
    const navigate = useNavigate();

    const { mutateAsync: courseApply, isLoading: applyingToCourse } = useCourseApply(id, slug);
    const { data: studentData } = useStudent({ enabled: isLoggedIn });

    const applyLimit = studentData?.data.limits['course-apply-count'];
    const is_enrolled = apply_status && apply_status === StudentApplicationStatus.ENROLLED;

    const handleApplyButtonClick = async () => {
        if (!isLoggedIn) {
            getConfirmation({
                title: t('confirm-dialog:loginToApplyTitle'),
                description: t('confirm-dialog:loginToApplyDescription'),
                onConfirm: () => navigate('/auth/sign-in', { state: { redirectPath: pathname } }),
            });
        } else {
            try {
                if (applyLimit === 0) {
                    getConfirmation({
                        title: t('confirm-dialog:buyApplyTitle'),
                        description: t('confirm-dialog:buyApplyDescription'),
                        onConfirm: () => navigate('/dashboard/payments?tab=products'),
                    });
                } else {
                    getConfirmation({
                        title: t('confirm-dialog:areYouSure'),
                        description: t('confirm-dialog:applyToCourseDescription', { applyLimit }),
                        onConfirm: applyToCourse,
                    });
                }
            } catch (error) {
                if (isAxiosError(error)) {
                    notify({ type: 'error', message: extractErrorMessageFromAxiosError(error) });
                }
            }
        }
    };

    const applyToCourse = async () => {
        try {
            const response = await courseApply();
            notify({ type: 'success', message: response.data.message });
        } catch (error) {
            if (isAxiosError(error)) {
                notify({ type: 'error', message: extractErrorMessageFromAxiosError(error) });
            }
        }
    };

    const getApplyButtonColor = (): ButtonProps['color'] => {
        if (applyLimit === 0) return 'success';
        return 'info';
    };

    const getApplyButtonText = () => {
        if (is_enrolled) return t('course-detail:accepted');
        if (is_applied) return t('course-detail:applied');
        if (applyLimit === 0) return t('course-detail:buyApply');
        return t('course-detail:apply');
    };

    return (
        <Paper sx={sx.root}>
            {variant === 'desktop' && (
                <Box sx={{ bgcolor: (theme) => (theme.dark ? '#222' : '#f1f1f1') }}>
                    <RatioBox>
                        <img
                            src={image || require('assets/images/course-placeholder.png').default}
                            style={{ pointerEvents: 'none' }}
                        />
                    </RatioBox>
                </Box>
            )}
            <Box p={2}>
                <Typography fontSize={{ xs: 18, sm: 17 }} fontWeight={600}>
                    {instructor.first_name} {instructor.last_name}
                </Typography>
                {variant === 'desktop' && (
                    <Typography fontSize={15} fontWeight={400} color="primary">
                        {title}
                    </Typography>
                )}

                <Box sx={sx.priceContainer}>
                    <Typography color="textSecondary">{t(`enum:LessonFormat_${lesson_format}`)}</Typography>
                    <Typography fontWeight={500}>{monthly_price} AZN</Typography>
                </Box>

                {(!isLoggedIn || (isLoggedIn && user && user.isStudent)) && (
                    <LoadingButton
                        variant="contained"
                        color={getApplyButtonColor()}
                        sx={
                            [
                                sx.applyButton,
                                variant === 'desktop' && { width: '100%' },
                                variant === 'mobile' && sx.applyButtonFixed,
                                is_applied && { '&.Mui-disabled': { bgcolor: 'background.default' } },
                            ] as SxProps<Theme>
                        }
                        onClick={handleApplyButtonClick}
                        disabled={applyingToCourse || is_enrolled || is_applied}
                        loading={applyingToCourse}
                    >
                        {getApplyButtonText()}
                    </LoadingButton>
                )}
            </Box>
        </Paper>
    );
};

const makeSx = createSx(() => {
    return {
        root: { overflow: 'hidden', '& img': { width: '100%', height: '100%', objectFit: 'contain' } },
        priceContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            mt: 2,
        },
        applyButton: {
            mt: 5,
        },
        applyButtonFixed: (theme) => ({
            position: 'fixed',
            bottom: 16,
            left: 16,
            right: 16,
            zIndex: 1001,
            transition: '.3s',
            [theme.breakpoints.down('sm')]: {
                bottom: bottombarHeight + 16,
            },
        }),
    };
});
