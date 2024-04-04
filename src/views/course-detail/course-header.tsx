import { Box, Divider, Paper, Typography, styled } from '@mui/material';
import { CourseWishlistButton, SocialShareButtons } from 'components';
import { CourseRating } from 'components/course/course-rating';
import { useAuthStore } from 'context/auth/store';
import { Course } from 'queries/use-course';
import { Instructor } from 'queries/use-instructor';
import { useTranslation } from 'react-i18next';

export type CourseHeaderProps = Pick<
    Course,
    'id' | 'title' | 'image' | 'average_rating' | 'language' | 'lesson_format' | 'study_type' | 'is_in_wishlist'
> & { instructor: Pick<Instructor, 'first_name' | 'last_name' | 'experience_year' | 'experience_month'> };

export const CourseHeader: React.FC<CourseHeaderProps> = ({
    id,
    title,
    image,
    average_rating,
    language,
    lesson_format,
    study_type,
    instructor,
    is_in_wishlist,
}) => {
    const { t } = useTranslation();

    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const user = useAuthStore((state) => state.user);

    return (
        <StyledPaper>
            <CourseImageContainer>
                <img
                    src={image || require('assets/images/course-placeholder.png').default}
                    style={{ pointerEvents: 'none' }}
                />
            </CourseImageContainer>
            <CourseHeading>
                <Box mr={2}>
                    {title && <Typography variant="h6">{title}</Typography>}
                    <Typography color="textSecondary">
                        {instructor.first_name} {instructor.last_name}
                    </Typography>
                </Box>
                {average_rating && <CourseRating course_id={id} rating={average_rating} className="course-rating" />}
            </CourseHeading>
            <CourseDetails>
                <Divider light sx={{ mt: 2 }} />
                <div>
                    <Typography fontSize={13} color="textSecondary">
                        {t('course-detail:studyLanguage')}
                    </Typography>
                    <Typography color="primary" fontWeight={500}>
                        {t(`enum:CourseLanguage_${language}`)}
                    </Typography>
                </div>
                <div>
                    <Typography fontSize={13} color="textSecondary">
                        {t('course-detail:studyFormat')}
                    </Typography>
                    <Typography color="primary" fontWeight={500}>
                        {t(`enum:LessonFormat_${lesson_format}`)}
                    </Typography>
                </div>
                <div>
                    <Typography fontSize={13} color="textSecondary">
                        {t('course-detail:studyType')}
                    </Typography>
                    <Typography color="primary" fontWeight={500}>
                        {t(`enum:StudyType_${study_type}`)}
                    </Typography>
                </div>
                <div>
                    <Typography fontSize={13} color="textSecondary">
                        {t('course-detail:instructorExperience')}
                    </Typography>
                    <Typography color="primary" fontWeight={500}>
                        {instructor.experience_year > 0 &&
                            t('course-detail:year', { count: instructor.experience_year })}
                        {instructor.experience_year > 0 && instructor.experience_month > 0 && ', '}
                        {instructor.experience_month > 0 &&
                            t('course-detail:month', { count: instructor.experience_month })}
                    </Typography>
                </div>
                <Divider light sx={{ mt: 2 }} />
                <Box display="flex" justifyContent="space-between" flexWrap="wrap" alignItems="center" mb={-2}>
                    <Typography fontSize={17} fontWeight={600} mr={3} mb={2}>
                        {t('course-detail:shareCourse')}
                    </Typography>
                    <SocialShareButtons mb={2} justifyContent="flex-end" url={window.location.href} />
                </Box>
                {(!isLoggedIn || (isLoggedIn && user && user.isStudent)) && (
                    <CourseWishlistButton
                        sx={{ position: 'absolute', top: { xs: 32, sm: 24 + 16 }, right: 16 }}
                        course_id={id}
                        is_in_wishlist={is_in_wishlist}
                    />
                )}
            </CourseDetails>
        </StyledPaper>
    );
};

const StyledPaper = styled(Paper)(() => {
    return {
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
    };
});

const CourseImageContainer = styled(Box)(({ theme }) => {
    return {
        gridColumn: 'span 4',
        gridRow: 'span 2',
        transition: '.3s',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: theme.dark ? '#222' : '#f1f1f1',
        '& img': {
            width: '100%',
            height: '100%',
            aspectRatio: '1',
            objectFit: 'contain',
        },
        [theme.breakpoints.down(700)]: {
            height: 'unset',
            gridColumn: 'span 3',
            marginTop: theme.spacing(3),
            marginLeft: theme.spacing(2.5),
            borderRadius: 20,
            overflow: 'hidden',
        },
        [theme.breakpoints.down(450)]: {
            gridColumn: 'span 4',
        },
        [theme.breakpoints.down(375)]: {
            gridColumn: 'span 12',
            marginRight: theme.spacing(3),
        },
    };
});

const CourseHeading = styled(Box)(({ theme }) => {
    return {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        padding: theme.spacing(3, 2.5),
        paddingBottom: 0,
        gridColumn: 'span 8',
        transition: '.3s',
        '& .course-rating': {
            height: 'fit-content',
            transition: '.3s',
        },
        [theme.breakpoints.down(700)]: {
            flexDirection: 'column',
            gridColumn: 'span 9',
            '& .course-rating': {
                marginTop: theme.spacing(3),
            },
        },
        [theme.breakpoints.down(450)]: {
            gridColumn: 'span 8',
        },
        [theme.breakpoints.down(375)]: {
            gridColumn: 'span 12',
            '& .course-rating': {
                marginTop: theme.spacing(1),
            },
        },
    };
});

const CourseDetails = styled(Box)(({ theme }) => {
    return {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1,
        padding: theme.spacing(3, 2.5),
        paddingBottom: theme.spacing(2.5),
        paddingTop: 0,
        gridColumn: 'span 8',
        transition: '.3s',
        position: 'relative',
        '& > *': {
            marginTop: theme.spacing(2),
        },
        [theme.breakpoints.down(700)]: {
            gridColumn: 'span 12',
        },
        [theme.breakpoints.down(375)]: {
            marginTop: theme.spacing(3),
        },
    };
});
