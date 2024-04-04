import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Box, Container, styled, Tab, Tabs, Theme, useMediaQuery } from '@mui/material';
import { Link } from 'components';
import { useAuthStore } from 'context/auth/store';
import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

type MenuItem = {
    label: string;
    path: string;
    icon: ReactNode;
};

const studentMenuItems: MenuItem[] = [
    { label: 'Dərslər', path: '/dashboard/courses', icon: <AutoStoriesOutlinedIcon /> },
    { label: 'Hesabım', path: '/dashboard/account', icon: <PersonOutlineIcon /> },
    { label: 'Ödəniş', path: '/dashboard/payments', icon: <CreditCardOutlinedIcon /> },
];

const instructorMenuItems: MenuItem[] = [
    { label: 'Dərslər', path: '/dashboard/courses', icon: <AutoStoriesOutlinedIcon /> },
    { label: 'Nəzarət paneli', path: '/dashboard/control-panel', icon: <SettingsOutlinedIcon /> },
    { label: 'Hesabım', path: '/dashboard/account', icon: <PersonOutlineIcon /> },
    // { label: 'Ödəniş', path: '/dashboard/payments', icon: <CreditCardOutlinedIcon /> },
];

const StyledTab = styled(Tab)(({ theme }) => {
    return {
        padding: 0,
        textTransform: 'none',
        [theme.breakpoints.down('sm')]: {
            minWidth: 'unset',
        },
        '& a': {
            width: '100%',
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff',
            padding: theme.spacing(2),
        },
        '& svg': {
            marginRight: theme.spacing(1.5),
            [theme.breakpoints.down('sm')]: {
                marginRight: 0,
            },
        },
    };
});

export const DashboardMenu = () => {
    const user = useAuthStore((state) => state.user);
    const { pathname } = useLocation();
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

    if (!user) return null;
    const currentMenuItems = user.isInstructor ? instructorMenuItems : studentMenuItems;

    const activePathnameIndex = currentMenuItems.findIndex((item) => pathname.includes(item.path));

    return (
        <Box sx={{ bgcolor: 'primary.main' }}>
            <Container maxWidth="xl">
                <Tabs
                    sx={{ mx: -2 }}
                    textColor="inherit"
                    variant={isMobile ? 'fullWidth' : 'scrollable'}
                    value={activePathnameIndex}
                >
                    {currentMenuItems.map((item, index) => (
                        <StyledTab
                            key={index}
                            label={
                                <Link to={item.path}>
                                    {item.icon}
                                    {!isMobile && item.label}
                                </Link>
                            }
                            value={index}
                        />
                    ))}
                </Tabs>
            </Container>
        </Box>
    );
};
