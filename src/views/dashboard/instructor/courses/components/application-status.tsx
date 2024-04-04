import { alpha, Box, Typography } from '@mui/material';
import { StudentApplicationStatus } from 'queries/use-student-applications';
import { useTranslation } from 'react-i18next';
import { createSx } from 'theme';

export const getApplicationStatusTextColor = (status: StudentApplicationStatus) => {
    if (status === StudentApplicationStatus.APPLIED) return 'success.light';
    if (status === StudentApplicationStatus.ENROLLED) return 'primary.main';
    if (status === StudentApplicationStatus.WAITING) return 'warning.light';
    return 'error.main';
};

export const getApplicationStatusBGColor = (status: StudentApplicationStatus) => {
    const opacity = 0.24;
    if (status === StudentApplicationStatus.APPLIED) return alpha('#4caf50', opacity);
    if (status === StudentApplicationStatus.ENROLLED) return alpha('#155577', opacity);
    if (status === StudentApplicationStatus.WAITING) return alpha('#ff9800', opacity);
    return alpha('#d32f2f', opacity);
};

type ApplicationStatusProps = {
    status: StudentApplicationStatus;
};

export const ApplicationStatus: React.FC<ApplicationStatusProps> = ({ status }) => {
    const { t } = useTranslation('enum');
    const sx = makeSx({ status });

    return (
        <Box bgcolor={getApplicationStatusBGColor(status)} sx={sx.root}>
            <Typography sx={{ ...sx.text, color: getApplicationStatusTextColor(status) }}>{t(status)}</Typography>
        </Box>
    );
};

const makeSx = createSx(() => {
    return {
        root: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: (theme) => theme.spacing(0.5, 2.5),
            borderRadius: 50,
            width: '100%',
        },
        text: {
            color: '#fff',
            fontSize: 14,
            fontWeight: 500,
        },
    };
});
