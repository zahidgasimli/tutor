import { useAuthStore } from 'context/auth/store';
import { memo, Suspense, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { getRouterData } from './router-data';
import { useSettingsStore } from 'context/settings/store';
import { sendWebviewMessage } from 'utils/webview-helper';
import { Spinner } from 'components';
import { Box } from '@mui/material';

const FallbackElement = () => {
    return (
        <Box width="100vw" height="100vh">
            <Spinner />
        </Box>
    );
};

const RouterComponent: React.FC = () => {
    const user = useAuthStore((state) => state.user);
    const theme = useSettingsStore((state) => state.themeType);

    useEffect(() => {
        sendWebviewMessage({ type: 'THEME_CHANGED', value: theme });
    }, [theme]);

    return (
        <Suspense fallback={<FallbackElement />}>
            <RouterProvider
                router={getRouterData({ userRole: user?.role, isCompleted: user?.isCompleted })}
                fallbackElement={<FallbackElement />}
            />
        </Suspense>
    );
};

export const Router = memo(RouterComponent);
