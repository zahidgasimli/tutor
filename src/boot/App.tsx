import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { NotificationsProvider } from 'context/NotificationsContext';
import { useSettingsStore } from 'context/settings/store';
import 'i18n';
import { useEffect } from 'react';
import { Router } from 'routes';
import smoothscroll from 'smoothscroll-polyfill';
import customTheme from 'theme';
import { ConfirmDialog } from 'components';

const App: React.FC = () => {
    const themeType = useSettingsStore((state) => state.themeType);
    const muiTheme = customTheme(themeType);

    useEffect(smoothscroll.polyfill, []);

    return (
        <LocalizationProvider dateAdapter={AdapterLuxon}>
            <ThemeProvider theme={muiTheme}>
                <NotificationsProvider>
                    <CssBaseline />
                    <ConfirmDialog />
                    <Router />
                </NotificationsProvider>
            </ThemeProvider>
        </LocalizationProvider>
    );
};

export default App;
