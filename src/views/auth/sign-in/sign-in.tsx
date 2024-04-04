import { LoadingButton } from '@mui/lab';
import { Box, Container, Grid, Hidden, styled, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { isAxiosError } from 'axios';
import { Link, PasswordField } from 'components';
import { headerHeight, mobileSize } from 'config';
import { useAuthStore } from 'context/auth/store';
import { useNotifications } from 'context/NotificationsContext';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import useLogin, { loginFormSchema, LoginInput } from 'mutations/use-login';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { extractErrorMessageFromAxiosError } from 'utils/error-helper';
import { GoogleLoginButton } from '../components';

const StyledContainer = styled(Container)(({ theme }: { theme: Theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: `calc(100vh - ${headerHeight}px)`,
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
    [theme.breakpoints.down(mobileSize)]: {
        minHeight: 'unset',
    },
}));

export const SignIn: React.FC = () => {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const signIn = useAuthStore((state) => state.login);
    const navigate = useNavigate();
    const { state }: { state: { email?: string; redirectPath?: string } } = useLocation();
    const { notify } = useNotifications();

    const { mutateAsync: login, isLoading } = useLogin();

    const initialValues: LoginInput = {
        email: state?.email || '',
        password: '',
    };

    const onSubmit = async (values: LoginInput) => {
        try {
            const {
                data: { access: accessToken, refresh: refreshToken },
            } = await login(values);
            notify({ type: 'success', message: 'Xoş gəlmişsiniz!' });
            signIn({ accessToken, refreshToken });
        } catch (error) {
            if (isAxiosError(error)) {
                notify({ type: 'error', message: extractErrorMessageFromAxiosError(error) });
            }
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            navigate(state?.redirectPath || '/dashboard/');
        }
    }, [isLoggedIn, navigate]);

    return (
        <Box mb={2}>
            <Grid container>
                <Hidden mdDown>
                    <Grid item md={6}>
                        <Box height="100%">
                            <img
                                src={require('assets/images/auth/sign-in.png').default}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'right' }}
                            />
                        </Box>
                    </Grid>
                </Hidden>
                <Grid item xs={12} md={6}>
                    <StyledContainer maxWidth="sm">
                        <Typography variant="h2" sx={{ mb: 6, fontWeight: 600 }}>
                            Daxil olun
                        </Typography>

                        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={loginFormSchema}>
                            {({ handleSubmit }) => {
                                return (
                                    <Form onSubmit={handleSubmit}>
                                        <Grid container spacing={{ xs: 2, sm: 2.5 }}>
                                            <Grid item xs={12}>
                                                <Field component={TextField} name="email" label="E-poçt" />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Field component={PasswordField} name="password" label="Şifrə" />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Link
                                                    to="../forgot-password"
                                                    state={{ fromSignIn: true }}
                                                    link
                                                    style={{ width: 'fit-content' }}
                                                >
                                                    <Typography color="primary" variant="body2">
                                                        Şifrəni unutmusunuz?
                                                    </Typography>
                                                </Link>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <LoadingButton
                                                    fullWidth
                                                    variant="contained"
                                                    type="submit"
                                                    loading={isLoading}
                                                    disabled={isLoading}
                                                >
                                                    Daxil ol
                                                </LoadingButton>
                                            </Grid>
                                            {/* <Grid item xs={12}>
                                                <Button variant="outlined" fullWidth startIcon={<FacebookIcon />}>
                                                    Facebook
                                                </Button>
                                            </Grid> */}
                                            <Grid item xs={12}>
                                                <GoogleLoginButton />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography display="flex">
                                                    Hesabınız yoxdur? &nbsp;
                                                    <Link to="../sign-up" style={{ width: 'fit-content' }}>
                                                        <Typography color="info.main">Hesab yaradın</Typography>
                                                    </Link>
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Form>
                                );
                            }}
                        </Formik>
                    </StyledContainer>
                </Grid>
            </Grid>
        </Box>
    );
};
