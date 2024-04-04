// import { Person as PersonIcon } from '@mui/icons-material';
import { Box, Button, Container, Typography } from '@mui/material';
import { CourseList, Link } from 'components';
import useCourses from 'queries/use-courses';
import { useTranslation } from 'react-i18next';
import { createSx } from 'theme';

export const CoursesSection: React.FC = () => {
    const sx = makeSx();

    const { t } = useTranslation('home');
    const { data: coursesData, isLoading } = useCourses();

    const courses = (coursesData?.data || []).slice(0, 6);

    return (
        <Box sx={sx.root}>
            <Container maxWidth="md">
                <Typography variant="h2" sx={sx.title} textAlign="center">
                    {t('lessonsTitle')}
                </Typography>
                <Typography color="textSecondary" sx={sx.description} textAlign="center">
                    {t('lessonsDescription')}
                </Typography>
            </Container>
            <Container sx={sx.courses}>
                <CourseList courses={courses} loading={isLoading} />

                <Box display="flex" justifyContent="center" mt={6}>
                    <Link to="/courses" style={{ width: '100%', maxWidth: 400 }}>
                        <Button variant="contained" fullWidth>
                            {t('all')}
                        </Button>
                    </Link>
                </Box>
            </Container>
            <img
                style={{ position: 'absolute', top: 400, left: 60, zIndex: -1, width: 300, opacity: 0.3 }}
                src={require('assets/images/home/bg-dots-red.svg').default}
                alt=""
            />
            <img
                style={{ position: 'absolute', bottom: 250, right: 60, zIndex: -1, width: 300, opacity: 0.3 }}
                src={require('assets/images/home/bg-dots-red.svg').default}
                alt=""
            />
            <img
                style={{ position: 'absolute', bottom: 50, left: -30, zIndex: -1 }}
                src={require('assets/images/home/ring.svg').default}
                alt=""
            />
        </Box>
    );
};

const makeSx = createSx(() => {
    return {
        root: {
            position: 'relative',
            overflow: 'hidden',
            py: { xs: 6, sm: 12 },
        },
        title: {
            mb: 2,
        },
        description: {
            fontSize: { xs: 16, sm: 20 },
        },
        courses: {
            mt: 6,
        },
    };
});
