import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';
import { PasswordField } from 'components';
import { Field } from 'formik';

export const ForgotPasswordStep3: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
    return (
        <Grid container spacing={{ xs: 2, sm: 2.5 }}>
            <Grid item xs={12}>
                <Field component={PasswordField} name="new_password" label="Yeni şifrə" />
            </Grid>
            <Grid item xs={12}>
                <Field component={PasswordField} name="confirm_new_password" label="Yeni şifrəni təkrarlayın" />
            </Grid>
            <Grid item xs={12}>
                <LoadingButton fullWidth variant="contained" type="submit" loading={isLoading} disabled={isLoading}>
                    Şifrəni dəyişdirin
                </LoadingButton>
            </Grid>
        </Grid>
    );
};
