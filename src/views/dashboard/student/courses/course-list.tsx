import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { Avatar, Box, Button, Grid, Paper, Typography } from '@mui/material';
import { Link, Spinner } from 'components';
import { StudentCourse } from 'queries/use-student-courses';
import { useTranslation } from 'react-i18next';

type StudentCourseListProps = {
    courses: StudentCourse[];
    loading: boolean;
};

export const StudentCourseList: React.FC<StudentCourseListProps> = ({ courses, loading }) => {
    if (loading) {
        return (
            <Box height={400}>
                <Spinner />
            </Box>
        );
    }

    if (courses.length === 0) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                textAlign="center"
                height={400}
            >
                <Typography variant="h6" mb={2}>
                    Aktiv kursunuz yoxdur.
                </Typography>

                <Link to="/courses">
                    <Button variant="outlined" size="small">
                        Kurslara bax
                    </Button>
                </Link>
            </Box>
        );
    }

    return (
        <Box display="flex" flexDirection="column" minHeight={400}>
            <Grid container spacing={2}>
                {courses.map((course, index) => (
                    <Grid item xs={12} lg={6} key={index}>
                        <StudentCourseListItem {...course} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

type StudentCourseListItemProps = StudentCourse;

export const StudentCourseListItem: React.FC<StudentCourseListItemProps> = ({
    slug,
    title,
    instructor_first_name,
    instructor_last_name,
    instructor_image,
    sections,
}) => {
    const { t } = useTranslation();

    return (
        <Link to={`/courses/${slug}`}>
            <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    transition: '.3s transform',
                    '&:hover': { transform: 'scale(1.02)' },
                }}
                elevation={2}
            >
                <Box>
                    <Avatar variant="rounded" src={instructor_image} sx={{ width: 48, height: 48 }} />
                </Box>
                <Box ml={2} flex={1}>
                    <Typography gutterBottom fontWeight={600}>
                        {title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" fontWeight={500}>
                        {instructor_first_name} {instructor_last_name}
                    </Typography>

                    <Box mt={1}>
                        {sections.map((section, index) => (
                            <Box key={index} display="flex" alignItems="center" mb={0.75}>
                                <Box display="flex" alignItems="center" flex={1}>
                                    <CalendarTodayOutlinedIcon sx={{ color: 'text.secondary', fontSize: 16 }} />
                                    <Typography sx={{ mx: 1 }} variant="body2" color="textSecondary">
                                        {t(`enum:WEEKDAY_${section.week_day}`)}
                                    </Typography>
                                </Box>
                                <Paper
                                    sx={{ borderRadius: 50, px: 1, py: 0.5, bgcolor: 'transparent' }}
                                    variant="outlined"
                                >
                                    <Typography color="textSecondary" sx={{ fontSize: 12 }}>
                                        {section.start_time} - {section.end_time}
                                    </Typography>
                                </Paper>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Paper>
        </Link>
    );
};
