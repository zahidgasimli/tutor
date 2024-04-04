import { FormHelperText, lighten, styled } from '@mui/material';
import { ErrorMessage, FieldProps } from 'formik';
import React from 'react';
import ReactQuill from 'react-quill';
import { ReactQuillProps } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules = {
    toolbar: [['bold', 'italic', 'underline', 'strike', 'link'], [{ list: 'ordered' }, { list: 'bullet' }], ['clean']],
    clipboard: {
        matchVisual: false,
    },
};

const formats = ['bold', 'underline', 'strike', 'italic', 'list', 'link'];

export const RichTextEditorField: React.FC<FieldProps & ReactQuillProps> = ({ field, form, ...props }) => {
    return (
        <Container>
            <ReactQuill
                key={field.name}
                preserveWhitespace
                theme="snow"
                modules={modules}
                formats={formats}
                value={field.value}
                defaultValue={field.value}
                onBlur={() => form.setFieldTouched(field.name, true)}
                onChange={(content, _, __, editor) => {
                    if (!editor.getText().trim()) {
                        form.setFieldValue(field.name, '');
                    } else {
                        form.setFieldValue(field.name, content);
                    }
                }}
                {...props}
            />
            <ErrorMessage
                name={field.name}
                render={(error) => (
                    <FormHelperText variant="filled" error>
                        {error}
                    </FormHelperText>
                )}
            />
        </Container>
    );
};

const Container = styled('div')(({ theme }) => {
    const color = !theme.dark ? '#424242' : '#FFF';
    const borderColor = !theme.dark ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)';
    const borderColorHover = !theme.dark ? '#000' : '#e6e5e8';
    const boxShadow = !theme.dark ? 'rgba(255,255,255,0.23)' : 'rgba(0,0,0,0.23)';
    return {
        position: 'relative',
        '& a': {
            color: 'unset',
        },
        '& .bem': {
            marginTop: 6,
        },
        '& #tab-panel, & #tab-toolbar': {
            backgroundColor: lighten(theme.palette.background.paper, 0.05),
        },
        '& .ql-editor.ql-blank::before': {
            ...theme.typography.body1,
            fontStyle: 'normal',
            color: theme.palette.text.secondary,
        },
        '& .ql-stroke': {
            stroke: color,
        },
        '& .ql-fill': {
            fill: color,
        },
        '& .ql-picker-label': {
            border: 'none !important',
        },
        '& .ql-picker-label::before': {
            color,
        },
        '& .ql-picker-item:hover': {
            '&::before': {
                color: theme.palette.primary.main,
            },
        },
        '& .ql-picker': {
            '& *': {
                border: 'none',
                outline: 'none',
            },
        },
        '& .ql-tooltip': {
            left: '0px !important',
            backgroundColor: theme.palette.background.default,
            boxShadow: `0px 0px 4px 0px ${boxShadow}`,
            border: 'none',
            color: theme.palette.text.primary,
            '& *': {
                outline: 'none',
            },
            '& input': {
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                borderRadius: theme.shape.borderRadius,
                borderColor,
            },
        },
        '& .ql-toolbar button:hover': {
            '& .ql-stroke': {
                stroke: theme.palette.primary.main,
            },
            '& .ql-fill': {
                fill: theme.palette.primary.main,
            },
            '& .ql-picker-label::before': {
                color: theme.palette.primary.main,
            },
        },
        '& .ql-picker-label:hover': {
            '& .ql-stroke': {
                stroke: `${theme.palette.primary.main} !important`,
            },
            '&::before': {
                color: `${theme.palette.primary.main} !important`,
            },
        },
        '& .ql-active .ql-stroke': {
            stroke: `${theme.palette.primary.main} !important`,
        },
        '& .ql-active .ql-fill': {
            fill: `${theme.palette.primary.main} !important`,
        },
        '& .ql-active .ql-picker-label::before ': {
            color: `${theme.palette.primary.main} !important`,
        },
        '& .ql-toolbar': {
            borderTopLeftRadius: theme.shape.borderRadius,
            borderTopRightRadius: theme.shape.borderRadius,
            transition: '.2s border-color',
            borderColor,
            '& .MuiSvgIcon-root': {
                fill: theme.palette.text.primary,
                '&:hover': {
                    fill: theme.palette.primary.main,
                },
            },
        },
        '& .ql-container': {
            borderBottomLeftRadius: theme.shape.borderRadius,
            borderBottomRightRadius: theme.shape.borderRadius,
            transition: '.2s border-color',
            borderColor,
        },
        '& .ql-editor': {
            minHeight: 250,
            maxHeight: 400,
            fontSize: '16px',
        },
        '& input': {
            fontSize: '16px !important',
        },
        '&:hover': {
            '& .ql-toolbar': {
                borderColor: borderColorHover,
            },
            '& .ql-container': {
                borderColor: borderColorHover,
            },
        },
    };
});
