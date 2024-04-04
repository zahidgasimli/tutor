import { Box, Container, Typography, alpha, styled } from '@mui/material';

export const HeroSection = () => {
    return (
        <Root>
            <Box position="relative">
                <img src={require('assets/images/about/team-hero.png').default} className="about-hero-image" />
                <Box className="about-hero-content">
                    <Container maxWidth={false} sx={{ maxWidth: { xs: 300, sm: 425, md: 550, lg: 700 } }}>
                        <Typography
                            component="h1"
                            fontSize={{ xs: 20, sm: 28, md: 36, lg: 48 }}
                            fontWeight={600}
                            mb={{ xs: 4, sm: 6, md: 8, lg: 10 }}
                        >
                            TutorAz komandası ilə daha yaxından tanış olun
                        </Typography>
                    </Container>
                    <Container maxWidth={false} sx={{ maxWidth: { xs: 400, sm: 600, md: 800, lg: 950 } }}>
                        <Typography component="p" fontSize={{ xs: 14, sm: 17, md: 20, lg: 24 }}>
                            Əsas hədəfimiz insanlara düzgün müəllimlərini tapmaqda, onlarla əlaqələr qurmaqla insanların
                            hər hansısa bir mövzuda peşəkarlaşmasında və ya xarici dillərdə sərbəst danışmasına kömək
                            etmək.
                        </Typography>
                    </Container>
                </Box>
            </Box>
        </Root>
    );
};

const Root = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(3),
    '& .about-hero-image': {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        minHeight: 300,
        borderRadius: 80,
        [theme.breakpoints.down('sm')]: {
            borderRadius: 20,
        },
    },
    '& .about-hero-content': {
        position: 'absolute',
        inset: 0,
        backgroundColor: alpha(theme.palette.primary.main, 0.5),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: '#fff',
    },
}));
