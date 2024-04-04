import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Container, Grid, Hidden, Typography } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { createSx } from 'theme';

export const HeroSection: React.FC = () => {
    const sx = makeSx();
    const { t } = useTranslation('home');
    const navigate = useNavigate();

    const initialValues = { query: '' };

    const onSubmit = (values: typeof initialValues) => {
        navigate(`/courses?query=${values.query}`);
    };

    return (
        <Box mt={{ xs: 2, sm: 4 }} mb={{ xs: 2, sm: 8 }}>
            <Container>
                <Box
                    bgcolor="primary.main"
                    borderRadius={{ xs: 2, sm: 4 }}
                    px={{ xs: 4, sm: 8 }}
                    display="flex"
                    minHeight={{ xs: '400px', sm: '60vh' }}
                >
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Box height="100%" display="flex" flexDirection="column" justifyContent="center">
                                <Typography variant="h1" sx={sx.title} color="#fff" whiteSpace="pre">
                                    {t('heroTitle')}
                                </Typography>

                                <Typography sx={sx.description} color="#fffd">
                                    {t('heroDescription')}
                                </Typography>

                                <Box>
                                    <Formik initialValues={initialValues} onSubmit={onSubmit}>
                                        {({ handleSubmit }) => (
                                            <Form onSubmit={handleSubmit}>
                                                <Box sx={sx.fieldContainer}>
                                                    <Field
                                                        component={TextField}
                                                        name="query"
                                                        placeholder="Search your favorite course"
                                                        sx={sx.field}
                                                    />
                                                    <Hidden smDown>
                                                        <Button
                                                            color="info"
                                                            variant="contained"
                                                            type="submit"
                                                            sx={sx.button}
                                                        >
                                                            <SearchIcon />
                                                        </Button>
                                                    </Hidden>
                                                </Box>
                                            </Form>
                                        )}
                                    </Formik>
                                </Box>
                            </Box>
                        </Grid>
                        <Hidden mdDown>
                            <Grid item xs={12} md={6}>
                                <Box display="flex" pt={6} pr={{ md: 2, lg: 8 }} height="100%">
                                    <img
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'contain',
                                            objectPosition: 'bottom',
                                        }}
                                        src={require('assets/images/home/home-1.png').default}
                                        alt="hero image"
                                    />
                                </Box>
                            </Grid>
                        </Hidden>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
};

const makeSx = createSx(() => ({
    title: {
        lineHeight: { xs: '42px', sm: '56px' },
        fontSize: { xs: 32, sm: 48 },
    },
    description: {
        maxWidth: '43ch',
        mt: 3,
        mb: 6,
    },
    fieldContainer: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'background.paper',
        borderRadius: 1,
        overflow: 'hidden',
    },
    field: {
        '& fieldset': {
            border: 'none',
        },
    },
    button: {
        height: 56,
        borderRadius: 0,
    },
}));
