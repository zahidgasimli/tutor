import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import CloseIcon from '@mui/icons-material/Close';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HomeIcon from '@mui/icons-material/Home';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import InfoIcon from '@mui/icons-material/Info';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { Box, Button, ButtonBase, Divider, Drawer, Fade, IconButton } from '@mui/material';
import { LanguageMenu } from 'components/language-menu';
import { ThemeSwitch } from 'components/theme-switch';
import { bottombarHeight } from 'config';
import { useAuthStore } from 'context/auth/store';
import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from '../components/logo';
import { LogoutButton } from '../components/logout-button';
import { MenuItems } from '../components/menu-items';
import { Categories } from '../header/categories';
import { useTranslation } from 'react-i18next';

const bottombarItems: Omit<BottombarMenuItem, 'onClick'>[] = [
    {
        title: 'Ana səhifə',
        icon: <HomeOutlinedIcon fontSize="small" />,
        filledIcon: <HomeIcon fontSize="small" />,
        to: '/',
    },
    {
        title: 'Kurslar',
        icon: <AutoStoriesOutlinedIcon fontSize="small" />,
        filledIcon: <AutoStoriesIcon fontSize="small" />,
        to: '/courses',
    },
    {
        title: 'Haqqımızda',
        icon: <InfoOutlinedIcon fontSize="small" />,
        filledIcon: <InfoIcon fontSize="small" />,
        to: '/about-us',
    },
];

export const Bottombar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const openMenu = () => setMenuOpen(true);
    const closeMenu = () => setMenuOpen(false);

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 0,
                width: '100%',
                height: bottombarHeight,
                bgcolor: 'background.paper',
                borderTop: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                zIndex: 1201,
                overflow: 'hidden',
            }}
        >
            {bottombarItems.map((bottombarItem, index) => (
                <BottombarMenuItem key={index} onClick={closeMenu} {...bottombarItem} />
            ))}
            <MoreButton menuOpen={menuOpen} openMenu={openMenu} closeMenu={closeMenu} />
        </Box>
    );
};

export type BottombarMenuItem = {
    title: string;
    icon: ReactNode;
    filledIcon: ReactNode;
    to: string;
    onClick: () => void;
};

export const BottombarMenuItem: React.FC<BottombarMenuItem> = ({ title, icon, filledIcon, to, onClick }) => {
    const { pathname } = useLocation();
    const isActive = pathname.endsWith('/') && pathname !== '/' ? pathname === `${to}/` : pathname === to;
    return (
        <ButtonBase
            sx={{ flex: 1, flexDirection: 'column', color: isActive ? 'primary.main' : 'text.secondary', fontSize: 10 }}
            component={Link}
            to={to}
            onClick={onClick}
        >
            {isActive ? filledIcon : icon}
            <Box mt={0.35}>{title}</Box>
        </ButtonBase>
    );
};

export const MoreButton: React.FC<{ menuOpen: boolean; openMenu: () => void; closeMenu: () => void }> = ({
    menuOpen,
    openMenu,
    closeMenu,
}) => {
    const { t } = useTranslation();
    const user = useAuthStore((state) => state.user);
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

    return (
        <>
            <ButtonBase
                sx={{
                    flex: 1,
                    flexDirection: 'column',
                    color: menuOpen ? 'primary.main' : 'text.secondary',
                    fontSize: 10,
                }}
                onClick={menuOpen ? closeMenu : openMenu}
            >
                {menuOpen ? <MenuOpenIcon fontSize="small" /> : <MenuIcon fontSize="small" />}
                <Box mt={0.35}>Daha çox</Box>
            </ButtonBase>
            <Drawer
                open={menuOpen}
                anchor="right"
                PaperProps={{
                    sx: {
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        paddingBottom: `${bottombarHeight}px`,
                        backgroundImage: 'none',
                    },
                }}
                transitionDuration={300}
            >
                <Fade in={menuOpen} timeout={{ enter: 1000, appear: 1000, exit: 200 }}>
                    <Box flex={1} display="flex" flexDirection="column">
                        <Box display="flex" p={2}>
                            <Logo onAfterClick={closeMenu} />
                            <Box flex={1} display="flex" justifyContent="flex-end">
                                <ThemeSwitch />
                                <Box mx={2}>
                                    <LanguageMenu />
                                </Box>
                                <IconButton onClick={closeMenu} size="small">
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        </Box>
                        <Divider light />
                        <MenuItems onClose={closeMenu} />
                        <Box flex={1} display="flex" flexDirection="column" justifyContent="space-between">
                            <Box>
                                <Divider light />
                                <Categories
                                    sx={{
                                        px: 2.5,
                                    }}
                                    verticalDivider
                                    onCategoryClick={closeMenu}
                                />
                            </Box>
                            <Box>
                                <Divider light />
                                {isLoggedIn ? (
                                    <>
                                        {isLoggedIn && user?.role === 'STUDENT' && (
                                            <Button
                                                variant="contained"
                                                fullWidth
                                                sx={{ borderRadius: 0, textDecoration: 'none' }}
                                                component={Link}
                                                to="/be-an-instructor"
                                                onClick={closeMenu}
                                            >
                                                {t('header:becomeInstructor')}
                                            </Button>
                                        )}
                                        <LogoutButton onLogout={closeMenu} />
                                    </>
                                ) : (
                                    <>
                                        <Button
                                            fullWidth
                                            sx={{ borderRadius: 0, textDecoration: 'none' }}
                                            component={Link}
                                            to="auth/sign-in"
                                            onClick={closeMenu}
                                        >
                                            Daxil ol
                                        </Button>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            sx={{ borderRadius: 0, textDecoration: 'none' }}
                                            component={Link}
                                            to="auth/sign-up"
                                            onClick={closeMenu}
                                        >
                                            Qeydiyyat
                                        </Button>
                                    </>
                                )}
                            </Box>
                        </Box>
                    </Box>
                </Fade>
            </Drawer>
        </>
    );
};
