import { Box, Container, Grid, Hidden, Typography, styled } from '@mui/material';
import CountUp from 'react-countup';

export const SuccessSection = () => {
    return (
        <StyledContainer sx={{ pt: { xs: 4, sm: 6, lg: 8 }, pb: { xs: 8, sm: 16 } }}>
            <Grid container spacing={8}>
                <Hidden mdDown>
                    <Grid item md={5} xl={6}>
                        <Box position="relative" height="100%" pl={3}>
                            <img
                                src={require('assets/images/about/bg-dots-gray.svg').default}
                                style={{ position: 'absolute', bottom: -44, right: -12, width: 180, height: 180 }}
                            />
                            <img src={require('assets/images/about/success.png').default} />
                            <Box className="rect-box" />
                        </Box>
                    </Grid>
                </Hidden>
                <Grid item xs={12} md={7} xl={6}>
                    <Typography fontSize={{ xs: 26, sm: 30, md: 36, lg: 42 }} fontWeight={600} mb={3}>
                        Bizim uğur hekayəmiz
                    </Typography>
                    <Typography
                        fontSize={{ xs: 15, sm: 17, lg: 18 }}
                        fontWeight={300}
                        lineHeight={{ xs: '26px', sm: '33px', lg: '32px' }}
                    >
                        Bu gün biz 1000-dən çox mütəxəssisə heç bir reklam xərcləmədən əla iş və karyera fürsəti təqdim
                        edirik və minlərlə istifadəçinin bu yöndə olan bütün ehtiyaclarını həll edirik.
                    </Typography>

                    <Box
                        display="flex"
                        flexDirection={{ xs: 'column', sm: 'row' }}
                        alignItems={{ xs: 'flex-start', sm: 'center' }}
                        mt={4}
                    >
                        <Box mb={{ xs: 2, sm: 0 }} flex={1}>
                            <CountUp
                                start={0}
                                end={560}
                                delay={0}
                                suffix="+"
                                enableScrollSpy
                                scrollSpyDelay={500}
                                scrollSpyOnce
                            >
                                {({ countUpRef }) => (
                                    <div>
                                        <span />
                                        <Typography ref={countUpRef} fontWeight={600} fontSize={40} />
                                    </div>
                                )}
                            </CountUp>

                            <Box width={100} height={1.5} bgcolor="divider" mt={-1} mb={1} />
                            <Typography fontWeight={500}>Müəllimlər</Typography>
                        </Box>
                        <Box mb={{ xs: 2, sm: 0 }} flex={1}>
                            <CountUp
                                start={0}
                                end={235}
                                delay={0}
                                suffix="+"
                                enableScrollSpy
                                scrollSpyDelay={500}
                                scrollSpyOnce
                            >
                                {({ countUpRef }) => (
                                    <div>
                                        <span />
                                        <Typography ref={countUpRef} fontWeight={600} fontSize={40} />
                                    </div>
                                )}
                            </CountUp>
                            <Typography fontWeight={500}>Şagirdlər</Typography>
                        </Box>
                        <Box flex={1}>
                            <CountUp
                                start={0}
                                end={1100}
                                delay={0}
                                suffix="+"
                                enableScrollSpy
                                scrollSpyDelay={500}
                                scrollSpyOnce
                            >
                                {({ countUpRef }) => (
                                    <div>
                                        <span />
                                        <Typography ref={countUpRef} fontWeight={600} fontSize={40} />
                                    </div>
                                )}
                            </CountUp>
                            <Typography fontWeight={500}>Dərslər</Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </StyledContainer>
    );
};

const StyledContainer = styled(Container)(({ theme }) => ({
    '& img': {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        position: 'relative',
        zIndex: 1,
        borderRadius: 8,
    },
    '& .rect-box': theme.unstable_sx({
        zIndex: 0,
        position: 'absolute',
        top: { md: -16, lg: -24 },
        left: 0,
        width: 75,
        height: 120,
        bottom: 100,
        bgcolor: 'primary.main',
        opacity: 0.5,
        borderRadius: theme.spacing(1),
    }),
}));
