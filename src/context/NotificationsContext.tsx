/* eslint-disable @typescript-eslint/no-empty-function */
import { SnackbarProps } from '@mui/material';
import { Snackbar } from 'components/snackbar';
import { SnackbarType } from 'components/snackbar/snackbar';
import { createContext, ReactNode, useContext, useState } from 'react';

type NotifyType = {
    duration?: number | null;
    message?: string;
    type: SnackbarType;
};

type NotificationsContextProps = {
    notify: ({ duration, message, type }: NotifyType) => void;
    close: () => void;
};

const NotificationsContext = createContext<NotificationsContextProps>({
    notify: () => {},
    close: () => {},
});
export const useNotifications = (): NotificationsContextProps =>
    useContext<NotificationsContextProps>(NotificationsContext);

const DEFAULT_SNACK_STATE: NotifyType & { open: boolean } = {
    open: false,
    duration: 6000,
    message: '',
    type: 'success' as SnackbarType,
};

export const NotificationsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [snack, setSnackState] = useState(DEFAULT_SNACK_STATE);

    const notify = ({ duration, message, type }: NotifyType): void => {
        const newState = {
            open: true,
            duration: duration || 6000,
            type: type || 'info',
            message,
        };
        setSnackState(newState);
    };

    const close = (): void => setSnackState((prev) => ({ ...prev, open: false }));

    const onClose: SnackbarProps['onClose'] = (_, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        close();
    };

    return (
        <NotificationsContext.Provider value={{ notify, close }}>
            {children}

            <Snackbar {...snack} onClose={onClose} />
        </NotificationsContext.Provider>
    );
};
