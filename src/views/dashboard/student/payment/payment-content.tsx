import { Box, Paper } from '@mui/material';
import {
    PageTabs,
    //  PaymentMethodsList,
    Spinner,
} from 'components';
// import { PaymentCard } from 'components/payment';
import { useTabs } from 'hooks/use-tabs';
import { PaymentHistory } from './payment-history';
import { PaymentProductsList } from './payment-products-list';
import { useTranslation } from 'react-i18next';

export const PaymentsContent = () => {
    const { t } = useTranslation('payment');
    const { activeTab, loading, changeActiveTab } = useTabs<
        | 'products'
        // | 'methods'
        | 'history'
    >('products');
    return (
        <Paper sx={{ px: 2, py: { xs: 2, sm: 4 } }}>
            <PageTabs
                tabs={[
                    { value: 'products', label: t('products') },
                    // { value: 'methods', label: 'Ödəniş metodları' },
                    { value: 'history', label: t('history') },
                ]}
                value={activeTab}
                onTabChange={changeActiveTab}
                loading={loading}
            />
            {!loading ? (
                <Box mt={3}>
                    {activeTab === 'products' && <PaymentProductsList />}
                    {/* {activeTab === 'methods' && <PaymentMethodsList cards={dummyCards} />} */}
                    {activeTab === 'history' && <PaymentHistory />}
                </Box>
            ) : (
                <Box height={300}>
                    <Spinner />
                </Box>
            )}
        </Paper>
    );
};

// const dummyCards: PaymentCard[] = [
//     { id: 1, issuer: 'visa', digits: '4169 **** **** 8756' },
//     { id: 2, issuer: 'mastercard', digits: '4169 **** **** 8756' },
//     { id: 3, issuer: 'mastercard', digits: '4169 **** **** 8756' },
//     { id: 4, issuer: 'visa', digits: '4169 **** **** 8756' },
//     { id: 5, issuer: 'mastercard', digits: '4169 **** **** 8756' },
// ];
