import {
    AppBar,
    AppBarProps,
    Box,
    Button,
    Container,
    ContainerProps,
    Hidden,
    Typography,
    styled,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import { LanguageMenu, Link, PulsingButton, ThemeSwitch } from 'components';
import { LinkProps } from 'components/link';
import { headerHeight, mobileHeaderHeight, mobileSize } from 'config';
import { useAuthStore } from 'context/auth/store';
import { useLayoutStore } from 'context/layout/store';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Logo } from '../components/logo';
import { Categories } from './categories';
import { HeaderProfile } from './header-profile';

const Root = styled(AppBar)(({ theme }: { theme: Theme }) => {
    return {
        backgroundColor: theme.palette.background.default,
        transition: '.3s',
        '& .header': {
            display: 'flex',
            alignItems: 'center',
            transition: '.3s',
        },
        '& .logo-button': {
            marginRight: theme.spacing(3),
            [theme.breakpoints.down(950)]: {
                marginRight: theme.spacing(1),
            },
        },
        '& .sign-up': {
            marginLeft: theme.spacing(2),
        },
        '& .header-icon': {
            marginRight: theme.spacing(2),
            color: theme.palette.text.secondary,
        },
    };
});

export const Header: React.FC<AppBarProps & { maxWidth?: ContainerProps['maxWidth'] }> = ({
    style,
    maxWidth,
    ...props
}) => {
    const { t } = useTranslation('header');
    const user = useAuthStore((state) => state.user);
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const headerWidth = useLayoutStore((state) => state.headerWidth);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down(mobileSize));

    const [scrolledDown, setScrolledDown] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 10) {
            setScrolledDown(true);
        } else {
            setScrolledDown(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <Root
            elevation={0}
            style={{ boxShadow: scrolledDown ? '0 0 6px 0 rgba(0,0,0,.12)' : 'none', ...style }}
            {...props}
        >
            <Container
                className="header"
                maxWidth={maxWidth || headerWidth}
                sx={{
                    height: { xs: mobileHeaderHeight, [mobileSize]: scrolledDown ? mobileHeaderHeight : headerHeight },
                }}
            >
                <Logo className="logo-button" />

                <Box display="flex" justifyContent="space-between" alignItems="center" flexGrow={1} pl={1} pr={3}>
                    <Box display="flex" alignItems="center">
                        <Hidden lgDown>
                            <Categories />
                        </Hidden>
                        <Box ml={{ sm: 0, md: 2 }}>
                            <HeaderLink to="/about-us" title={t('aboutUs')} />
                        </Box>
                    </Box>
                    <Box display="flex">
                        <Hidden mdDown>
                            <HeaderLink to="/courses" title={t('courses')} />
                        </Hidden>
                    </Box>
                </Box>

                <Box display="flex" alignItems="center">
                    {isLoggedIn && user?.role === 'STUDENT' && (
                        <Link to="/be-an-instructor">
                            <PulsingButton size="small" variant="contained">
                                {t('becomeInstructor')}
                            </PulsingButton>
                        </Link>
                    )}
                    <Box ml={2}>
                        <ThemeSwitch />
                    </Box>
                    <Box ml={2}>
                        <LanguageMenu />
                    </Box>
                    <Box ml={2}>
                        {isLoggedIn ? (
                            <HeaderProfile />
                        ) : (
                            <>
                                <Link to="auth/sign-in">
                                    <Button
                                        size={isMobile ? 'small' : 'medium'}
                                        variant={isMobile ? 'contained' : 'text'}
                                    >
                                        {t('login')}
                                    </Button>
                                </Link>
                                <Hidden mdDown>
                                    <Link to="auth/sign-up" className="sign-up">
                                        <Button variant="contained">{t('register')}</Button>
                                    </Link>
                                </Hidden>
                            </>
                        )}
                    </Box>
                </Box>
            </Container>
        </Root>
    );
};

const HeaderLink: React.FC<LinkProps & { title: React.ReactNode | string }> = ({ title, ...props }) => {
    return (
        <Link {...props}>
            <Typography
                fontWeight={500}
                variant="body2"
                sx={{
                    transition: '.3s',
                    '&:hover': {
                        color: 'primary.main',
                    },
                }}
            >
                {title}
            </Typography>
        </Link>
    );
};
