import { Box, Paper, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import useCourseStudents from 'queries/use-course-requests';
import { StudentApplicationStatus } from 'queries/use-student-applications';
import { useTranslation } from 'react-i18next';
import { ApplicationStatus } from '../courses/components';

export const CourseModerationStudentList = () => {
    const { t } = useTranslation();

    const { data: courseStudentsData, isLoading: courseStudentsLoading } = useCourseStudents([
        StudentApplicationStatus.WAITING,
        StudentApplicationStatus.ENROLLED,
    ]);
    const courseStudents = courseStudentsData?.data || [];

    const rows = courseStudents.map((request) => ({
        id: request.id,
        fullName: `${request.student_first_name} ${request.student_last_name}`,
        courseName: request.course_name,
        phoneNumber: request.student_phone_number,
        status: request.status,
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
            field: 'phoneNumber',
            headerName: 'Telefon Nömrəsi',
            minWidth: 150,
            flex: 1,
        },
        {
            field: 'actions',
            renderHeader: () => null,
            disableColumnMenu: true,
            sortable: false,
            filterable: false,
            minWidth: 150,
            flex: 1,
            renderCell: ({ row }) => {
                const status = row.status;
                return <ApplicationStatus status={status} />;
            },
        },
    ];

    return (
        <Paper sx={{ p: { xs: 2, sm: 3 }, pb: 1 }}>
            <Box display="flex" flexWrap="wrap" justifyContent="space-between" alignItems="center">
                <Typography variant="h4" color="primary" fontWeight={600}>
                    Abituriyent siyahısı
                </Typography>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Typography sx={{ color: 'warning.dark' }} fontWeight={700}>
                        {rows.length}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Abituriyent sayı
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ height: 56 + 53 + 52 * 5, width: '100%', mt: 4 }}>
                <DataGrid
                    sx={{
                        '& *': {
                            outline: 'none !important',
                        },
                        borderColor: 'transparent',
                    }}
                    loading={courseStudentsLoading}
                    rows={rows}
                    columns={columns}
                    disableRowSelectionOnClick
                    disableColumnMenu
                    disableColumnFilter
                    initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
                    pageSizeOptions={[5, 10, 15, rows.length]}
                    localeText={{
                        MuiTablePagination: { labelRowsPerPage: 'Göstərilən abituriyent sayı' },
                        noRowsLabel: 'Abituriyentiniz yoxdur',
                    }}
                />
            </Box>
        </Paper>
    );
};
