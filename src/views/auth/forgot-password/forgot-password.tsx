import { ChevronLeft as ChevronLeftIcon } from '@mui/icons-material';
import { Box, Button, Container, Grid, Hidden, IconButton, styled, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { isAxiosError } from 'axios';
import { StepperContent } from 'components';
import { headerHeight, mobileSize } from 'config';
import { useNotifications } from 'context/NotificationsContext';
import { Form, Formik, FormikHelpers } from 'formik';
import useForgotPassword, { forgotPasswordFormSchema, ForgotPasswordInput } from 'mutations/use-forgot-password';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { extractErrorMessageFromAxiosError } from 'utils/error-helper';
import { ForgotPasswordStep1 } from './components/forgot-password-step1';
import { ForgotPasswordStep2 } from './components/forgot-password-step2';

const StyledContainer = styled(Container)(({ theme }: { theme: Theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    minHeight: `calc(100vh - ${headerHeight + 31.5 + 32}px)`,
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
    [theme.breakpoints.down(mobileSize)]: {
        minHeight: 'unset',
    },
}));

const steps = ['Şifrəni unutmusunuz? ', 'E-poçtunuzu yoxlayın'];

export const ForgotPassword: React.FC = () => {
    const { notify } = useNotifications();
    const { state }: { state?: { fromSignIn?: boolean } } = useLocation();
    const navigate = useNavigate();

    const { mutateAsync: forgotPassword, isLoading: sendingEmail } = useForgotPassword();

    const initialValues: ForgotPasswordInput = {
        email: '',
    };

    const [forgotPasswordStep, setForgotPasswordStep] = useState(0);

    const goBack = () => {
        if (forgotPasswordStep === 0 && state?.fromSignIn) {
            navigate(-1);
        } else {
            setForgotPasswordStep(0);
        }
    };

    const onSubmit = async (values: ForgotPasswordInput, formikHelpers: FormikHelpers<ForgotPasswordInput>) => {
        try {
            await forgotPassword(values);
            setForgotPasswordStep(1);
        } catch (err) {
            if (isAxiosError(err)) {
                notify({ type: 'error', message: extractErrorMessageFromAxiosError(err) });
                formikHelpers.setSubmitting(false);
            }
        }
    };

    const shouldShowBackButton = (forgotPasswordStep === 0 && state?.fromSignIn) || forgotPasswordStep === 1;

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
                        validationSchema={forgotPasswordFormSchema}
                    >
                        {({ handleSubmit, values }) => {
                            return (
                                <Form onSubmit={handleSubmit}>
                                    {shouldShowBackButton && (
                                        <Container
                                            sx={{ my: { xs: 0, [mobileSize]: 2 }, mt: { xs: 1 }, ml: { xs: -1.5 } }}
                                        >
                                            <Hidden mdDown>
                                                <Box>
                                                    <Button
                                                        size="small"
                                                        startIcon={<ChevronLeftIcon />}
                                                        onClick={goBack}
                                                    >
                                                        Geri
                                                    </Button>
                                                </Box>
                                            </Hidden>
                                            <Hidden mdUp>
                                                <Box mr={1}>
                                                    <IconButton onClick={goBack}>
                                                        <ChevronLeftIcon />
                                                    </IconButton>
                                                </Box>
                                            </Hidden>
                                        </Container>
                                    )}
                                    <StyledContainer
                                        maxWidth="sm"
                                        sx={{ justifyContent: forgotPasswordStep !== 0 ? 'center' : 'flex-start' }}
                                    >
                                        <Typography variant="h2" sx={{ mb: 4, fontWeight: 600 }} whiteSpace="pre-line">
                                            {steps[forgotPasswordStep]}
                                        </Typography>
                                        <StepperContent
                                            activeStep={forgotPasswordStep}
                                            contents={[
                                                <ForgotPasswordStep1 key={0} isLoading={sendingEmail} />,
                                                <ForgotPasswordStep2 key={1} email={values.email} />,
                                            ]}
                                        />
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
