import { LoadingButton } from '@mui/lab';
import { Box, FormControlLabel, Grid, MenuItem, Paper, Radio, Typography } from '@mui/material';
import { isAxiosError, toFormData } from 'axios';
import { DatePickerField } from 'components/formik';
import { FileUploadField } from 'components/formik/file-upload-field';
import { Spinner } from 'components/spinner';
import { useNotifications } from 'context/NotificationsContext';
import { useAuthStore } from 'context/auth/store';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { RadioGroup, TextField } from 'formik-mui';
import useUpdateInstructorProfile, {
    UpdateInstructorProfileInput,
    updateInstructorProfileFormSchema,
} from 'mutations/use-update-instructor-profile';
import useInstructor from 'queries/use-instructor';
import { InstructorGender } from 'types';
import { toISODate } from 'utils/dateTimeHelper';
import { extractErrorMessageFromAxiosError } from 'utils/error-helper';
import { FormDirtyListener } from '../form-dirty-listener';
import { DateTime } from 'luxon';

const experienceMonths = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const experienceYears = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

export type InstructorPersonalInfoFormProps = {
    onSuccess?: () => void;
    onDirtyChange?: (dirty: boolean) => void;
    confirmButtonLabel?: string;
    checkDirty?: boolean;
};

export const InstructorPersonalInfoForm: React.FC<InstructorPersonalInfoFormProps> = ({
    onSuccess,
    onDirtyChange,
    confirmButtonLabel,
    checkDirty,
}) => {
    const user = useAuthStore((state) => state.user);
    const renewAccessToken = useAuthStore((state) => state.renewAccessToken);
    const { notify } = useNotifications();

    const { data: instructorData, refetch: refetchInstructor, isLoading: instructorLoading } = useInstructor(
        undefined,
        {
            enabled: user?.role === 'INSTRUCTOR',
            retry: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
        },
    );
    const { mutateAsync: updateInstructorProfile, isLoading: profileUpdating } = useUpdateInstructorProfile();

    const instructor = instructorData?.data;

    if (instructorLoading) {
        return <Spinner />;
    }

    if (!user) {
        return null;
    }

    const initialValues: UpdateInstructorProfileInput = {
        first_name: instructor?.first_name || user?.firstName,
        last_name: instructor?.last_name || user?.lastName,
        gender: instructor?.gender || InstructorGender.FEMALE,
        birth_date: instructor?.birth_date ? DateTime.fromISO(instructor.birth_date) : null,
        experience_month: instructor?.experience_month,
        experience_year: instructor?.experience_year,
        image: instructor?.image,
    };

    const onSubmit = async (
        values: UpdateInstructorProfileInput,
        helpers: FormikHelpers<UpdateInstructorProfileInput>,
    ) => {
        try {
            const normalizedValues = {
                ...values,
                birth_date: values.birth_date ? toISODate(values.birth_date) : '',
                image: typeof values.image === 'string' ? undefined : values.image,
            };
            const formData = toFormData(normalizedValues) as FormData;
            await updateInstructorProfile(formData);
            await renewAccessToken();
            notify({ type: 'success', message: 'Profil uğurla yeniləndi!' });
            onSuccess?.();
            if (user?.role === 'INSTRUCTOR') {
                await refetchInstructor();
            }
            helpers.resetForm();
        } catch (err) {
            if (isAxiosError(err)) {
                notify({ type: 'error', message: extractErrorMessageFromAxiosError(err) });
                helpers.setSubmitting(false);
            }
        }
    };

    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={updateInstructorProfileFormSchema}
        >
            {({ handleSubmit, dirty }) => {
                return (
                    <Form onSubmit={handleSubmit}>
                        {onDirtyChange && <FormDirtyListener onDirtyChange={onDirtyChange} />}
                        <Paper sx={{ p: 3 }}>
                            <Grid container spacing={{ xs: 2, sm: 2.5 }}>
                                <Grid item xs={12}>
                                    <Grid container spacing={{ xs: 6, sm: 2.5 }}>
                                        <Grid item xs={12} sm={4}>
                                            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                                <Field
                                                    component={FileUploadField}
                                                    label="Əlavə edin"
                                                    name="image"
                                                    defaultUrl={instructor?.image || user.avatarUrl}
                                                    width={{ xs: 170, sm: '100%' }}
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={8}>
                                            <Grid container spacing={{ xs: 2, sm: 2.5 }}>
                                                <Grid item xs={12}>
                                                    <Field component={TextField} name="first_name" label="Ad" />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Field component={TextField} name="last_name" label="Soyad" />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Field component={RadioGroup} name="gender" row>
                                                        <Paper sx={{ mr: 2 }} variant="outlined">
                                                            <FormControlLabel
                                                                sx={{ pr: 2, m: 0 }}
                                                                value={InstructorGender.FEMALE}
                                                                control={<Radio disableRipple />}
                                                                label="Qadın"
                                                            />
                                                        </Paper>
                                                        <Paper variant="outlined">
                                                            <FormControlLabel
                                                                sx={{ pr: 2, m: 0 }}
                                                                value={InstructorGender.MALE}
                                                                control={<Radio disableRipple />}
                                                                label="Kişi"
                                                            />
                                                        </Paper>
                                                    </Field>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <Grid container spacing={{ xs: 2, sm: 2.5 }}>
                                        <Grid item xs={12}>
                                            <Field
                                                component={DatePickerField}
                                                label="Doğum tarixi"
                                                name="birth_date"
                                                format="dd/MM/yyyy"
                                                openTo="year"
                                                views={['year', 'month', 'day']}
                                                disableFuture
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="h6" color="primary">
                                                Təcrübə
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Field
                                                component={TextField}
                                                label="İl"
                                                name="experience_year"
                                                variant="outlined"
                                                select
                                            >
                                                {experienceYears.map((year) => (
                                                    <MenuItem key={year} value={year}>
                                                        {year}
                                                    </MenuItem>
                                                ))}
                                            </Field>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Field
                                                component={TextField}
                                                label="Ay"
                                                name="experience_month"
                                                variant="outlined"
                                                select
                                            >
                                                {experienceMonths.map((month) => (
                                                    <MenuItem key={month} value={month}>
                                                        {month}
                                                    </MenuItem>
                                                ))}
                                            </Field>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box display="flex" justifyContent="flex-end">
                                        <LoadingButton
                                            fullWidth
                                            variant="contained"
                                            type="submit"
                                            loading={profileUpdating}
                                            disabled={profileUpdating || (checkDirty && !dirty)}
                                            sx={{ maxWidth: { xs: 'unset', sm: 175 } }}
                                        >
                                            {confirmButtonLabel || 'Növbəti'}
                                        </LoadingButton>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Form>
                );
            }}
        </Formik>
    );
};
