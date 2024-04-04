import { Avatar, Box, Container, Grid, Paper, Typography } from '@mui/material';
import { GoodToKnowBox, PageTabs, Spinner } from 'components';
import { ChangePasswordForm, InstructorExperienceForm, InstructorPersonalInfoForm } from 'components/form';
import { useConfirmStore } from 'context/confirm/store';
import { useTabs } from 'hooks/use-tabs';
import { ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';

type Tab = 'personal-info' | 'experience' | 'password';

const goodToKnows: { [key in Exclude<Tab, 'password'>]: { title: string; body: string | ReactNode } } = {
    'personal-info': {
        title: 'Bilmək yaxşıdır',
        body: (
            <Box sx={{ color: 'text.secondary' }}>
                <Typography>
                    Şəkiliniz tələbələrin görəcəyi ilk şeydir, ona görə də aşağıdakı kriteryalara diqqət yetirin.
                </Typography>
                <br />
                <Typography variant="h6" fontSize={16} fontWeight={600}>
                    ŞƏKİL FORMATI NECƏ OLMALIDIR ?
                </Typography>

                <Box display="flex" mt={2}>
                    <Avatar
                        variant="square"
                        sx={{ mr: 2, width: 56, height: 56 }}
                        src={require('assets/images/person/person-1.png').default}
                    />
                    <Avatar
                        variant="square"
                        sx={{ mr: 2, width: 56, height: 56 }}
                        src={require('assets/images/person/person-5.png').default}
                    />
                    <Avatar
                        variant="square"
                        sx={{ width: 56, height: 56 }}
                        src={require('assets/images/person/person-3.png').default}
                    />
                </Box>

                <br />
                <ul style={{ listStylePosition: 'inside' }}>
                    <li>Gülümsəməyə çalışın</li>
                    <li>JPG formatında </li>
                    <li>Tək, biz ancaq sizi fotoda görmək istəyirik</li>
                </ul>
            </Box>
        ),
    },
    experience: {
        title: 'Bilmək yaxşıdır',
        body:
            'Yaşadığınız təcrübədən aslı olaraq əldə etdiyiniz diplomu və ya sertifikatı aşağı hissədə əlavə edə bilərsiniz. Diqqətinizə çatdırmaq istərdik ki qeyd etdiyiniz hər bir məlumat yaratdığınız kurs bölməsində görsənəcək. Yaranmış hər hansı bir çətinlikdə aşağıdakı nömrəmizlə əlaqə saxlıya bilərsiniz.',
    },
};

export const Account: React.FC = () => {
    const { t } = useTranslation();
    const getConfirmation = useConfirmStore((state) => state.open);
    const { activeTab, loading, changeActiveTab } = useTabs<Tab>('personal-info');

    const [dirty, setDirty] = useState<{ [key in Tab]: boolean }>({
        'personal-info': false,
        experience: false,
        password: false,
    });

    return (
        <Container maxWidth="xl">
            <Grid container spacing={3} flexDirection={{ xs: 'column-reverse', md: 'row' }}>
                <Grid item xs={12} md={7.5}>
                    <Paper sx={{ p: 3 }}>
                        <PageTabs
                            tabs={[
                                { value: 'personal-info', label: 'Şəxsi məlumatlar', shortLabel: 'Şəxsi' },
                                { value: 'experience', label: 'Təcrübə' },
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
                                <InstructorPersonalInfoForm
                                    confirmButtonLabel="Yadda saxla"
                                    checkDirty
                                    onDirtyChange={(dirty) => setDirty((p) => ({ ...p, 'personal-info': dirty }))}
                                />
                            )}
                            {activeTab === 'experience' && (
                                <InstructorExperienceForm
                                    confirmButtonLabel="Yadda saxla"
                                    checkDirty
                                    onDirtyChange={(dirty) => setDirty((p) => ({ ...p, experience: dirty }))}
                                />
                            )}
                            {activeTab === 'password' && (
                                <ChangePasswordForm
                                    onDirtyChange={(dirty) => setDirty((p) => ({ ...p, password: dirty }))}
                                />
                            )}
                        </Box>
                    ) : (
                        <Box height={300}>
                            <Spinner />
                        </Box>
                    )}
                </Grid>
                <Grid item xs={12} md={4.5}>
                    {activeTab !== 'password' && (
                        <GoodToKnowBox title={goodToKnows[activeTab].title} body={goodToKnows[activeTab].body} />
                    )}
                </Grid>
            </Grid>
        </Container>
    );
};
