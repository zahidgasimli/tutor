import { CssBaseline, styled, Theme, useMediaQuery } from '@mui/material';
import { Header, Bottombar, Footer } from 'components/layout';
import { bottombarHeight, headerHeight, mobileHeaderHeight } from 'config';
import { useLayoutStore } from 'context/layout/store';
import { Outlet, ScrollRestoration } from 'react-router-dom';

const Root = styled('div')(({ theme }: { theme: Theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
        paddingBottom: bottombarHeight,
    },
    '& .main-wrapper': {
        display: 'flex',
        height: '100%',
        flex: '1 1 auto',
        paddingTop: headerHeight,
        [theme.breakpoints.down('md')]: {
            paddingTop: mobileHeaderHeight,
        },
        [theme.breakpoints.down('sm')]: {
            paddingTop: 0,
        },
    },
    '& .content': {
        width: '100%',
        flex: '1 1 auto',
    },
    '& .main': {
        display: 'flex',
        flexDirection: 'column',
        minHeight: `calc(100vh - ${headerHeight}px)`,
        [theme.breakpoints.down('md')]: {
            minHeight: `calc(100vh - ${mobileHeaderHeight}px)`,
        },
        [theme.breakpoints.down('sm')]: {
            minHeight: `calc(100vh - ${bottombarHeight}px)`,
        },
    },
}));

export const AppLayout: React.FC = () => {
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const footerShown = useLayoutStore((state) => state.footerShown);
    return (
        <Root>
            <CssBaseline />
            {!isMobile && <Header />}
            <div className="main-wrapper">
                <div className="content">
                    <div className="main">
                        <Outlet />
                    </div>
                </div>
            </div>
            {footerShown && <Footer />}
            {isMobile && <Bottombar />}
            <ScrollRestoration
                getKey={(location) => {
                    const paths = ['/'];
                    return paths.includes(location.pathname) ? location.pathname : location.key;
                }}
            />
        </Root>
    );
};
