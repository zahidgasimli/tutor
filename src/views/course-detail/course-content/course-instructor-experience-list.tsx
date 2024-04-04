import BusinessIcon from '@mui/icons-material/Business';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { Avatar, Box, Divider, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { useTranslation } from 'react-i18next';
import { createSx } from 'theme';
import { InstructorJob } from 'types';

export type CourseInstructorJobListProps = { jobs: InstructorJob[] };

export const CourseInstructorJobList: React.FC<CourseInstructorJobListProps> = ({ jobs }) => {
    const { t } = useTranslation('course-detail');
    const sx = makeSx();
    return (
        <Box sx={sx.root}>
            {jobs.map((job, index) => {
                return (
                    <Box key={job.id}>
                        <ListItem alignItems="flex-start" sx={{ px: 0, py: 2 }}>
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: 'primary.main' }}>
                                    <BusinessIcon sx={{ color: '#fff' }} />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={<Typography fontWeight={700}>{job.position}</Typography>}
                                secondary={
                                    <>
                                        <Typography variant="body2" color="primary" fontWeight={600}>
                                            {job.company}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            display="flex"
                                            alignItems="center"
                                            fontWeight={600}
                                            mt={0.5}
                                        >
                                            <CalendarTodayOutlinedIcon fontSize="inherit" sx={{ mr: 1 }} />
                                            <span>
                                                {DateTime.fromISO(job.start_date).toFormat('MM.yyyy')} -{' '}
                                                {job.end_date && !job.is_ongoing
                                                    ? DateTime.fromISO(job.end_date).toFormat('MM.yyyy')
                                                    : t('ongoing')}
                                            </span>
                                        </Typography>
                                    </>
                                }
                            />
                        </ListItem>
                        {index !== jobs.length - 1 && <Divider light />}
                    </Box>
                );
            })}
        </Box>
    );
};

const makeSx = createSx(() => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
}));
