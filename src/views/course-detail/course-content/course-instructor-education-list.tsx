import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import SchoolIcon from '@mui/icons-material/School';
import { Avatar, Box, Divider, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { useTranslation } from 'react-i18next';
import { createSx } from 'theme';
import { InstructorEducation } from 'types';

export type CourseInstructorEducationListProps = { educations: InstructorEducation[] };

export const CourseInstructorEducationList: React.FC<CourseInstructorEducationListProps> = ({ educations }) => {
    const { t } = useTranslation('course-detail');
    const sx = makeSx();
    return (
        <Box sx={sx.root}>
            {educations.map((education, index) => {
                return (
                    <Box key={education.id}>
                        <ListItem alignItems="flex-start" sx={{ px: 0, py: 2 }}>
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: 'primary.main' }}>
                                    <SchoolIcon sx={{ color: '#fff' }} />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={<Typography fontWeight={700}>{education.university}</Typography>}
                                secondary={
                                    <>
                                        <Typography variant="body2" color="primary" fontWeight={600}>
                                            {education.faculty}
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
                                                {DateTime.fromISO(education.start_date).toFormat('yyyy')} -{' '}
                                                {education.end_date && !education.is_ongoing
                                                    ? DateTime.fromISO(education.end_date).toFormat('yyyy')
                                                    : t('ongoing')}
                                            </span>
                                        </Typography>
                                    </>
                                }
                            />
                        </ListItem>
                        {index !== educations.length - 1 && <Divider light />}
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
