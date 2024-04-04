import { Box, Button, Container, styled, Theme, Typography, useMediaQuery } from '@mui/material';
import { Link } from 'components';
import { Header, Bottombar } from 'components/layout';

const StyledContainer = styled(Container)(({ theme }: { theme: Theme }) => {
    return {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        '& .not-found-header': {
            backgroundColor: 'transparent',
        },
        '& .not-found-image': {
            width: 300,
            zIndex: 1,
            [theme.breakpoints.down('sm')]: {
                width: 200,
            },
        },
        '& .not-found-blob': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
        },
        '& .not-found-text': {
            textAlign: 'center',
            marginTop: theme.spacing(6),
            zIndex: 1,
        },
        '& .not-found-button': {
            marginTop: theme.spacing(6),
            zIndex: 1,
        },
    };
});

export const NotFound = () => {
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    return (
        <Box>
            <StyledContainer>
                {!isMobile && <Header className="not-found-header" />}
                <img src={require('assets/images/404.png').default} className="not-found-image" />
                <img src={require('assets/images/404-blob.svg').default} className="not-found-blob" />
                <Typography variant="h2" className="not-found-text" color="error">
                    Təəssüf ki, axtardığınız səhifə tapılmadı
                </Typography>
                <Link to={-1 as never}>
                    <Button className="not-found-button" variant="contained" color="error">
                        Əvvəlki səhifəyə qayıt
                    </Button>
                </Link>
                {isMobile && <Bottombar />}
            </StyledContainer>
        </Box>
    );
};
