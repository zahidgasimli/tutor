/* eslint-disable react/no-unescaped-entities */
import { FormHelperText, TextField, TextFieldProps } from '@mui/material';
import { FieldProps, getIn, ErrorMessage } from 'formik';
import ReactPhoneInput from 'react-phone-input-mui';

export interface PhoneNumberFieldProps extends FieldProps {
    inputProps?: TextFieldProps;
    countryCodeEditable?: boolean;
    label?: string;
}

export const PhoneNumberField: React.FC<PhoneNumberFieldProps> = ({
    field,
    form,
    inputProps,
    label,
    countryCodeEditable = false,
    ...other
}) => {
    const error = getIn(form.errors, field.name);
    const touched = getIn(form.touched, field.name);

    return (
        <>
            <ReactPhoneInput
                defaultCountry={'az'}
                inputExtraProps={{
                    variant: 'outlined',
                    required: true,
                    fullWidth: true,
                    autoComplete: 'off',
                    error: !!error && touched,
                    onBlur: () => form.setFieldTouched(field.name, true, true),
                    label,
                    ...inputProps,
                }}
                component={TextField}
                name={field.name}
                value={field.value}
                onChange={(value) => {
                    form.setFieldValue(field.name, value, true);
                }}
                onlyCountries={['az', 'tr']}
                countryCodeEditable={countryCodeEditable}
                masks={{ az: '+... (..) ...-..-..', tr: '+.. (...) ...-..-..' }}
                {...other}
            />
            <ErrorMessage
                name={field.name}
                render={(text) => (
                    <FormHelperText variant="filled" error>
                        {text}
                    </FormHelperText>
                )}
            />
        </>
    );
};
