import { IconButton, Tooltip } from '@mui/material';
import { TextField, TextFieldProps } from 'formik-mui';
import React, { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useTranslation } from 'react-i18next';

export const PasswordField: React.FC<TextFieldProps> = ({ InputProps, ...props }) => {
    const { t } = useTranslation('field');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => setPasswordVisible((p) => !p);

    return (
        <TextField
            InputProps={{
                endAdornment: (
                    <Tooltip title={t(passwordVisible ? 'hidePassword' : 'showPassword') || ''}>
                        <IconButton color="primary" onClick={togglePasswordVisibility} tabIndex={-1}>
                            {passwordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                    </Tooltip>
                ),
                ...InputProps,
            }}
            type={passwordVisible ? 'text' : 'password'}
            {...props}
        />
    );
};
