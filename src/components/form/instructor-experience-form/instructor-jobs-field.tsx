import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Divider, Grid, IconButton, Typography } from '@mui/material';
import { DatePickerField } from 'components/formik';
import { ArrayHelpers, Field, FieldArray, FormikProps } from 'formik';
import { CheckboxWithLabel, TextField } from 'formik-mui';
import { UpdateInstructorExperienceInput } from 'mutations/use-update-instructor-experience';

export const InstructorJobsField: React.FC = () => {
    const scrollToLastItem = () => {
        setTimeout(() => {
            const el = document.getElementById('job-scroll-anchor');
            if (el) {
                const y = (el.getBoundingClientRect().top || 0) + window.pageYOffset - 64;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        }, 250);
    };

    return (
        <FieldArray name="jobs">
            {({
                form,
                push,
                remove,
            }: ArrayHelpers & {
                form: FormikProps<UpdateInstructorExperienceInput>;
                name: string;
            }) => {
                const jobs = form.values.jobs || [];
                return (
                    <Grid container spacing={4}>
                        {jobs.map((job, index) => {
                            return (
                                <Grid
                                    key={index}
                                    id={index === jobs.length - 1 ? 'job-scroll-anchor' : undefined}
                                    item
                                    xs={12}
                                >
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                                <Typography variant="h6" color="primary" fontWeight={600}>
                                                    İş yeri #{index + 1}
                                                </Typography>
                                                {jobs.length > 1 && (
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => remove(index)}
                                                        color="error"
                                                    >
                                                        <CloseIcon fontSize="small" />
                                                    </IconButton>
                                                )}
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field
                                                component={TextField}
                                                name={`jobs[${index}].company`}
                                                label="İş yeri"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field
                                                component={TextField}
                                                name={`jobs[${index}].position`}
                                                label="Vəzifə"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Field
                                                component={DatePickerField}
                                                label="Başlama tarixi"
                                                name={`jobs[${index}].start_date`}
                                                format="MM/yyyy"
                                                openTo="year"
                                                views={['year', 'month']}
                                                disableFuture
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Field
                                                component={DatePickerField}
                                                label="Çıxma tarixi"
                                                name={`jobs[${index}].end_date`}
                                                format="MM/yyyy"
                                                openTo="year"
                                                views={['year', 'month']}
                                                disableFuture
                                                minDate={job.start_date}
                                                value={job.is_ongoing ? null : job.end_date}
                                                disabled={job.is_ongoing}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field
                                                component={CheckboxWithLabel}
                                                type="checkbox"
                                                name={`jobs[${index}].is_ongoing`}
                                                Label={{ label: 'Davam edir' }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            );
                        })}
                        <Grid item xs={12}>
                            <Divider light />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="outlined"
                                fullWidth
                                onClick={() => {
                                    push({
                                        id: undefined,
                                        name: '',
                                        faculty: '',
                                        start_date: null,
                                        end_date: null,
                                        is_ongoing: false,
                                    });
                                    scrollToLastItem();
                                }}
                            >
                                İş yeri əlavə et
                            </Button>
                        </Grid>
                    </Grid>
                );
            }}
        </FieldArray>
    );
};
