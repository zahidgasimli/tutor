import StarIcon from '@mui/icons-material/Star';
import { Avatar, Box, Paper, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { CourseReview } from 'queries/use-course-reviews';

export const CourseReviewItem: React.FC<Pick<
    CourseReview,
    'student_first_name' | 'student_last_name' | 'student_image' | 'rate' | 'feedback' | 'created_at'
>> = ({ student_first_name, student_last_name, student_image, rate, feedback, created_at }) => {
    return (
        <Paper elevation={2} sx={{ px: 2, pt: 3, pb: 6, display: 'flex' }}>
            <Avatar style={{ width: 56, height: 56, pointerEvents: 'none' }} src={student_image || undefined} />
            <Box ml={2} flex={1}>
                <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap">
                    <Box display="flex" alignItems="center" mr={2} flexWrap="wrap">
                        <Typography fontSize={18} fontWeight={600} mr={2}>
                            {student_first_name} {student_last_name}
                        </Typography>
                        <Box display="flex" alignItems="center">
                            <StarIcon fontSize="small" sx={{ color: 'warning.light' }} />
                            <Typography fontWeight={600} variant="body2">
                                {rate}/5
                            </Typography>
                        </Box>
                    </Box>
                    <Typography color="textSecondary" variant="body2">
                        {DateTime.fromISO(created_at).toFormat('MM/dd/yyyy')}
                    </Typography>
                </Box>

                <Typography mt={2} color="textSecondary">
                    {feedback}
                </Typography>
            </Box>
        </Paper>
    );
};
