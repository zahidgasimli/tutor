import { Cancel, CheckCircle } from '@mui/icons-material';
import { Box } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { DateTime } from 'luxon';
import usePayments from 'queries/use-payments';

export const PaymentHistory = () => {
    const { data, isLoading } = usePayments();

    const payments = data?.data || [];

    const rows = payments.map((payment, index) => ({
        id: index,
        paymentDate: DateTime.fromISO(payment.created_at).toFormat('dd.MM.yyyy - HH:mm'),
        price: `${payment.paid_price} ${payment.currency}`,
        description: payment.description,
        status: payment.status,
    }));

    const columns: GridColDef<typeof rows[0]>[] = [
        {
            field: 'paymentDate',
            headerName: 'Ödəndiyi tarix',
            minWidth: 175,
            flex: 1,
        },
        {
            field: 'price',
            headerName: 'Məbləğ',
            minWidth: 100,
            flex: 1,
        },
        {
            field: 'description',
            headerName: 'Məzmun',
            minWidth: 175,
            flex: 1,
        },
        {
            field: 'status',
            headerName: 'Status',
            align: 'center',
            headerAlign: 'center',
            renderCell(params) {
                return params.row.status === 'SUCCESS' ? <CheckCircle color="success" /> : <Cancel color="error" />;
            },
        },
    ];

    return (
        <Box sx={{ height: 56 + 53 + 52 * 6, width: '100%' }}>
            <DataGrid
                loading={isLoading}
                rows={rows}
                columns={columns}
                disableRowSelectionOnClick
                disableColumnMenu
                disableColumnFilter
                initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
                pageSizeOptions={[5, 10, 15, rows.length]}
                localeText={{ MuiTablePagination: { labelRowsPerPage: 'Göstərilən tarixçə sayı' } }}
            />
        </Box>
    );
};
