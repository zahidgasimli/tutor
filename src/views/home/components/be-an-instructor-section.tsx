import { Avatar, Box, Button, Container, styled, Theme, Typography } from '@mui/material';
import { Link } from 'components';
import { useTranslation } from 'react-i18next';
import { createSx } from 'theme';

export const BeAnInstructorSection: React.FC = () => {
    const sx = makeSx();
    const { t } = useTranslation('home');
    return (
        <Box sx={sx.root}>
            <Container>
                <Typography variant="h2" textAlign="center" sx={sx.title}>
                    {t('wantToBeATeacher')}
                </Typography>
            </Container>
            <Box px={2}>
                <Container sx={sx.imageContainer}>
                    <PersonAvatar
                        src={require('assets/images/person/person-1.png').default}
                        sx={{ width: '10%', aspectRatio: '1', left: '5%', top: 0 }}
                    />
                    <PersonAvatar
                        src={require('assets/images/person/person-2.png').default}
                        sx={{ width: '8%', left: 8, bottom: 0 }}
                    />
                    <PersonAvatar
                        src={require('assets/images/person/person-3.png').default}
                        sx={{ width: '7%', right: '8%', top: -20 }}
                    />
                    <PersonAvatar
                        src={require('assets/images/person/person-4.png').default}
                        sx={{ width: '13%', right: 8, top: '40%' }}
                    />
                    <PersonAvatar
                        src={require('assets/images/person/person-5.png').default}
                        sx={{ width: '8%', right: '4%', bottom: -20 }}
                    />
                    <img
                        src={require('assets/images/person/person-main.png').default}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            maxWidth: '70%',
                            zIndex: 1,
                        }}
                    />
                    <img
                        src={require('assets/images/home/bg-dots-red.svg').default}
                        style={{
                            position: 'absolute',
                            top: '30%',
                            right: '13%',
                            width: '30%',
                        }}
                    />
                    <img
                        src={require('assets/images/home/bg-dots-green.svg').default}
                        style={{
                            position: 'absolute',
                            left: '13%',
                            bottom: 0,
                            width: '30%',
                        }}
                    />
                </Container>
                <Box display="flex" justifyContent="center" mt={8}>
                    <Link to="/be-an-instructor" style={{ width: '100%', maxWidth: 400 }}>
                        <Button variant="contained" fullWidth>
                            {t('beATeacher')}
                        </Button>
                    </Link>
                </Box>
            </Box>
        </Box>
    );
};

const makeSx = createSx(() => {
    return {
        root: {
            py: { xs: 9, sm: 16 },
        },
        title: {
            mb: 7,
        },
        imageContainer: {
            position: 'relative',
            aspectRatio: '1.8',
        },
        button: {
            maxWidth: 400,
        },
    };
});

const PersonAvatar = styled(Avatar)(({ theme }: { theme: Theme }) => {
    return {
        position: 'absolute',
        boxShadow: `0px 5px 7px 0px ${theme.dark ? 'rgb(255 255 255 / 10%)' : 'rgb(0 0 0 / 10%)'}`,
        zIndex: 2,
        height: 'unset',
        aspectRatio: '1',
        minWidth: 60,
        transition: '.3s',
        '&:hover': {
            transform: 'scale(1.3)',
        },
        [theme.breakpoints.down('xl')]: {
            '&:hover': {
                transform: 'scale(1.1)',
            },
        },
        [theme.breakpoints.down('sm')]: {
            minWidth: 55,
        },
    };
});
