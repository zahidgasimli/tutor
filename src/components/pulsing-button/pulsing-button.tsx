import { Box, Button, ButtonProps } from '@mui/material';
import { pulse } from 'utils/animations';

export const PulsingButton: React.FC<ButtonProps> = ({ children, ...props }) => {
    return (
        <Box
            sx={{
                position: 'relative',
                '&::before': {
                    content: "''",
                    position: 'absolute',
                    bgcolor: 'info.main',
                    animation: `${pulse(1)} 1.5s linear infinite;`,
                },
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    '&::before': {
                        content: "''",
                        position: 'absolute',
                        bgcolor: 'primary.main',
                        animation: `${pulse(1.5)} 1.5s linear infinite;`,
                    },
                }}
            >
                <Button {...props}>{children}</Button>
            </Box>
        </Box>
    );
};
