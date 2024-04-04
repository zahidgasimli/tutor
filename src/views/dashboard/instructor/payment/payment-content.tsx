import { Box, Paper } from '@mui/material';
import { PageTabs, PaymentMethodsList, Spinner } from 'components';
import { useTabs } from 'hooks/use-tabs';
import { PaymentHistory } from './payment-history';
import { PaymentCard } from 'components/payment';

export const PaymentsContent = () => {
    const { activeTab, loading, changeActiveTab } = useTabs<'methods' | 'history'>('methods');
    return (
        <Paper sx={{ px: 2, py: { xs: 2, sm: 4 } }}>
            <PageTabs
                tabs={[
                    { value: 'methods', label: 'Ödəniş metodları' },
                    { value: 'history', label: 'Ödəniş tarixçəsi' },
                ]}
                value={activeTab}
                onTabChange={changeActiveTab}
                loading={loading}
            />
            {!loading ? (
                <Box mt={3}>
                    {activeTab === 'methods' && <PaymentMethodsList cards={dummyCards} />}
                    {activeTab === 'history' && <PaymentHistory paymentHistories={dummyPaymentHistories} />}
                </Box>
            ) : (
                <Box height={300}>
                    <Spinner />
                </Box>
            )}
        </Paper>
    );
};

const dummyCards: PaymentCard[] = [
    { id: 1, issuer: 'visa', digits: '4169 **** **** 8756' },
    { id: 2, issuer: 'mastercard', digits: '4169 **** **** 8756' },
    { id: 3, issuer: 'mastercard', digits: '4169 **** **** 8756' },
    { id: 4, issuer: 'visa', digits: '4169 **** **** 8756' },
    { id: 5, issuer: 'mastercard', digits: '4169 **** **** 8756' },
];

const dummyPaymentHistories: PaymentHistory[] = [
    { paymentDate: '27 Yanvar 2023  17:26', price: 9.99, buyAmount: 2, subscriptionType: 'monthly' },
    { paymentDate: '22 Yanvar 2023  11:48', price: 19.99, buyAmount: 5, subscriptionType: 'monthly' },
    { paymentDate: '16 Yanvar 2023  13:35', price: 29.99, buyAmount: 30, subscriptionType: 'yearly' },
];
