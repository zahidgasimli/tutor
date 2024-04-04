import { LoadingButton } from '@mui/lab';
import { Grid, Typography } from '@mui/material';
import { mobileSize } from 'config';
import { Field } from 'formik';
import { TextField } from 'formik-mui';

export const ForgotPasswordStep1: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
    return (
        <Grid container spacing={{ xs: 2, sm: 2.5 }}>
            <Grid item xs={12} my={{ xs: 2, [mobileSize]: 5 }}>
                <Typography color="textSecondary" maxWidth="40ch">
                    Narahat olmayın, biz sizə sıfırlama təlimatlarını göndərəcəyik
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Field component={TextField} name="email" label="E-poçt" />
            </Grid>

            <Grid item xs={12}>
                <LoadingButton fullWidth variant="contained" type="submit" loading={isLoading} disabled={isLoading}>
                    Şifrəni sıfırlayın
                </LoadingButton>
            </Grid>
        </Grid>
    );
};
