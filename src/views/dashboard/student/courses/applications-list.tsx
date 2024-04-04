import { Box, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { StudentApplication } from 'queries/use-student-applications';
import { ApplicationStatus } from './components';
import { DateTime } from 'luxon';
import useStudent from 'queries/use-student';

type StudentApplicationsListProps = {
    applications: StudentApplication[];
    loading: boolean;
};

export const StudentApplicationsList: React.FC<StudentApplicationsListProps> = ({ applications, loading }) => {
    const { data: studentData } = useStudent();

    const applyLimit = studentData?.data.limits['course-apply-count'] || 0;

    const rows = applications.map((application, index) => ({
        id: index,
        courseName: application.course_name,
        instructorName: application.instructor_first_name + ' ' + application.instructor_last_name,
        appliedDate: DateTime.fromISO(application.applied_date).toFormat('dd-MM-yyyy HH:mm:ss'),
        status: application.status,
    }));

    const columns: GridColDef<typeof rows[0]>[] = [
        {
            field: 'instructorName',
            headerName: 'Müəllim',
            minWidth: 175,
            flex: 1,
        },
        {
            field: 'courseName',
            headerName: 'Dərs',
            flex: 1,
            minWidth: 100,
        },
        {
            field: 'appliedDate',
            headerName: 'Vaxt',
            flex: 1,
            minWidth: 250,
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 150,
            align: 'center',
            headerAlign: 'center',
            renderCell(params) {
                return <ApplicationStatus status={params.row.status} />;
            },
        },
    ];

    return (
        <Box>
            <Box display="flex" justifyContent="flex-end">
                <Typography display="inline-flex" alignItems="center" color="textSecondary" mb={2}>
                    Qalan müraciətlərin sayı:{' '}
                    <Typography display="inline" color="secondary" fontSize={20} fontWeight={600} ml={2}>
                        {applyLimit}
                    </Typography>
                </Typography>
            </Box>
            <Box sx={{ height: 56 + 53 + 52 * 6, width: '100%' }}>
                <DataGrid
                    loading={loading}
                    rows={rows}
                    columns={columns}
                    disableRowSelectionOnClick
                    disableColumnMenu
                    disableColumnFilter
                    initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
                    pageSizeOptions={[5, 10, 15, rows.length]}
                    localeText={{
                        MuiTablePagination: { labelRowsPerPage: 'Göstərilən müraciət sayı' },
                        noRowsLabel: 'Heç bir kursa müraciət etməmisiniz',
                    }}
                />
            </Box>
        </Box>
    );
};
