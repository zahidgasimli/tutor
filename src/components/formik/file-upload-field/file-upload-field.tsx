import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, darken, FormHelperText, lighten, Paper } from '@mui/material';
import { ResponsiveStyleValue } from '@mui/system';
import { imageTypes } from 'config';
import { ErrorMessage, FieldProps, getIn } from 'formik';
import { useRef } from 'react';

export type FileUploadFieldProps = FieldProps & {
    label?: string;
    width: ResponsiveStyleValue<'width'>;
    defaultUrl?: string;
};

export const FileUploadField: React.FC<FileUploadFieldProps> = ({ field, form, label, width = '100%', defaultUrl }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const error = getIn(form.errors, field.name);
    const touched = getIn(form.touched, field.name);

    const openFileSelector = () => inputRef.current?.click();

    const getImageSource = () => {
        if (field.value && typeof field.value !== 'string') {
            return URL.createObjectURL(field.value);
        } else if (defaultUrl) {
            return defaultUrl;
        } else {
            return undefined;
        }
    };

    return (
        <Box display="flex" flexDirection="column" width={width}>
            <Paper
                sx={{
                    overflow: 'hidden',
                    cursor: 'pointer',
                    '& .MuiSvgIcon-root': {
                        transition: '.3s transform',
                    },
                    '& > div:first-of-type': {
                        transition: '.3s filter',
                    },
                    '&:hover': {
                        '& > div:first-of-type': {
                            filter: 'brightness(0.9)',
                        },
                        '& .MuiSvgIcon-root': {
                            transform: 'scale(1.2)',
                        },
                    },
                    ...(touched && !!error ? { borderColor: 'error.main' } : {}),
                }}
                variant="outlined"
                onClick={openFileSelector}
            >
                <Box
                    sx={{
                        position: 'relative',
                        width,
                        aspectRatio: '1',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        bgcolor: (theme) =>
                            theme.dark
                                ? lighten(theme.palette.background.paper, 0.05)
                                : darken(theme.palette.background.paper, 0.1),
                    }}
                >
                    {(defaultUrl || (field.value && typeof field.value !== 'string')) && (
                        <img
                            style={{
                                position: 'absolute',
                                top: '0%',
                                left: '0%',
                                right: '0%',
                                bottom: '0%',
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                            src={getImageSource()}
                        />
                    )}
                    <AddCircleIcon
                        sx={{
                            zIndex: 100,
                            fill: (theme) => theme.palette.divider,
                            stroke: '#fff',
                            strokeWidth: 0.5,
                            fontSize: 24,
                        }}
                    />
                </Box>
                {label && (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            textAlign: 'center',
                            p: 1,
                            color: 'text.secondary',
                            fontSize: 12,
                        }}
                    >
                        {field.value?.name || label}
                    </Box>
                )}
            </Paper>
            <ErrorMessage
                name={field.name}
                render={(message) => (
                    <FormHelperText variant="filled" error>
                        {message}
                    </FormHelperText>
                )}
            />
            <input
                ref={inputRef}
                hidden
                type="file"
                accept={imageTypes.join(', ')}
                onChange={(e) => {
                    form.setFieldValue(field.name, e.target.files?.[0]);
                    e.target.value = '';
                }}
                onBlur={() => form.setFieldTouched(field.name, true, true)}
            />
        </Box>
    );
};
