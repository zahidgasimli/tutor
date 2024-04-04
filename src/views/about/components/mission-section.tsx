import { Box, Container, Grid, Hidden, Typography, styled } from '@mui/material';

export const MissionSection = () => {
    return (
        <StyledContainer sx={{ py: { xs: 4, sm: 6, lg: 8 } }}>
            <Grid container spacing={8}>
                <Grid item xs={12} md={7}>
                    <Typography fontSize={{ xs: 26, sm: 30, md: 36, lg: 42 }} fontWeight={600}>
                        Missiyamız nədir?
                    </Typography>
                    <Box width={100} height={1.5} bgcolor="divider" mb={{ xs: 3, sm: 5 }} />
                    <Typography
                        fontSize={{ xs: 15, sm: 17, lg: 18 }}
                        fontWeight={300}
                        lineHeight={{ xs: '26px', sm: '33px', lg: '32px' }}
                    >
                        Razısınızmı ki, təhsil pis müəllimlərə dözməmək üçün çox vacibdir! Bunu bizimlə dəyişmək üçün
                        istək və həvəsiniz varmı? O zaman bizim Azərbaycanda fəth kampaniyamıza siz də qoşulun və indi
                        müraciət edin! Tutor Az platfomasında bizim missiyamızı yerinə yetirmək üçün hər gün həvəslə
                        çalışırıq. Biz #1 local məktəb qururuq! Niyə? Çünki biz istəyirik ki, bir gün Azərbaycanda hər
                        bir uşağa ən yaxşı müəllimlərdən sərfəli və ruhlandırıcı dərslər vasitəsilə öz potensialını tam
                        şəkildə inkişaf etdirə bilsin. Məqsədimiz uzunmüddətli öyrənmə uğurunu təmin etməkdir -
                        tələbələrimiz üçün öz müqəddəratını təyin edən gələcək üçün!
                    </Typography>
                </Grid>
                <Hidden mdDown>
                    <Grid item md={5}>
                        <Grid container position="relative">
                            <img
                                src={require('assets/images/about/bg-dots-gray.svg').default}
                                style={{ position: 'absolute', top: 0, right: 24, width: 180, height: 180 }}
                            />
                            <img
                                src={require('assets/images/about/bg-dots-gray.svg').default}
                                style={{ position: 'absolute', bottom: 8, left: -38, width: 180, height: 180 }}
                            />
                            <Grid item xs={6} sx={{ paddingRight: 3, paddingBottom: 0.25 }}>
                                <img
                                    src={require('assets/images/about/mission-1.png').default}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6} sx={{ paddingTop: 6, paddingBottom: 3 }}>
                                <img
                                    src={require('assets/images/about/mission-2.png').default}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        objectPosition: 'right',
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4} sx={{ paddingLeft: 1, paddingBottom: 8 }}>
                                <img
                                    src={require('assets/images/about/mission-3.png').default}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        objectPosition: 'right',
                                    }}
                                />
                            </Grid>
                            <Grid item xs={8} sx={{ paddingLeft: 2 }}>
                                <img
                                    src={require('assets/images/about/mission-4.png').default}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Hidden>
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
    '& .border-box': {
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
    },
}));
