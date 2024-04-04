import { Box, Container, Grid, styled, Theme, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { createSx } from 'theme';

export const InfoSection: React.FC = () => {
    const sx = makeSx();
    const { t } = useTranslation('home');

    const infoData = useMemo(
        () => [
            {
                title: t('info1Title'),
                description: t('info1Description'),
                icon: require('assets/teacher.svg').default,
            },
            {
                title: t('info2Title'),
                description: t('info2Description'),
                icon: require('assets/student.svg').default,
            },
            {
                title: t('info3Title'),
                description: t('info3Description'),
                icon: require('assets/book.svg').default,
            },
        ],
        [t],
    );

    return (
        <Box sx={sx.root}>
            <Container>
                <Grid container spacing={3}>
                    {infoData.map((info, index) => (
                        <Grid key={index} item xs={12} sm={4}>
                            <InfoItem>
                                <IconContainer>
                                    <img src={info.icon} alt={`info icon ${info.title}`} width={56} height={56} />
                                </IconContainer>
                                <Typography sx={sx.infoItemTitle}>{info.title}</Typography>
                                <Typography sx={sx.infoItemDescription}>{info.description}</Typography>
                            </InfoItem>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

const makeSx = createSx(() => {
    return {
        root: {
            bgcolor: 'primary.main',
            pb: 3,
        },
        infoItemTitle: (theme) => ({
            ...theme.typography.h6,
            color: '#fff',
            mt: 3,
        }),
        infoItemDescription: {
            color: '#DADADA',
            mt: 2,
        },
    };
});

const InfoItem = styled(Box)(({ theme }: { theme: Theme }) => {
    return {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: theme.spacing(3),
    };
});

const IconContainer = styled(Box)(({ theme }: { theme: Theme }) => {
    return {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(1.5),
        width: 84,
        height: 84,
    };
});
