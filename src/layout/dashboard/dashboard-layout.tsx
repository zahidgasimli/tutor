import { Box, CssBaseline, styled, Theme, useMediaQuery } from '@mui/material';
import { Bottombar, Footer, Header } from 'components/layout';
import { bottombarHeight, headerHeight, mobileHeaderHeight, mobileSize } from 'config';
import { useAuthStore } from 'context/auth/store';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { DashboardMenu } from './dashboard-menu';
import { useLayoutStore } from 'context/layout/store';

const Root = styled('div')(({ theme }: { theme: Theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    [theme.breakpoints.down('sm')]: {
        paddingBottom: bottombarHeight,
    },
    '& .main-wrapper': {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        paddingTop: headerHeight,
        [theme.breakpoints.down(mobileSize)]: {
            paddingTop: mobileHeaderHeight,
        },
        [theme.breakpoints.down('sm')]: {
            paddingTop: 0,
        },
    },
    '& .content': {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    '& .main': {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        minHeight: `calc(100vh - ${headerHeight}px)`,
        [theme.breakpoints.down(mobileSize)]: {
            minHeight: `calc(100vh - ${mobileHeaderHeight}px)`,
        },

        [theme.breakpoints.down('sm')]: {
            minHeight: `calc(100vh - ${bottombarHeight}px)`,
        },
    },
}));

export const DashboardLayout = () => {
    const user = useAuthStore((state) => state.user);
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const footerShown = useLayoutStore((state) => state.footerShown);
    if (!user) return null;
    return (
        <Root>
            <CssBaseline />
            {!isMobile && <Header maxWidth="xl" />}
            <div className="main-wrapper">
                <div className="content">
                    <div className="main">
                        <DashboardMenu />
                        <Box display="flex" flexDirection="column" flex={1} py={3}>
                            <Outlet />
                        </Box>
                    </div>
                </div>
            </div>
            {isMobile && <Bottombar />}
            {footerShown && <Footer />}
            <ScrollRestoration
                getKey={(location) => {
                    const paths = ['/'];
                    return paths.includes(location.pathname) ? location.pathname : location.key;
                }}
            />
        </Root>
    );
};
