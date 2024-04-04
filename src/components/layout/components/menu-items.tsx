import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import { Avatar, Box, Button, Divider, Typography, styled } from '@mui/material';
import { Link } from 'components';
import { useAuthStore } from 'context/auth/store';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

export type MenuItem = {
    name: string;
    description?: string;
    icon: React.ReactNode;
    route: string;
    divider?: boolean;
    disableArrow?: boolean;
};

export const MenuItem = styled(Button)(() => {
    return {
        justifyContent: 'flex-start',
        borderRadius: 0,
        height: 'unset',
        minHeight: 48,
        maxHeight: 56,
        '& .profile-menu-arrow': {
            transform: 'translateX(32px)',
            opacity: 0,
            transition: '.3s',
        },
        '&:hover': {
            '& .profile-menu-arrow': {
                transform: 'translateX(16px)',
                opacity: 1,
            },
        },
    };
});

export const MenuItems: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { t } = useTranslation();
    const user = useAuthStore((state) => state.user);
    const { pathname } = useLocation();

    const insturctorMenuItems: MenuItem[] = useMemo(
        () => [
            {
                name: user?.fullName ?? '',
                description: t(`enum:ROLE_${user?.role}`),
                route: '/dashboard/account',
                icon: <Avatar sx={{ width: 20, height: 20 }} src={user?.avatarUrl} />,
                divider: true,
                disableArrow: true,
            },
            {
                name: 'Dərslərim',
                route: '/dashboard/courses',
                icon: <AutoStoriesOutlinedIcon />,
            },
            {
                name: 'Nəzarət paneli',
                route: '/dashboard/control-panel',
                icon: <SettingsOutlinedIcon />,
            },
            // {
            //     name: 'Ödənişlərim',
            //     route: '/dashboard/payments',
            //     icon: <CreditCardOutlinedIcon />,
            // },
        ],
        [user],
    );

    const studentMenuItems: MenuItem[] = useMemo(
        () => [
            {
                name: user?.fullName ?? '',
                description: t(`enum:ROLE_${user?.role}`),
                route: '/dashboard/account',
                icon: <Avatar sx={{ width: 20, height: 20 }} src={user?.avatarUrl} />,
                divider: true,
                disableArrow: true,
            },
            {
                name: 'Dərslərim',
                route: '/dashboard/courses',
                icon: <AutoStoriesOutlinedIcon />,
            },
            {
                name: 'Ödənişlərim',
                route: '/dashboard/payments',
                icon: <CreditCardOutlinedIcon />,
            },
        ],
        [user],
    );

    if (!user) return null;
    const currentMenuItems = user.isInstructor ? insturctorMenuItems : studentMenuItems;

    return (
        <>
            {currentMenuItems.map((menuItem, index) => {
                return (
                    <>
                        <Link to={menuItem.route} key={index} style={{ width: '100%' }}>
                            <MenuItem
                                startIcon={menuItem.icon}
                                onClick={onClose}
                                color="inherit"
                                fullWidth
                                sx={{ color: pathname.includes(menuItem.route) ? 'primary.main' : 'text.secondary' }}
                            >
                                <Divider orientation="vertical" flexItem sx={{ mr: 2, ml: 1 }} />
                                <Box>
                                    <Typography variant="body2" fontWeight={500}>
                                        {menuItem.name}
                                    </Typography>
                                    {menuItem.description && (
                                        <Typography fontSize={12} width="fit-content">
                                            {menuItem.description}
                                        </Typography>
                                    )}
                                </Box>
                                {!menuItem.disableArrow && (
                                    <Box flex={1} display="flex" justifyContent="flex-end">
                                        <KeyboardArrowRightIcon className="profile-menu-arrow" />
                                    </Box>
                                )}
                            </MenuItem>
                        </Link>
                        {menuItem.divider && <Divider light />}
                    </>
                );
            })}
        </>
    );
};
