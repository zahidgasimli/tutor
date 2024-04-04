import {
    Box,
    Container,
    Grid,
    Hidden,
    Step,
    StepLabel,
    Stepper,
    styled,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import { isAxiosError } from 'axios';
import { StepperContent } from 'components';
import { headerHeight, mobileSize } from 'config';
import { useNotifications } from 'context/NotificationsContext';
import { Form, Formik, FormikHelpers } from 'formik';
import useFinishRegister, { FinishRegisterInput } from 'mutations/use-finish-register';
import useRegister, { RegisterInput } from 'mutations/use-register';
import useVerifyCode, { VerifyCodeInput } from 'mutations/use-verify-otp';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { extractErrorMessageFromAxiosError } from 'utils/error-helper';
import { normalizePhoneNumber, phoneNumberSchema } from 'utils/phone-number-helper';
import * as Yup from 'yup';
import { SignUpStep1 } from './components/sign-up-step1';
import { SignUpStep2 } from './components/sign-up-step2';
import { SignUpStep3 } from './components/sign-up-step3';

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

type FormValues = RegisterInput &
    Omit<VerifyCodeInput, 'access' | 'refresh'> &
    FinishRegisterInput & { user_agreement: boolean };

const initialValues: FormValues = {
    email: '',
    password: '',
    confirm_password: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    user_agreement: false,
    code: '',
};

const registerFormSchemaArray = [
    Yup.object().shape({
        email: Yup.string().email('E-poçt yanlış formatdadır').required('E-poçt daxil olunmalıdır'),
        password: Yup.string().min(8, 'Minimum 8 simvol olmalıdır').required('Şifrə daxil olunmalıdır'),
        confirm_password: Yup.string()
            .oneOf([Yup.ref('password')], 'Şifrələr eyni deyil')
            .required('Şifrə daxil olunmalıdır'),
        user_agreement: Yup.bool().oneOf([true], 'Şərtlər qəbul olunmalıdır'),
    }),
    Yup.object().shape({
        code: Yup.string().min(6, 'OTP kod tam daxil olunmalıdır').required('Zəhmət olmasa OTP kodu daxil edin'),
    }),
    Yup.object().shape({
        first_name: Yup.string().required('Ad daxil olunmalıdır'),
        last_name: Yup.string().required('Soyad daxil olunmalıdır'),
        phone_number: phoneNumberSchema.required('Nömrə daxil olunmalıdır'),
    }),
];

const steps = ['Hesabınızı yaradın', 'E-poçtunuzu təsdiqləyin', 'Hesabınızı tamamlayın'];

export const SignUp: React.FC = () => {
    const { notify } = useNotifications();
    const navigate = useNavigate();
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down(mobileSize));

    const { mutateAsync: register, isLoading: registerLoading } = useRegister();
    const { mutateAsync: verifyCode, isLoading: verifyCodeLoading } = useVerifyCode();
    const { mutateAsync: finishRegister, isLoading: finishRegisterLoading } = useFinishRegister();

    const [signUpStep, setSignUpStep] = useState(0);
    const [accessToken, setAccessToken] = useState<string>();

    const registerUser = async ({ email, password, confirm_password }: FormValues) => {
        try {
            const response = await register({ email, password, confirm_password });
            setAccessToken(response.data.access);
            setSignUpStep((p) => p + 1);
        } catch (error) {
            if (isAxiosError(error)) {
                notify({ type: 'error', message: extractErrorMessageFromAxiosError(error) });
            }
        }
    };

    const checkOTPCode = async (code: string) => {
        try {
            if (accessToken) {
                await verifyCode({ code, accessToken });
                setSignUpStep((p) => p + 1);
            }
        } catch (error) {
            if (isAxiosError(error)) {
                notify({ type: 'error', message: extractErrorMessageFromAxiosError(error) });
            }
        }
    };

    const finishRegisterUser = async ({ first_name, last_name, phone_number, email }: FormValues) => {
        if (accessToken) {
            try {
                await finishRegister({
                    first_name,
                    last_name,
                    phone_number: normalizePhoneNumber(phone_number),
                    accessToken,
                });
                notify({
                    type: 'success',
                    message: 'Qeydiyyatdan keçdiniz! Xahiş olunur daxil olun',
                });
                navigate('../sign-in', { state: { email } });
            } catch (error) {
                if (isAxiosError(error)) {
                    notify({ type: 'error', message: extractErrorMessageFromAxiosError(error) });
                }
            }
        }
    };

    const onSubmit = async (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
        try {
            switch (signUpStep) {
                case 0:
                    registerUser(values);
                    break;
                case 1:
                    checkOTPCode(values.code);
                    break;
                case 2:
                    formikHelpers.setSubmitting(true);
                    finishRegisterUser(values);
                    break;
            }
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
                    <Container maxWidth={isMobile ? 'sm' : 'md'}>
                        <Stepper activeStep={signUpStep} sx={{ mt: 4 }}>
                            {steps.map((label, index) => (
                                <Step key={label} completed={index < signUpStep}>
                                    <StepLabel sx={{ '& .MuiStepLabel-label': { fontSize: 11 } }}>
                                        {isMobile ? '' : label}
                                    </StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Container>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        validationSchema={registerFormSchemaArray[signUpStep]}
                    >
                        {({ handleSubmit, values, setFieldValue }) => {
                            return (
                                <Form onSubmit={handleSubmit}>
                                    <StyledContainer maxWidth="sm">
                                        <Typography variant="h2" sx={{ mb: 4, fontWeight: 600 }}>
                                            {steps[signUpStep]}
                                        </Typography>
                                        <StepperContent
                                            activeStep={signUpStep}
                                            contents={[
                                                <SignUpStep1 key={0} isLoading={registerLoading} />,
                                                <SignUpStep2
                                                    key={1}
                                                    isLoading={verifyCodeLoading}
                                                    onGoBack={() => {
                                                        setSignUpStep((p) => p - 1);
                                                        setFieldValue('code', '');
                                                    }}
                                                    otp={values.code}
                                                    email={values.email}
                                                />,
                                                <SignUpStep3 key={2} isLoading={finishRegisterLoading} />,
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
