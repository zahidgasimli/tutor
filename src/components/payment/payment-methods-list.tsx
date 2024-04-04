import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Box, Button, Grid, IconButton, Paper, Typography } from '@mui/material';
import { ReactComponent as VisaIcon } from 'assets/payment-issuers/visa.svg';
import { ReactComponent as MastercardIcon } from 'assets/payment-issuers/mastercard.svg';
import { AddPaymentMethodDialog } from './add-payment-method-dialog';
import { useCallback, useState } from 'react';

export type PaymentCard = {
    id: number;
    issuer: 'visa' | 'mastercard';
    digits: string;
};

export type PaymentMethodsListProps = {
    cards: PaymentCard[];
};

export const PaymentMethodsList: React.FC<PaymentMethodsListProps> = ({ cards }) => {
    const [addPaymentMethodDialogOpen, setAddPaymentMethodDialogOpen] = useState(false);

    const openAddPaymentMethodDialog = useCallback(() => setAddPaymentMethodDialogOpen(true), []);
    const closeAddPaymentMethodDialog = useCallback(() => setAddPaymentMethodDialogOpen(false), []);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} mb={1}>
                <Box display="flex" justifyContent="flex-end">
                    <Button
                        startIcon={<AddCircleOutlineIcon />}
                        variant="contained"
                        onClick={openAddPaymentMethodDialog}
                    >
                        Kart əlavə et
                    </Button>
                    <AddPaymentMethodDialog open={addPaymentMethodDialogOpen} onClose={closeAddPaymentMethodDialog} />
                </Box>
            </Grid>
            {cards.map((card) => (
                <Grid key={card.id} item xs={12} lg={6}>
                    <PaymentMethodsListItem {...card} />
                </Grid>
            ))}
        </Grid>
    );
};

export const PaymentMethodsListItem: React.FC<PaymentCard> = ({ id, issuer, digits }) => {
    const paymentIssuersIconMap = {
        visa: <VisaIcon width="100%" height="100%" />,
        mastercard: <MastercardIcon width="100%" height="100%" fill="red" />,
    };
    return (
        <Paper sx={{ p: { xs: 2, sm: 3 }, display: 'flex', alignItems: 'center' }} elevation={2}>
            <Box width={44} height={44}>
                {paymentIssuersIconMap[issuer]}
            </Box>
            <Typography fontWeight={600} flex={1} mx={2}>
                {digits}
            </Typography>
            <IconButton size="small" onClick={() => alert(id)}>
                <HighlightOffIcon fontSize="small" color="error" />
            </IconButton>
        </Paper>
    );
};
