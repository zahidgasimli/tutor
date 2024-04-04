import { Box } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

export type PaymentHistory = {
    paymentDate: string;
    price: number;
    buyAmount: number;
    subscriptionType: 'monthly' | 'yearly';
};

export type PaymentHistoryProps = {
    paymentHistories: PaymentHistory[];
};

export const PaymentHistory: React.FC<PaymentHistoryProps> = ({ paymentHistories }) => {
    const rows = paymentHistories.map((paymentHistory, index) => ({
        id: index,
        paymentDate: paymentHistory.paymentDate,
        price: `${paymentHistory.price} AZN`,
        subscription: `${paymentHistory.subscriptionType === 'monthly' ? 'Aylıq' : 'İllik'} ${
            paymentHistory.buyAmount
        } tələbəyə qədər`,
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
            field: 'subscription',
            headerName: 'Abunəlik metodu',
            minWidth: 175,
            flex: 1,
        },
    ];

    return (
        <Box sx={{ height: 56 + 53 + 52 * 6, width: '100%' }}>
            <DataGrid
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
