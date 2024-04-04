import { Box, Grid, Paper, Typography } from '@mui/material';
import { PasswordField } from 'components/formik';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { FormDirtyListener } from '../form-dirty-listener';
import { LoadingButton } from '@mui/lab';
import useChangePassword, { ChangePasswordInput, changePasswordFormSchema } from 'mutations/use-change-password';
import { useNotifications } from 'context/NotificationsContext';
import { isAxiosError } from 'axios';
import { extractErrorMessageFromAxiosError } from 'utils/error-helper';

type ChangePasswordFormProps = {
    onDirtyChange?: (dirty: boolean) => void;
};

export const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({ onDirtyChange }) => {
    const { notify } = useNotifications();
    const { mutateAsync: changePassword, isLoading } = useChangePassword();

    const initialValues: ChangePasswordInput = {
        old_password: '',
        new_password: '',
        confirm_new_password: '',
    };

    const onSubmit = async (values: ChangePasswordInput, helpers: FormikHelpers<ChangePasswordInput>) => {
        try {
            await changePassword(values);
            notify({ type: 'success', message: 'Şifrə uğurla dəyişdirildi!' });
            helpers.resetForm();
        } catch (error) {
            if (isAxiosError(error)) {
                notify({ type: 'error', message: extractErrorMessageFromAxiosError(error) });
            }
            helpers.setSubmitting(false);
        }
    };
    return (
        <Paper sx={{ p: 3 }}>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={changePasswordFormSchema}>
                {({ handleSubmit }) => {
                    return (
                        <Form onSubmit={handleSubmit}>
                            {onDirtyChange && <FormDirtyListener onDirtyChange={onDirtyChange} />}

                            <Grid container spacing={2}>
                                <Grid item xs={12} sx={{ mb: 4 }}>
                                    <Typography variant="h6">Şifrəni dəyiş</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Field component={PasswordField} name="old_password" label="Cari şifrə" />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Field component={PasswordField} name="new_password" label="Yeni şifrə" />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        component={PasswordField}
                                        name="confirm_new_password"
                                        label="Yeni şifrəni təkrarlayın"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Box display="flex" justifyContent="flex-end" mt={3}>
                                        <LoadingButton
                                            fullWidth
                                            variant="contained"
                                            type="submit"
                                            loading={isLoading}
                                            disabled={isLoading}
                                            sx={{ maxWidth: { xs: 'unset', sm: 175 } }}
                                        >
                                            Yadda saxla
                                        </LoadingButton>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Form>
                    );
                }}
            </Formik>
        </Paper>
    );
};
