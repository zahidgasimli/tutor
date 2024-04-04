import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';
import { PhoneNumberField } from 'components';
import { Field } from 'formik';
import { TextField } from 'formik-mui';

export const SignUpStep3: React.FC<{ isLoading: boolean; submitButtonLabel?: string }> = ({
    isLoading,
    submitButtonLabel = 'Hesab yaradın',
}) => {
    return (
        <Grid container spacing={{ xs: 2, sm: 2.5 }}>
            <Grid item xs={12}>
                <Field component={TextField} name="first_name" label="Ad" />
            </Grid>
            <Grid item xs={12}>
                <Field component={TextField} name="last_name" label="Soyad" />
            </Grid>
            <Grid item xs={12}>
                <Field component={PhoneNumberField} name="phone_number" label="Telefon nömrəsi" />
            </Grid>
            <Grid item xs={12}>
                <LoadingButton fullWidth variant="contained" type="submit" loading={isLoading} disabled={isLoading}>
                    {submitButtonLabel}
                </LoadingButton>
            </Grid>
        </Grid>
    );
};
