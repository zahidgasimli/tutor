import { LoadingButton } from '@mui/lab';
import { Box, FormHelperText, Grid, Paper, Typography, keyframes } from '@mui/material';
import { RatioBox } from 'components';
import { ErrorMessage, Field } from 'formik';
import { TextField } from 'formik-mui';
import { useRef, useState } from 'react';

const blinking = keyframes`
  0% {
    opacity: 0
  }
  100% {
    opacity: 1;
  }
`;

export const SignUpStep2: React.FC<{ isLoading: boolean; onGoBack: () => void; otp: string; email: string }> = ({
    isLoading,
    onGoBack,
    otp,
    email,
}) => {
    const otpInputRef = useRef<HTMLInputElement>();

    const [inputFocused, setInputFocused] = useState(true);

    return (
        <Grid container spacing={{ xs: 2, sm: 3.5 }}>
            <Grid item xs={12} my={2}>
                <Typography>
                    <strong>{email}</strong> ünvanına mail göndərdik.
                    <br />
                    Aktivləşdirmək üçün e-poçtunuzu yoxlayın.
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={1}>
                    {new Array(6).fill(0).map((_, index) => {
                        const isActive = index === otp.length;
                        const isLastFilled = index === 5 && otp.length === 6;
                        return (
                            <Grid key={index} item xs={2}>
                                <RatioBox ratio={0.75}>
                                    <Paper
                                        sx={{
                                            position: 'relative',
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            cursor: 'text',
                                            borderColor:
                                                (isActive || isLastFilled) && inputFocused ? 'primary.main' : 'divider',
                                        }}
                                        onClick={() => otpInputRef.current?.focus()}
                                        variant="outlined"
                                    >
                                        {(isActive || isLastFilled) && inputFocused && (
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: isLastFilled ? '60%' : '50%',
                                                    transform: 'translate(-50%, -50%)',
                                                    width: '1px',
                                                    height: '40%',
                                                    animation: `${blinking} 1s infinite`,
                                                    backgroundColor: (theme) => (theme.dark ? '#fff' : '#000'),
                                                }}
                                            />
                                        )}
                                        <Typography variant="h6" color="primary">
                                            {otp[index]}
                                        </Typography>
                                    </Paper>
                                </RatioBox>
                            </Grid>
                        );
                    })}
                </Grid>

                <Field
                    component={TextField}
                    name="code"
                    inputRef={otpInputRef}
                    style={{ position: 'absolute', opacity: 0 }}
                    inputProps={{ maxlength: '6' }}
                    autoFocus
                    onFocus={() => setInputFocused(true)}
                    onBlur={() => setInputFocused(false)}
                />
                <ErrorMessage
                    name="code"
                    render={(error) => (
                        <FormHelperText error sx={{ mt: 1 }}>
                            {error}
                        </FormHelperText>
                    )}
                />
            </Grid>
            <Grid item xs={12}>
                <LoadingButton fullWidth variant="contained" type="submit" loading={isLoading} disabled={isLoading}>
                    Təsdiq edin
                </LoadingButton>
            </Grid>
            <Grid item xs={12} my={2}>
                <Typography variant="body2">
                    E-poçtu almamısınız?
                    <br />
                    Spam qovluğunuzu yoxladığınızdan əmin olun.
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Typography sx={{ '& *': { display: 'inline' } }}>
                    Hələ də yoxdur?{' '}
                    <Typography color="info.main" sx={{ cursor: 'pointer' }}>
                        E-poçtu yenidən göndərin
                    </Typography>{' '}
                    və ya{' '}
                    <Typography color="info.main" sx={{ cursor: 'pointer' }} onClick={onGoBack}>
                        E-poçtu dəyişdirin
                    </Typography>
                </Typography>
            </Grid>
        </Grid>
    );
};
