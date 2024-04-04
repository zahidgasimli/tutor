import { LoadingButton } from '@mui/lab';
import { Box, Paper, Typography, alpha, darken } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { isAxiosError } from 'axios';
import { useNotifications } from 'context/NotificationsContext';
import { useConfirmStore } from 'context/confirm/store';
import useMakeCourseRequestDecision from 'mutations/use-make-request-decision';
import useCourseRequests from 'queries/use-course-requests';
import { useTranslation } from 'react-i18next';
import { extractErrorMessageFromAxiosError } from 'utils/error-helper';

export const CourseModerationRequestList = () => {
    const { t } = useTranslation();

    const { data: courseRequestsData, isLoading: courseRequestsLoading } = useCourseRequests();
    const courseRequests = courseRequestsData?.data || [];

    const rows = courseRequests.map((request) => ({
        id: request.id,
        fullName: `${request.student_first_name} ${request.student_last_name}`,
        courseName: request.course_name,
        sections: request.sections,
    }));

    const columns: GridColDef<typeof rows[0]>[] = [
        {
            field: 'fullName',
            headerName: 'Ad Soyad',
            minWidth: 200,
        },
        {
            field: 'courseName',
            headerName: 'Kursun adı',
            minWidth: 150,
        },
        {
            field: 'date',
            headerName: 'Vaxt',
            minWidth: 220,
            flex: 1,
            renderCell: ({ row }) => {
                const sections = row.sections;
                return (
                    <Box height={52} py={1} sx={{ overflowY: 'scroll' }}>
                        {sections.map((section) => (
                            <Typography key={section.week_day}>
                                {t(`enum:WEEKDAY_${section.week_day}`)} ({section.start_time}-{section.end_time})
                            </Typography>
                        ))}
                    </Box>
                );
            },
        },
        {
            field: 'actions',
            renderHeader: () => null,
            disableColumnMenu: true,
            sortable: false,
            filterable: false,
            minWidth: 200,
            flex: 1,
            renderCell: ({ row }) => {
                const id = row.id;
                return <CourseModerationRequestActions request_id={id} />;
            },
        },
    ];

    return (
        <Paper sx={{ p: { xs: 2, sm: 3 }, pb: 1 }}>
            <Box display="flex" flexWrap="wrap" justifyContent="space-between" alignItems="center">
                <Typography variant="h4" color="primary" fontWeight={600}>
                    Müraciət siyahısı
                </Typography>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Typography sx={{ color: 'warning.dark' }} fontWeight={700}>
                        {rows.length}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Müraciət sayı
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ height: 56 + 53 + 52 * 6, width: '100%', mt: 4 }}>
                <DataGrid
                    sx={{
                        '& *': {
                            outline: 'none !important',
                        },
                        borderColor: 'transparent',
                    }}
                    loading={courseRequestsLoading}
                    rows={rows}
                    columns={columns}
                    disableRowSelectionOnClick
                    disableColumnMenu
                    disableColumnFilter
                    initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
                    pageSizeOptions={[5, 10, 15, rows.length]}
                    localeText={{
                        MuiTablePagination: { labelRowsPerPage: 'Göstərilən müraciət sayı' },
                        noRowsLabel: 'Müraciət yoxdur',
                    }}
                />
            </Box>
        </Paper>
    );
};

export type CourseModerationRequestActionsProps = {
    request_id: number;
};

export const CourseModerationRequestActions: React.FC<CourseModerationRequestActionsProps> = ({ request_id }) => {
    const acceptButtonColor = 'rgba(44, 197, 111)';
    const declineButtonColor = 'rgba(197, 44, 44)';

    const { notify } = useNotifications();
    const getConfirmation = useConfirmStore((state) => state.open);
    const { mutateAsync: makeCourseRequestDecision, isLoading } = useMakeCourseRequestDecision();

    const handleDecision = async (is_accepted: boolean) => {
        try {
            await makeCourseRequestDecision({ is_accepted, request_id });
            notify({ type: 'success', message: 'Sorğunuz uğurla yerinə yetirildi!' });
        } catch (error) {
            if (isAxiosError(error)) {
                notify({ type: 'error', message: extractErrorMessageFromAxiosError(error) });
            }
        }
    };

    return (
        <Box display="flex" justifyContent="space-between" flex={1}>
            <LoadingButton
                variant="contained"
                size="small"
                color="success"
                sx={{
                    backgroundColor: alpha(acceptButtonColor, 0.12),
                    color: acceptButtonColor,
                    boxShadow: 'none',
                    '&:hover': {
                        backgroundColor: alpha(darken(acceptButtonColor, 0.1), 0.12),
                    },
                }}
                onClick={() => handleDecision(true)}
                loading={isLoading}
                disabled={isLoading}
            >
                Qəbul et
            </LoadingButton>
            <LoadingButton
                variant="contained"
                size="small"
                color="error"
                sx={{
                    backgroundColor: alpha(declineButtonColor, 0.12),
                    color: declineButtonColor,
                    boxShadow: 'none',
                    '&:hover': {
                        backgroundColor: alpha(darken(declineButtonColor, 0.1), 0.12),
                    },
                    ml: 1.5,
                }}
                onClick={() => {
                    getConfirmation({
                        type: 'error',
                        title: 'Müraciəti rədd etmək istədiyinizdən əminsiniz?',
                        description: 'Müraciəti rədd etsəniz onu geri qaytarmaq mümkün olmayacaq!',
                        onConfirm: () => handleDecision(false),
                    });
                }}
                loading={isLoading}
                disabled={isLoading}
            >
                Rədd et
            </LoadingButton>
        </Box>
    );
};
