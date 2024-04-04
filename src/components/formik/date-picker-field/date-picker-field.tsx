import { TextFieldProps } from '@mui/material';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers';
import { FieldProps, getIn } from 'formik';
import { DateTime } from 'luxon';

export interface DatePickerFieldProps
    extends FieldProps,
        Omit<DatePickerProps<DateTime>, 'name' | 'value' | 'onChange'> {
    normalize?: (value: DateTime) => DateTime;
    placeholder?: TextFieldProps['placeholder'];
    TextFieldProps?: TextFieldProps;
}

export const DatePickerField: React.FC<DatePickerFieldProps> = ({ field, form, placeholder, ...other }) => {
    const currentError = getIn(form.touched, field.name) && getIn(form.errors, field.name);

    return (
        <DatePicker
            value={field.value}
            format="dd.MM.yyyy"
            onChange={(date: DateTime | null) => form.setFieldValue(field.name, date, true)}
            slotProps={{
                textField: {
                    inputProps: { placeholder },
                    helperText: currentError,
                    error: Boolean(currentError),
                    sx: {
                        caretColor: 'transparent',
                    },
                    ...{ readOnly: true },
                },
            }}
            {...other}
        />
    );
};
