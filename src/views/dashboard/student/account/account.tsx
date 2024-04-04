import { Box, Container, Paper } from '@mui/material';
import { PageTabs, Spinner } from 'components';
import { ChangePasswordForm, StudentPersonalInfoForm } from 'components/form';
import { useConfirmStore } from 'context/confirm/store';
import { useTabs } from 'hooks/use-tabs';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

type Tab = 'personal-info' | 'password';

export const Account: React.FC = () => {
    const { t } = useTranslation();
    const getConfirmation = useConfirmStore((state) => state.open);
    const { activeTab, loading, changeActiveTab } = useTabs<Tab>('personal-info');

    const [dirty, setDirty] = useState<{ [key in Tab]: boolean }>({
        'personal-info': false,
        password: false,
    });

    return (
        <Container maxWidth="md">
            <Paper sx={{ p: { xs: 2, sm: 3 } }}>
                <PageTabs
                    tabs={[
                        { value: 'personal-info', label: 'Şəxsi məlumatlar' },
                        { value: 'password', label: 'Şifrə' },
                    ]}
                    value={activeTab}
                    onTabChange={(tab: Tab) => {
                        if (dirty[activeTab]) {
                            getConfirmation({
                                type: 'error',
                                title: t('confirm-dialog:accountUnsavedChangesTitle'),
                                description: t('confirm-dialog:accountUnsavedChangesTitle'),
                                onConfirm: () => changeActiveTab(tab),
                            });
                        } else {
                            changeActiveTab(tab);
                        }
                    }}
                    loading={loading}
                />
            </Paper>
            {!loading ? (
                <Box mt={3}>
                    {activeTab === 'personal-info' && (
                        <StudentPersonalInfoForm
                            onDirtyChange={(dirty) => setDirty((p) => ({ ...p, 'personal-info': dirty }))}
                        />
                    )}
                    {activeTab === 'password' && (
                        <ChangePasswordForm onDirtyChange={(dirty) => setDirty((p) => ({ ...p, password: dirty }))} />
                    )}
                </Box>
            ) : (
                <Box height={300}>
                    <Spinner />
                </Box>
            )}
        </Container>
    );
};
