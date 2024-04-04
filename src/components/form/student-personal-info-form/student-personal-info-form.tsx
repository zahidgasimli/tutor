import { LoadingButton } from '@mui/lab';
import { Box, Grid, Paper, Tooltip } from '@mui/material';
import { isAxiosError, toFormData } from 'axios';
import { PhoneNumberField, Spinner } from 'components';
import { FileUploadField } from 'components/formik/file-upload-field';
import { useNotifications } from 'context/NotificationsContext';
import { useAuthStore } from 'context/auth/store';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { TextField } from 'formik-mui';
import { omit } from 'lodash';
import useUpdateStudentProfile, {
    UpdateStudentProfileInput,
    updateStudentProfileFormSchema,
} from 'mutations/use-update-student-profile';
import useStudent from 'queries/use-student';
import { extractErrorMessageFromAxiosError } from 'utils/error-helper';
import { FormDirtyListener } from '../form-dirty-listener';
import { formatPhoneNumber, normalizePhoneNumber } from 'utils/phone-number-helper';

export type StudentPersonalInfoFormProps = { onDirtyChange?: (dirty: boolean) => void };

export const StudentPersonalInfoForm: React.FC<StudentPersonalInfoFormProps> = ({ onDirtyChange }) => {
    const renewAccessToken = useAuthStore((state) => state.renewAccessToken);
    const { notify } = useNotifications();
    const { data: studentData, refetch: refetchStudent, isLoading } = useStudent();
    const { mutateAsync: updateStudentProfile, isLoading: profileUpdating } = useUpdateStudentProfile();

    const student = studentData?.data;

    if (isLoading) {
        return <Spinner />;
    }

    if (!student) return null;

    const initialValues: UpdateStudentProfileInput & { email: string } = {
        first_name: student.first_name,
        last_name: student.last_name,
        email: student.email,
        phone_number: formatPhoneNumber(student.phone_number),
        address: student.address || '',
        image: undefined,
    };

    const onSubmit = async (values: typeof initialValues, helpers: FormikHelpers<typeof initialValues>) => {
        try {
            const normalizedValues = {
                ...omit(values, 'email'),
                phone_number: normalizePhoneNumber(values.phone_number),
            };
            const formData = toFormData(normalizedValues) as FormData;
            await updateStudentProfile(formData);
            await renewAccessToken();
            notify({ type: 'success', message: 'Profil uğurla yeniləndi!' });
            await refetchStudent();
            helpers.resetForm();
        } catch (err) {
            if (isAxiosError(err)) {
                notify({ type: 'error', message: extractErrorMessageFromAxiosError(err) });
                helpers.setSubmitting(false);
            }
        }
    };

    return (
        <Paper sx={{ p: 3 }}>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={updateStudentProfileFormSchema}
            >
                {({ handleSubmit }) => {
                    return (
                        <Form onSubmit={handleSubmit}>
                            {onDirtyChange && <FormDirtyListener onDirtyChange={onDirtyChange} />}
                            <Grid
                                container
                                spacing={{ xs: 4, lg: 2 }}
                                flexDirection={{ xs: 'column-reverse', lg: 'row' }}
                            >
                                <Grid item xs={12} lg={8.5}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6}>
                                            <Field component={TextField} label="Ad" name="first_name" />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Field component={TextField} label="Soyad" name="last_name" />
                                        </Grid>
                                        <Tooltip
                                            title="Emailinizi dəyişmək üçün texniki dəstək ilə əlaqə saxlayın"
                                            PopperProps={{ sx: { textAlign: 'center' } }}
                                        >
                                            <Grid item xs={12} sm={6}>
                                                <Field
                                                    component={TextField}
                                                    label="Email adresi"
                                                    name="email"
                                                    disabled
                                                />
                                            </Grid>
                                        </Tooltip>
                                        <Grid item xs={12} sm={6}>
                                            <Field
                                                component={PhoneNumberField}
                                                label="Telefon nömrəsi"
                                                name="phone_number"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field component={TextField} label="Ünvan" name="address" />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <LoadingButton
                                                type="submit"
                                                variant="contained"
                                                loading={profileUpdating}
                                                disabled={profileUpdating}
                                            >
                                                Yadda saxla
                                            </LoadingButton>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} lg={3.5}>
                                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                        <Field
                                            component={FileUploadField}
                                            label="Profil şəkli əlavə edin"
                                            name="image"
                                            defaultUrl={student.image}
                                            width={{ xs: 170, lg: '100%' }}
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Form>
                    );
                }}
            </Formik>
        </Paper>
    );
};
