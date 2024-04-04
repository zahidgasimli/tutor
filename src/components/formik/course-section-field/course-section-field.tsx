import { Box, FormHelperText, Paper } from '@mui/material';
import { FieldProps, getIn } from 'formik';
import { CourseSection } from 'queries/types';
import {
    CourseSectionField as CourseSectionSelector,
    CourseSectionFieldProps as CourseSectionSelectorProps,
} from '../../form/course-section-field';

export type CourseSectionFieldProps = Omit<CourseSectionSelectorProps, 'value' | 'onChange' | 'onBlur'> &
    FieldProps<CourseSection[]>;

export const CourseSectionField: React.FC<CourseSectionFieldProps> = ({ field, form, readonly, ...props }) => {
    const error: string | { start_time?: string; end_time?: string }[] | undefined = getIn(form.errors, field.name);
    const touched = getIn(form.touched, field.name);

    return (
        <Box>
            <Paper
                variant="outlined"
                sx={[
                    { bgcolor: 'transparent' },
                    touched && !!error ? { borderColor: 'error.main' } : { border: 'none' },
                ]}
            >
                <CourseSectionSelector
                    readonly={readonly}
                    {...props}
                    value={field.value}
                    onChange={(value) => form.setFieldValue(field.name, value)}
                    onBlur={() => form.setFieldTouched(field.name, true)}
                    error={error}
                />
            </Paper>
            {typeof error === 'string' && touched && (
                <FormHelperText variant="filled" error>
                    {error}
                </FormHelperText>
            )}
        </Box>
    );
};
