import { Box, Button, Typography } from '@mui/material';
import { isAxiosError } from 'axios';
import { Link, Spinner } from 'components';
import { useAuthStore } from 'context/auth/store';
import { useNotifications } from 'context/NotificationsContext';
import useGoogleLogin from 'mutations/use-google-login';
import { useCallback, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { extractErrorMessageFromAxiosError } from 'utils/error-helper';

export const GoogleLoginCallback = () => {
    const { notify } = useNotifications();
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const signIn = useAuthStore((state) => state.login);
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const decodedParams = Object.fromEntries([...searchParams]);
    const code = decodedParams.code;

    const { mutateAsync: googleLogin, isLoading, isError, error } = useGoogleLogin();

    useEffect(() => {
        (async () => {
            if (code) {
                try {
                    const { data } = await googleLogin({ code });
                    notify({ type: 'success', message: 'Xoş gəlmişsiniz!' });
                    signIn({ accessToken: data.access_token, refreshToken: data.refresh_token });
                } catch (error) {
                    if (isAxiosError(error)) {
                        notify({ type: 'error', message: extractErrorMessageFromAxiosError(error) });
                    }
                }
            }
        })();
    }, [code]);

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/dashboard/');
        }
    }, [isLoggedIn, navigate]);

    const renderContent = useCallback(() => {
        if (isLoading) {
            return <Spinner />;
        }
        if (isError && error) {
            return (
                <>
                    <Typography variant="h4" textAlign="center" mb={3}>
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {(error as any).response.data.message}
                    </Typography>

                    <Link to="/auth/sign-in">
                        <Button variant="contained">Giriş səhifəsinə qayıt</Button>
                    </Link>
                </>
            );
        }
        return (
            <Typography variant="h4" textAlign="center">
                Giriş edilir...
            </Typography>
        );
    }, [isLoading, isError, error]);

    return (
        <Box flex={1} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            {renderContent()}
        </Box>
    );
};
