import { Box, CircularProgress, CircularProgressProps } from '@mui/material';
import React from 'react';

export const Spinner: React.FC<CircularProgressProps> = ({ color = 'primary', ...props }) => {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" width="100%" height="100%" flex={1}>
            <CircularProgress color={color} size={24} {...props} />
        </Box>
    );
};
