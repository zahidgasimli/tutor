import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Divider, Grid, IconButton, Typography } from '@mui/material';
import { DatePickerField } from 'components/formik';
import { ArrayHelpers, Field, FieldArray, FormikProps } from 'formik';
import { CheckboxWithLabel, TextField } from 'formik-mui';
import { UpdateInstructorExperienceInput } from 'mutations/use-update-instructor-experience';

export const InstructorEducationsField: React.FC = () => {
    const scrollToLastItem = () => {
        setTimeout(() => {
            const el = document.getElementById('education-scroll-anchor');
            if (el) {
                const y = (el.getBoundingClientRect().top || 0) + window.pageYOffset - 64;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        }, 250);
    };

    return (
        <FieldArray name="educations">
            {({
                form,
                push,
                remove,
            }: ArrayHelpers & {
                form: FormikProps<UpdateInstructorExperienceInput>;
                name: string;
            }) => {
                const educations = form.values.educations || [];
                return (
                    <Grid container spacing={4}>
                        {educations.map((education, index) => {
                            return (
                                <Grid
                                    key={index}
                                    id={index === educations.length - 1 ? 'education-scroll-anchor' : undefined}
                                    item
                                    xs={12}
                                >
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                                <Typography variant="h6" color="primary" fontWeight={600}>
                                                    Təhsil #{index + 1}
                                                </Typography>
                                                {educations.length > 1 && (
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
                                                name={`educations[${index}].university`}
                                                label="Təhsil aldığınız müəssisə"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field
                                                component={TextField}
                                                name={`educations[${index}].faculty`}
                                                label="İxtisas"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Field
                                                component={DatePickerField}
                                                label="Başlama ili"
                                                name={`educations[${index}].start_date`}
                                                format="yyyy"
                                                openTo="year"
                                                views={['year']}
                                                disableFuture
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Field
                                                component={DatePickerField}
                                                label="Buraxılış ili"
                                                name={`educations[${index}].end_date`}
                                                format="yyyy"
                                                openTo="year"
                                                views={['year']}
                                                minDate={education.start_date}
                                                value={education.is_ongoing ? null : education.end_date}
                                                disabled={education.is_ongoing}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field
                                                component={CheckboxWithLabel}
                                                type="checkbox"
                                                name={`educations[${index}].is_ongoing`}
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
                                Təhsil əlavə et
                            </Button>
                        </Grid>
                    </Grid>
                );
            }}
        </FieldArray>
    );
};
