import { Grid, Box, Hidden, Typography, Button } from '@mui/material';
import { Link } from 'components';

export const BeAnInstructorSuccess = () => {
    return (
        <Box flex={1} display="flex" flexDirection="column" bgcolor="info.main">
            <Grid container flex={1}>
                <Hidden mdDown>
                    <Grid item md={6}>
                        <Box height="100%">
                            <img
                                src={require('assets/images/auth/be-an-instructor.png').default}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'right' }}
                            />
                        </Box>
                    </Grid>
                </Hidden>
                <Grid item xs={12} md={6}>
                    <Box
                        height="100%"
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        textAlign="center"
                        px={4}
                    >
                        <Typography variant="h3" mb={3} color="#fff">
                            Təbriklər! Uğurla qeydiyyatdan keçdiniz
                        </Typography>

                        <Typography mb={4} color="#fffb" maxWidth="45ch">
                            Aşağıdakı butona klikliyərək idarəetmə panelinə keçib yeni kurs yarada bilərsiniz
                        </Typography>

                        <Link to="/dashboard">
                            <Button variant="contained">Idarəetmə panelinə keç</Button>
                        </Link>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};
