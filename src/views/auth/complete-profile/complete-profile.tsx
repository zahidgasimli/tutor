import { Box, Container, Typography, styled } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { isAxiosError } from 'axios';
import { headerHeight, mobileSize } from 'config';
import { useNotifications } from 'context/NotificationsContext';
import { useAuthStore } from 'context/auth/store';
import { Form, Formik, FormikHelpers } from 'formik';
import useFinishRegister, { FinishRegisterInput } from 'mutations/use-finish-register';
import { extractErrorMessageFromAxiosError } from 'utils/error-helper';
import { normalizePhoneNumber, phoneNumberSchema } from 'utils/phone-number-helper';
import * as Yup from 'yup';
import { SignUpStep3 } from '../sign-up/components/sign-up-step3';

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

const completeProfileFormSchema = Yup.object().shape({
    first_name: Yup.string().required('Ad daxil olunmalıdır'),
    last_name: Yup.string().required('Soyad daxil olunmalıdır'),
    phone_number: phoneNumberSchema.required('Nömrə daxil olunmalıdır'),
});

export const CompleteProfile: React.FC = () => {
    const { notify } = useNotifications();
    const { mutateAsync: finishRegister, isLoading: finishRegisterLoading } = useFinishRegister();

    const accessToken = useAuthStore((state) => state.accessToken);
    const renewAccessToken = useAuthStore((state) => state.renewAccessToken);
    const user = useAuthStore((state) => state.user);

    const initialValues: FinishRegisterInput = {
        first_name: user?.firstName || '',
        last_name: user?.lastName || '',
        phone_number: '',
    };

    const onSubmit = async (
        { first_name, last_name, phone_number }: FinishRegisterInput,
        formikHelpers: FormikHelpers<FinishRegisterInput>,
    ) => {
        try {
            if (accessToken) {
                await finishRegister({
                    first_name,
                    last_name,
                    phone_number: normalizePhoneNumber(phone_number),
                    accessToken,
                });
                await renewAccessToken();
                notify({
                    type: 'success',
                    message: 'Hesabınızı uğurla tamamladınız. Xoş gəlmişsiniz!',
                });
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
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={completeProfileFormSchema}>
                {({ handleSubmit }) => {
                    return (
                        <Form onSubmit={handleSubmit}>
                            <StyledContainer maxWidth="sm">
                                <Typography variant="h2" sx={{ mb: 4, fontWeight: 600 }}>
                                    Hesabınızı tamamlayın
                                </Typography>
                                <SignUpStep3
                                    key={2}
                                    isLoading={finishRegisterLoading}
                                    submitButtonLabel="Hesabı tamamlayın"
                                />
                            </StyledContainer>
                        </Form>
                    );
                }}
            </Formik>
        </Box>
    );
};
