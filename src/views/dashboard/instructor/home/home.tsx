import { Box, Button, styled, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { useAuthStore } from 'context/auth/store';

const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    backgroundColor: theme.palette.background.default,
}));

export const Home: React.FC = () => {
    const accessToken = useAuthStore((state) => state.accessToken);
    const renewAccessToken = useAuthStore((state) => state.renewAccessToken);
    return (
        <Root>
            <Button onClick={renewAccessToken}>Refresh token</Button>
            {accessToken}
            <Typography>Hello Student</Typography>
        </Root>
    );
};
