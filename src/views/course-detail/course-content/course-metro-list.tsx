import { Box, Paper, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { createSx } from 'theme';
import { Metro } from 'types';

export type CourseMetroListProps = { address_metros: Metro[] };

export const CourseMetroList: React.FC<CourseMetroListProps> = ({ address_metros }) => {
    const { t } = useTranslation();
    const sx = makeSx();
    return (
        <Box sx={sx.root}>
            {address_metros.map((address, index) => (
                <Paper variant="outlined" key={index} sx={sx.container}>
                    <img
                        src={require('assets/images/metro.png').default}
                        style={{ width: 15, height: 15, objectFit: 'contain' }}
                    />
                    <Typography ml={1} color="primary" variant="body2" fontWeight={500}>
                        {t(`enum:Metro_${address}`)}
                    </Typography>
                </Paper>
            ))}
        </Box>
    );
};

const makeSx = createSx(() => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        mb: -1.5,
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        px: 1.5,
        py: 1,
        mr: 1.5,
        mb: 1.5,
        borderColor: 'primary.main',
        transition: '.3s transform',
        '&:hover': {
            transform: 'scale(1.05)',
        },
    },
}));
