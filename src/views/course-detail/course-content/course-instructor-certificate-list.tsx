import { Box, Grid, Paper, Typography } from '@mui/material';
import { Lightbox, RatioBox } from 'components';
import { useState } from 'react';
import { createSx } from 'theme';
import { InstructorCertificate } from 'types';

export type CourseInstructorCertificateListProps = { certificates: InstructorCertificate[] };

export const CourseInstructorCertificateList: React.FC<CourseInstructorCertificateListProps> = ({ certificates }) => {
    return (
        <Grid container spacing={3}>
            {certificates.map((certificate) => (
                <Grid key={certificate.id} item xs={12} sm={4} lg={3}>
                    <CourseInstructorCertificateListItem certificate={certificate} />
                </Grid>
            ))}
        </Grid>
    );
};

export const CourseInstructorCertificateListItem: React.FC<{ certificate: InstructorCertificate }> = ({
    certificate,
}) => {
    const sx = makeSx();

    const [lightboxOpen, setLightboxOpen] = useState(false);

    const openLightbox = () => setLightboxOpen(true);
    const closeLightbox = () => setLightboxOpen(false);
    return (
        <Box>
            <Paper elevation={2} sx={sx.certificateItem} onClick={openLightbox}>
                <RatioBox ratio={9 / 16}>
                    <img src={certificate.file} />
                </RatioBox>
                <Box p={2}>
                    <Typography variant="body2" fontWeight={500} textAlign="center">
                        {certificate.name}
                    </Typography>
                </Box>
            </Paper>
            {lightboxOpen && (
                <Lightbox mainSrc={certificate.file} imageTitle={certificate.name} onCloseRequest={closeLightbox} />
            )}
        </Box>
    );
};

const makeSx = createSx(() => ({
    certificateItem: {
        overflow: 'hidden',
        cursor: 'pointer',
        '& img': {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: '.3s transform, .3s filter',
        },
        '&:hover img': {
            transform: 'scale(1.05)',
            filter: 'brightness(80%)',
        },
    },
}));
