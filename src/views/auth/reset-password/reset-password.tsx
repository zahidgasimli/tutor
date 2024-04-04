import { Box, Container, Grid, Hidden, styled, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { isAxiosError } from 'axios';
import { headerHeight, mobileSize } from 'config';
import { useNotifications } from 'context/NotificationsContext';
import { Form, Formik, FormikHelpers } from 'formik';
import useResetPassword, { resetPasswordFormSchema, ResetPasswordInput } from 'mutations/use-reset-password';
import { useNavigate, useParams } from 'react-router-dom';
import { extractErrorMessageFromAxiosError } from 'utils/error-helper';
import { ResetPasswordForm } from './reset-password-form';

const StyledContainer = styled(Container)(({ theme }: { theme: Theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: `calc(100vh - ${headerHeight + 31.5 + 32}px)`,
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
    [theme.breakpoints.down(mobileSize)]: {
        minHeight: 'unset',
    },
}));

export const ResetPassword: React.FC = () => {
    const { notify } = useNotifications();
    const { token } = useParams<{ token: string }>();
    const navigate = useNavigate();

    const { mutateAsync: resetPassword, isLoading: resettingPassword } = useResetPassword();

    const initialValues: ResetPasswordInput = {
        new_password: '',
        confirm_new_password: '',
        token: token || '',
    };

    const onSubmit = async (values: ResetPasswordInput, formikHelpers: FormikHelpers<ResetPasswordInput>) => {
        try {
            await resetPassword(values);
            notify({
                type: 'success',
                message: 'Şifrəniz sıfırlandı! Xahiş olunur daxil olun',
            });
            navigate('/auth/sign-in');
        } catch (err) {
            if (isAxiosError(err)) {
                notify({ type: 'error', message: extractErrorMessageFromAxiosError(err) });
                formikHelpers.setSubmitting(false);
            }
        }
    };

    return (
        <Box mb={2}>
            <Grid container>
                <Hidden mdDown>
                    <Grid item md={6}>
                        <Box height="100%">
                            <img
                                src={require('assets/images/auth/sign-up.png').default}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'right' }}
                            />
                        </Box>
                    </Grid>
                </Hidden>
                <Grid item xs={12} md={6}>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        validationSchema={resetPasswordFormSchema}
                    >
                        {({ handleSubmit }) => {
                            return (
                                <Form onSubmit={handleSubmit}>
                                    <StyledContainer maxWidth="sm">
                                        <Typography variant="h2" sx={{ mb: 4, fontWeight: 600 }} whiteSpace="pre-line">
                                            Yeni şifrənizi <br />
                                            qeyd edin
                                        </Typography>
                                        <ResetPasswordForm isLoading={resettingPassword} />
                                    </StyledContainer>
                                </Form>
                            );
                        }}
                    </Formik>
                </Grid>
            </Grid>
        </Box>
    );
};
