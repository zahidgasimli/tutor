import { useNotifications } from 'context/NotificationsContext';
import { useAuthStore } from 'context/auth/store';
import { useConfirmStore } from 'context/confirm/store';
import { useTranslation } from 'react-i18next';
import { MenuItem } from './menu-items';
import { useLocation, useNavigate } from 'react-router-dom';

export const LogoutButton: React.FC<{ onLogout?: () => void }> = ({ onLogout }) => {
    const logout = useAuthStore((state) => state.logout);
    const { notify } = useNotifications();
    const getConfirmation = useConfirmStore((state) => state.open);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const onLogOut = (): void => {
        getConfirmation({
            type: 'error',
            title: t('confirm-dialog:logoutTitle'),
            description: t('confirm-dialog:logoutDescription'),
            onConfirm: () => {
                logout();
                notify({
                    type: 'success',
                    message: t('header:logout'),
                });
                if (pathname.includes('/dashboard/')) {
                    navigate('/auth/sign-in');
                }
                onLogout?.();
            },
        });
    };

    return (
        <MenuItem color="error" sx={{ justifyContent: 'center' }} fullWidth onClick={onLogOut}>
            Hesabdan çıxış
        </MenuItem>
    );
};
