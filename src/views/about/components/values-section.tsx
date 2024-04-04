import { Box, Container, Grid, Hidden, Typography, styled } from '@mui/material';

export const ValuesSection = () => {
    return (
        <StyledContainer sx={{ py: { xs: 4, sm: 6, lg: 8 } }}>
            <Grid container spacing={8}>
                <Hidden mdDown>
                    <Grid item md={4} lg={5} xl={6}>
                        <Box position="relative" height="100%">
                            <img src={require('assets/images/about/values.png').default} />
                            <Box className="border-box" />
                        </Box>
                    </Grid>
                </Hidden>
                <Grid item xs={12} md={8} lg={7} xl={6}>
                    <Typography fontSize={{ xs: 26, sm: 30, md: 36, lg: 42 }} fontWeight={600} mb={3}>
                        Sizə qatdığımız dəyər
                    </Typography>
                    <Typography
                        fontSize={{ xs: 15, sm: 17, lg: 18 }}
                        fontWeight={300}
                        lineHeight={{ xs: '26px', sm: '33px', lg: '32px' }}
                    >
                        Ətrafınızda dolaşmadan və ya tanıdığınız insanlardan soruşmadan ən yaxşı müəllimləri tapmaq üçün
                        bir yol olmalıdır! Bu böyük ehtiyacdan başlayaraq, platformamız texnologiyası, keyfiyyətli
                        mütəxəssisləri və real müştəri rəyləri sayəsində sürətlə böyüdü. Bizim platformamızdan şagird
                        kimi yararlanmaq istəyirsinizsə sadəcə seçdiyiniz müəllimə müraciət göndərirsiniz və sonrasında
                        istəyivizdən asılı olaraq online görüş təyin edib şagird və müəllim arasında fikir mübadiləsi
                        aparılaraq razılaşma əldə edirik. Biz sizin təhsil aldığınız müddətdə sizin kefiyyətli təhsil
                        almağınız üçün əlimizdən gələni edirik və indi tam müraciət etməyinizin vaxtıdır!
                    </Typography>
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
    '& .border-box': theme.unstable_sx({
        zIndex: 0,
        position: 'absolute',
        top: { md: -16, lg: -24 },
        left: { md: 24, lg: 40 },
        right: { md: 24, lg: 40 },
        bottom: 100,
        borderWidth: { md: 5, lg: 10 },
        borderStyle: 'solid',
        borderColor: 'primary.main',
        borderRadius: theme.spacing(1),
    }),
}));
