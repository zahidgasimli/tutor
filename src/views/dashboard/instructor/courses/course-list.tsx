import AddCircleIcon from '@mui/icons-material/AddCircle';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
// import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import { Avatar, Box, Grid, IconButton, Paper, Tooltip, Typography } from '@mui/material';
import { isAxiosError } from 'axios';
import { Link, PulsingButton, Spinner } from 'components';
import { useNotifications } from 'context/NotificationsContext';
import { useAuthStore } from 'context/auth/store';
import { useConfirmStore } from 'context/confirm/store';
import useDeleteCourse from 'mutations/use-delete-course';
import { InstructorCourse, InstructorCourseStatus } from 'queries/use-instructor-courses';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { createSx } from 'theme';
import { extractErrorMessageFromAxiosError } from 'utils/error-helper';

type InstructorCourseListProps = {
    courses: InstructorCourse[];
    loading: boolean;
    status: InstructorCourseStatus;
};

export const InstructorCourseList: React.FC<InstructorCourseListProps> = ({ courses, loading, status }) => {
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
                    Bu statusa uyğun kursunuz yoxdur.
                </Typography>

                {status !== 'ARCHIVED' && (
                    <Link to="create">
                        <PulsingButton sx={{ bgcolor: 'background.paper' }} variant="outlined" size="small">
                            Kurs yarat
                        </PulsingButton>
                    </Link>
                )}
            </Box>
        );
    }

    return (
        <Box display="flex" flexDirection="column" minHeight={400}>
            <Grid container spacing={2}>
                {status !== 'ARCHIVED' && (
                    <Grid item xs={12}>
                        <Box
                            display={{ xs: 'block', sm: 'flex' }}
                            justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}
                        >
                            <Link to="create">
                                <PulsingButton
                                    fullWidth
                                    startIcon={<AddCircleIcon />}
                                    variant="contained"
                                    color="info"
                                    size="small"
                                >
                                    Kurs yarat
                                </PulsingButton>
                            </Link>
                        </Box>
                    </Grid>
                )}
                {courses.map((course, index) => (
                    <Grid item xs={12} lg={6} key={index}>
                        <InstructorCourseListItem {...course} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

type InstructorCourseListItemProps = InstructorCourse;

export const InstructorCourseListItem: React.FC<InstructorCourseListItemProps> = ({
    id,
    slug,
    title,
    sections,
    status,
}) => {
    const sx = makeSx();
    const { t } = useTranslation();
    const { notify } = useNotifications();
    const avatarUrl = useAuthStore((state) => state.user?.avatarUrl);
    const getConfirmation = useConfirmStore((state) => state.open);
    const navigate = useNavigate();

    const { mutateAsync: deleteCourse, isLoading: deletingCourse } = useDeleteCourse();

    const handleCourseDelete = async (id: number) => {
        try {
            await deleteCourse(id);
            notify({ type: 'success', message: 'Kurs uğurla silindi.' });
        } catch (error) {
            if (isAxiosError(error)) {
                notify({ type: 'error', message: extractErrorMessageFromAxiosError(error) });
            }
        }
    };

    const actions: CourseItemAction[] = [
        {
            title: 'Kopyala',
            icon: <ContentCopyOutlinedIcon />,
            onClick: () => navigate(`/dashboard/courses/copy/${id}`),
        },
        {
            title: 'Dəyişiklik et',
            icon: <DriveFileRenameOutlineIcon />,
            onClick: () => navigate(`/dashboard/courses/update/${id}`),
            hidden: status === 'ACTIVE' || status === 'ARCHIVED',
        },
        // {
        //     title: 'Arxivlə',
        //     icon: <Inventory2OutlinedIcon />,
        //     onClick: () =>
        //         getConfirmation({
        //             title: 'Dərsi arxivləşdirmək istədiyinizə əminsinizmi?',
        //             description: 'Arxivləşdirdiyiniz dərsi istədiyiniz vaxt geri qaytara bilərsiniz.',
        //             onConfirm: () => alert('..'),
        //         }),
        //     hidden: status === 'ARCHIVED',
        // },
        {
            title: 'Sil',
            icon: deletingCourse ? <Spinner size={16} /> : <DeleteOutlineIcon color="error" />,
            onClick: () =>
                getConfirmation({
                    type: 'error',
                    title: 'Dərsi silmək istədiyinizə əminsinizmi?',
                    description: 'Sildiyiniz dərsi geri qaytarmaq mümkün deyil!',
                    onConfirm: () => handleCourseDelete(id),
                }),
            disabled: deletingCourse,
            hidden: status === 'ACTIVE' || status === 'ARCHIVED',
        },
    ];

    return (
        <Link to={`/courses/${slug}`}>
            <Paper sx={sx.root} elevation={2}>
                <Box>
                    <Avatar variant="rounded" src={avatarUrl || undefined} sx={sx.avatar} />
                </Box>
                <Box ml={2} flex={1}>
                    <Box display="flex" height={48}>
                        <Box flex={1}>
                            <Typography gutterBottom fontWeight={600}>
                                {title}
                            </Typography>
                        </Box>
                        <Box ml={2}>
                            <CourseItemActions actions={actions} />
                        </Box>
                    </Box>
                    <Box mt={2}>
                        {sections.map((section, index) => (
                            <Box key={index} display="flex" flexWrap="wrap" alignItems="center" mb={0.75}>
                                <Box display="flex" alignItems="center" flex={1}>
                                    <CalendarTodayOutlinedIcon sx={sx.calendarIcon} />
                                    <Typography sx={{ mx: 1 }} variant="body2" color="textSecondary">
                                        {t(`enum:WEEKDAY_${section.week_day}`)}
                                    </Typography>
                                </Box>
                                <Paper sx={sx.timeRangeContainer} variant="outlined">
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

export type CourseItemAction = {
    title: string;
    icon: React.ReactNode;
    onClick: () => void;
    hidden?: boolean;
    disabled?: boolean;
};

export const CourseItemActions: React.FC<{ actions: CourseItemAction[] }> = ({ actions }) => {
    const sx = makeSx();
    return (
        <Box>
            {actions.map((action, index) =>
                action.hidden ? null : (
                    <Tooltip key={index} title={action.title}>
                        <IconButton
                            size="small"
                            sx={sx.actionButton}
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                action.onClick();
                            }}
                            disabled={action.disabled}
                        >
                            {action.icon}
                        </IconButton>
                    </Tooltip>
                ),
            )}
        </Box>
    );
};

const makeSx = createSx(() => {
    return {
        root: {
            p: 2,
            display: 'flex',
            height: '100%',
        },
        avatar: { width: 48, height: 48 },
        calendarIcon: { color: 'text.secondary', fontSize: 16 },
        timeRangeContainer: { borderRadius: 50, px: 1, py: 0.5, bgcolor: 'transparent' },
        actionButton: {
            ml: 0.25,
            '& svg': { fontSize: 16 },
        },
    };
});
