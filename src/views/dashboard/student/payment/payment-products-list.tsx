import { RadioButtonChecked, RadioButtonUnchecked } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Alert, Box, Grid, Paper, Typography } from '@mui/material';
import { isAxiosError } from 'axios';
import { Spinner } from 'components';
import { useNotifications } from 'context/NotificationsContext';
import usePurchaseProduct from 'mutations/use-purchase-product';
import usePaymentProducts from 'queries/use-payment-products';
import useStudent from 'queries/use-student';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { extractErrorMessageFromAxiosError } from 'utils/error-helper';

export const PaymentProductsList: React.FC = () => {
    const { t } = useTranslation('payment');
    const { notify } = useNotifications();
    const { data, isLoading } = usePaymentProducts();
    const { mutateAsync: purchaseProduct, isLoading: paymentUrlLoading } = usePurchaseProduct();
    const { data: studentData } = useStudent();

    const applyLimit = studentData?.data.limits['course-apply-count'] || 0;

    const products = data?.data || [];

    const [selectedProductId, setSelectedProductId] = useState<string>();

    useEffect(() => {
        if (!selectedProductId && products.length > 0) {
            setSelectedProductId(products[0].id);
        }
    }, [products, selectedProductId]);

    if (isLoading) {
        return <Spinner />;
    }

    const onPurchase = async () => {
        if (selectedProductId) {
            try {
                const { data } = await purchaseProduct(selectedProductId);
                const paymentUrl = data.data.page_url;
                if (paymentUrl) {
                    window.open(paymentUrl, '_blank');
                }
            } catch (error) {
                if (isAxiosError(error)) {
                    notify({ type: 'error', message: extractErrorMessageFromAxiosError(error) });
                }
            }
        }
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Alert severity={applyLimit === 0 ? 'error' : applyLimit <= 5 ? 'info' : 'success'}>
                    <Typography>
                        {t('remainingApplies')}: <strong>{applyLimit}</strong>
                    </Typography>
                </Alert>
            </Grid>
            {products.map((product) => {
                const isSelected = product.id === selectedProductId;
                return (
                    <Grid key={product.id} item xs={12} sm={6}>
                        <Paper
                            elevation={2}
                            sx={{
                                border: '1px solid',
                                borderColor: isSelected ? 'primary.main' : 'transparent',
                                transition: '.3s border-color',
                            }}
                        >
                            <Box
                                px={2}
                                py={3}
                                onClick={() => setSelectedProductId(product.id)}
                                sx={{ cursor: 'pointer' }}
                            >
                                <Box display="flex" alignItems="center">
                                    {selectedProductId === product.id ? (
                                        <RadioButtonChecked color="primary" />
                                    ) : (
                                        <RadioButtonUnchecked />
                                    )}
                                    <Typography ml={2}>{product.name}</Typography>
                                </Box>
                                <Box mt={2} display="flex" justifyContent="flex-end">
                                    <Typography fontWeight={700} color="primary">
                                        {product.price} {product.currency}
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                );
            })}

            <Grid container item xs={12} justifyContent="flex-end">
                <LoadingButton
                    loading={paymentUrlLoading}
                    disabled={paymentUrlLoading}
                    variant="contained"
                    sx={{ maxWidth: 250, width: '100%' }}
                    onClick={onPurchase}
                >
                    {t('pay')}
                </LoadingButton>
            </Grid>
        </Grid>
    );
};
