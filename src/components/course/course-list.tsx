import { Box, Button, Grid, GridProps, Typography } from '@mui/material';
import { Course } from 'queries/use-courses';
import { CourseItem } from './course-item';
import { CourseItemSkeleton } from './course-item-skeleton';

type CourseListProps = {
    courses: Course[];
    loading?: boolean;
    type?: 1 | 2;
    GridItemProps?: GridProps;
    emptyStateText?: string;
    emptyStateQueryText?: string;
    onRefetch?: () => void;
};

export const CourseList: React.FC<CourseListProps> = ({
    courses,
    loading,
    type,
    emptyStateText = 'Kurs tapılmadı',
    emptyStateQueryText,
    GridItemProps,
    onRefetch,
}) => {
    const isEmpty = courses.length === 0;

    if (!loading && isEmpty) {
        return (
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" py={15}>
                <Box position="relative">
                    <img style={{ width: 300 }} src={require('assets/images/search-not-found.png').default} />
                    {emptyStateQueryText && (
                        <Typography sx={{ position: 'absolute', top: 27, left: 82, fontSize: 11 }}>
                            {emptyStateQueryText.length > 8
                                ? `${emptyStateQueryText.slice(0, 8)}...`
                                : emptyStateQueryText}
                        </Typography>
                    )}
                </Box>
                <Typography variant="h5" fontWeight="600" textAlign="center" mt={7}>
                    {emptyStateText}
                </Typography>

                {!!onRefetch && (
                    <Button variant="contained" sx={{ mt: 5, maxWidth: 200 }} fullWidth onClick={onRefetch}>
                        Təkrar axtar
                    </Button>
                )}
            </Box>
        );
    }

    return (
        <Grid container spacing={{ xs: 2, md: 3 }}>
            {courses.map((course) => (
                <Grid key={course.id} item xs={12} sm={6} md={4} {...GridItemProps}>
                    <CourseItem course={course} type={type} />
                </Grid>
            ))}
            {loading &&
                Array(12)
                    .fill(0)
                    .map((_, index) => (
                        <Grid key={index} item xs={12} sm={6} md={4} {...GridItemProps}>
                            <CourseItemSkeleton type={type} />
                        </Grid>
                    ))}
        </Grid>
    );
};
