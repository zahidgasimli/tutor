import { LoadingButton } from '@mui/lab';
import { Box, FormHelperText, Grid, Typography } from '@mui/material';
import { Link, PasswordField } from 'components';
import { ErrorMessage, Field } from 'formik';
import { Checkbox, TextField } from 'formik-mui';
import { GoogleLoginButton } from 'views/auth/components';

export const SignUpStep1: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
    return (
        <Grid container spacing={{ xs: 2, sm: 2.5 }}>
            <Grid item xs={12}>
                <Field component={TextField} name="email" label="E-poçt" />
            </Grid>
            <Grid item xs={12}>
                <Field component={PasswordField} name="password" label="Şifrə" />
            </Grid>
            <Grid item xs={12}>
                <Field component={PasswordField} name="confirm_password" label="Şifrəni təkrarlayın" />
            </Grid>
            <Grid item xs={12}>
                <Box display="flex">
                    <Box>
                        <Field component={Checkbox} name="user_agreement" type="checkbox" />
                    </Box>
                    <Typography variant="body2" sx={{ '& *': { display: 'inline' }, ml: 1 }}>
                        Hesab yaratmaqla siz{' '}
                        <Typography color="info.main" variant="body2" sx={{ cursor: 'pointer' }}>
                            İstifadəçi Müqaviləsi
                        </Typography>{' '}
                        və{' '}
                        <Typography color="info.main" variant="body2" sx={{ cursor: 'pointer' }}>
                            Məxfilik Siyasətimizlə
                        </Typography>{' '}
                        razılaşırsınız.
                    </Typography>
                </Box>
                <ErrorMessage
                    name="user_agreement"
                    render={(error) => (
                        <FormHelperText variant="filled" error>
                            {error}
                        </FormHelperText>
                    )}
                />
            </Grid>
            <Grid item xs={12}>
                <LoadingButton fullWidth variant="contained" type="submit" loading={isLoading} disabled={isLoading}>
                    Hesab yaradın
                </LoadingButton>
            </Grid>
            <Grid item xs={12}>
                <GoogleLoginButton />
            </Grid>
            <Grid item xs={12}>
                <Typography display="flex">
                    Artıq bir hesabınız var mı? &nbsp;
                    <Link to="../sign-in" style={{ width: 'fit-content' }}>
                        <Typography color="info.main"> Daxil olun</Typography>
                    </Link>
                </Typography>
            </Grid>
        </Grid>
    );
};
