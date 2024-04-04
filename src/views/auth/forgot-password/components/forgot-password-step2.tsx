import { CheckCircle } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

export const ForgotPasswordStep2: React.FC<{
    email: string;
}> = ({ email }) => {
    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <CheckCircle color="success" sx={{ fontSize: 100 }} />
            <Typography mt={6}>
                Parolunuzu sıfırlamaq üçün <strong>{email}</strong> ünvanına link göndərdik. Link yalnız növbəti 24 saat
                ərzində etibarlıdır.
            </Typography>
        </Box>
    );
};
