import GoogleIcon from '@mui/icons-material/Google';
import { LoadingButton } from '@mui/lab';
import useGoogleLoginUrl from 'queries/use-google-login-url';

export const GoogleLoginButton: React.FC = () => {
    const { data: googleLoginUrlData, isLoading: googleLoginUrlLoading } = useGoogleLoginUrl();

    const googleLogin = () => {
        window.open(googleLoginUrlData?.url, '_self');
    };

    return (
        <LoadingButton
            variant="outlined"
            fullWidth
            startIcon={<GoogleIcon />}
            onClick={googleLogin}
            loading={googleLoginUrlLoading}
            disabled={googleLoginUrlLoading}
        >
            Google
        </LoadingButton>
    );
};
