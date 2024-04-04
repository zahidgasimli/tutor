import { Box, Container, Typography } from '@mui/material';
import { createSx } from 'theme';

export const TeachersSection: React.FC = () => {
    const sx = makeSx();

    return (
        <Box py={{ xs: 4, sm: 6, lg: 8 }}>
            <Typography variant="h3" textAlign="center" sx={sx.title}>
                Müəllimlər
            </Typography>
            <Box px={2}>
                <Container sx={sx.imageContainer}>
                    <Box position="relative" draggable="false">
                        <img src={require('assets/images/about/teachers.png').default} />
                        <Box sx={sx.quoteContainer}>
                            <Typography fontWeight={600} mb={{ xs: 0.25, sm: 1, md: 1.5, lg: 2 }}>
                                Rocky Dixon
                            </Typography>
                            <Typography>
                                “tutor.az-dakı xüsusiyyətlər komandamızın işini daha sürətli və asan edir”
                            </Typography>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

const makeSx = createSx(() => {
    return {
        title: {
            mb: 5,
        },
        imageContainer: {
            pointerEvents: 'none',
            userSelect: 'none',
            msUserSelect: 'none',
            MozUserSelect: 'none',
            '& img': {
                width: '100%',
                height: '100%',
            },
        },
        quoteContainer: {
            position: 'absolute',
            top: '28%',
            left: '50%',
            width: '40%',
            height: '26.5%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            px: { xs: 1, sm: 2, md: 3, lg: 4 },
            '& p': {
                fontSize: { xs: 8, sm: 8, md: 12, lg: 16 },
                color: '#000',
            },
            '& p:last-of-type': {
                fontSize: { xs: 6, sm: 8, md: 12, lg: 16 },
            },
        },
    };
});
