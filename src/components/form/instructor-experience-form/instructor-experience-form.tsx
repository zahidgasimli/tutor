import { LoadingButton } from '@mui/lab';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { isAxiosError, toFormData } from 'axios';
import { Spinner } from 'components/spinner';
import { useNotifications } from 'context/NotificationsContext';
import { useAuthStore } from 'context/auth/store';
import { Form, Formik, FormikHelpers } from 'formik';
import { DateTime } from 'luxon';
import useUpdateInstructorExperience, {
    UpdateInstructorExperienceInput,
    updateInstructorExperienceFormSchema,
} from 'mutations/use-update-instructor-experience';
import useInstructor from 'queries/use-instructor';
import { ReactNode } from 'react';
import { toISODate } from 'utils/dateTimeHelper';
import { extractErrorMessageFromAxiosError } from 'utils/error-helper';
import { FormDirtyListener } from '../form-dirty-listener';
import { InstructorCertificatesField } from './instructor-certificates-field';
import { InstructorEducationsField } from './instructor-educations-field';
import { InstructorJobsField } from './instructor-jobs-field';

export type InstructorExperienceFormProps = {
    onSuccess?: () => void;
    onDirtyChange?: (dirty: boolean) => void;
    actions?: ReactNode[];
    confirmButtonLabel?: string;
    emptyInitialValues?: boolean;
    checkDirty?: boolean;
};

export const InstructorExperienceForm: React.FC<InstructorExperienceFormProps> = ({
    actions,
    confirmButtonLabel,
    onSuccess,
    onDirtyChange,
    emptyInitialValues,
    checkDirty,
}) => {
    const user = useAuthStore((state) => state.user);
    const { notify } = useNotifications();

    const { data: instructorData, refetch: refetchInstructor, isLoading: instructorLoading } = useInstructor(
        undefined,
        {
            enabled: user?.role === 'INSTRUCTOR' && !emptyInitialValues,
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            retry: false,
        },
    );
    const {
        mutateAsync: updateInstructorExperience,
        isLoading: instructorExperienceUpdating,
    } = useUpdateInstructorExperience();

    const instructor = instructorData?.data;

    if (instructorLoading && !emptyInitialValues) {
        return <Spinner />;
    }

    if (!instructor && !emptyInitialValues) {
        return null;
    }

    // CURRENT INSTRUCTOR INFORMATIONS
    const instructorEducations =
        instructor?.educations.map((education) => ({
            ...education,
            start_date: DateTime.fromISO(education.start_date),
            end_date: education.end_date ? DateTime.fromISO(education.end_date) : null,
        })) || [];
    const instructorJobs =
        instructor?.jobs.map((job) => ({
            ...job,
            start_date: DateTime.fromISO(job.start_date),
            end_date: job.end_date ? DateTime.fromISO(job.end_date) : null,
        })) || [];
    const instructorCertificates = instructor?.certificates || [];
    //

    // DEFAULT INSTRUCTOR INFORMATIONS
    const initialEducations: UpdateInstructorExperienceInput['educations'] = [
        { university: '', faculty: '', start_date: null, end_date: null, is_ongoing: false },
    ];
    const initialJobs: UpdateInstructorExperienceInput['jobs'] = [
        { company: '', position: '', start_date: null, end_date: null, is_ongoing: false },
    ];
    const initialCertificates: UpdateInstructorExperienceInput['certificates'] = [];
    //

    const initialValues: UpdateInstructorExperienceInput = {
        educations: instructorEducations.length > 0 ? instructorEducations : initialEducations,
        jobs: instructorJobs.length > 0 ? instructorJobs : initialJobs,
        certificates: instructorCertificates.length > 0 ? instructorCertificates : initialCertificates,
    };

    const onSubmit = async (
        values: UpdateInstructorExperienceInput,
        helpers: FormikHelpers<UpdateInstructorExperienceInput>,
    ) => {
        try {
            const normalizedValues = {
                ...values,
                jobs: values.jobs.map((job) => ({
                    ...job,
                    start_date: job.start_date ? toISODate(job.start_date) : '',
                    end_date: job.is_ongoing || !job.end_date ? '' : toISODate(job.end_date),
                })),
                educations: values.educations.map((education) => ({
                    ...education,
                    start_date: education.start_date ? toISODate(education.start_date) : '',
                    end_date: education.is_ongoing || !education.end_date ? '' : toISODate(education.end_date),
                })),
                certificates: values.certificates.map((certificate) => ({
                    ...certificate,
                    file: typeof certificate.file === 'string' ? undefined : certificate.file,
                })),
            };
            const formData: FormData = toFormData(normalizedValues) as FormData;
            await updateInstructorExperience(formData);
            notify({ type: 'success', message: 'Instructor experience updated successfully.' });
            onSuccess?.();
            await refetchInstructor();
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
            validationSchema={updateInstructorExperienceFormSchema}
        >
            {({ handleSubmit, dirty }) => {
                return (
                    <Form onSubmit={handleSubmit}>
                        {onDirtyChange && <FormDirtyListener onDirtyChange={onDirtyChange} />}
                        <Grid container spacing={{ xs: 2, sm: 2.5 }}>
                            <Grid item xs={12}>
                                <Typography variant="h6" mb={2} ml={3}>
                                    Təhsil
                                </Typography>
                                <Paper sx={{ p: 3 }}>
                                    <InstructorEducationsField />
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6" mb={2} ml={3}>
                                    İş yeri
                                </Typography>
                                <Paper sx={{ p: 3 }}>
                                    <InstructorJobsField />
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6" mb={2} ml={3}>
                                    Sertifikat
                                </Typography>
                                <Paper sx={{ p: 3 }}>
                                    <InstructorCertificatesField
                                        instructorCertificates={instructor?.certificates || []}
                                    />
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                    }}
                                >
                                    {actions}
                                    <LoadingButton
                                        fullWidth
                                        variant="contained"
                                        type="submit"
                                        loading={instructorExperienceUpdating}
                                        disabled={instructorExperienceUpdating || (checkDirty && !dirty)}
                                        sx={{ maxWidth: { xs: 'unset', sm: 175 } }}
                                    >
                                        {confirmButtonLabel || 'Növbəti'}
                                    </LoadingButton>
                                </Box>
                            </Grid>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};
