import { Box, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const PaymentResult: React.FC<{ status: 'success' | 'fail' }> = ({ status }) => {
    const { t } = useTranslation('payment');
    const isSuccess = status === 'success';
    return (
        <Box flex={1} p={2} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <img
                src={
                    isSuccess
                        ? require('assets/images/payment/payment-success.jpg').default
                        : require('assets/images/payment/payment-fail.jpg').default
                }
                style={{ maxWidth: 300, width: '100%', borderRadius: '50%' }}
            />

            <Typography my={4} sx={{ color: isSuccess ? 'success.main' : 'error.main' }} textAlign="center">
                {isSuccess ? t('paymentSuccess') : t('paymentFailed')}
            </Typography>

            <Button component={Link} to="/dashboard/payments?tab=history" variant="contained">
                {t('seeHistory')}
            </Button>
        </Box>
    );
};

export default PaymentResult;
