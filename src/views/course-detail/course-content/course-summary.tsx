import { Grid, Typography } from '@mui/material';
import { Course } from 'queries/use-course';
import { useTranslation } from 'react-i18next';

export type CourseSummaryProps = Pick<
    Course,
    'address_city' | 'address_state' | 'lesson_format' | 'study_type' | 'direction'
>;

export const CourseSummary: React.FC<CourseSummaryProps> = ({
    address_city,
    address_state,
    direction,
    lesson_format,
    study_type,
}) => {
    const { t } = useTranslation();
    return (
        <Grid container spacing={{ xs: 1.5, sm: 3 }}>
            <Grid item xs={12} sm={5}>
                <Typography fontSize={13} color="textSecondary">
                    {t('course-detail:address')}
                </Typography>
                <Typography color="primary" fontWeight={500}>
                    {address_city}, {address_state}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={5}>
                <Typography fontSize={13} color="textSecondary">
                    {t('course-detail:direction')}
                </Typography>
                <Typography color="primary" fontWeight={500}>
                    {t(`enum:CourseDirection_${direction}`)}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={5}>
                <Typography fontSize={13} color="textSecondary">
                    {t('course-detail:studyFormat')}
                </Typography>
                <Typography color="primary" fontWeight={500}>
                    {t(`enum:LessonFormat_${lesson_format}`)}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={5}>
                <Typography fontSize={13} color="textSecondary">
                    {t('course-detail:studyType')}
                </Typography>
                <Typography color="primary" fontWeight={500}>
                    {t(`enum:StudyType_${study_type}`)}
                </Typography>
            </Grid>
        </Grid>
    );
};
