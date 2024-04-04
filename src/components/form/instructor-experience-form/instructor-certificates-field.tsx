import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Divider, Grid, IconButton, Typography } from '@mui/material';
import { FileUploadField } from 'components/formik/file-upload-field';
import { ArrayHelpers, Field, FieldArray, FormikProps } from 'formik';
import { TextField } from 'formik-mui';
import { UpdateInstructorExperienceInput } from 'mutations/use-update-instructor-experience';
import { InstructorCertificate } from 'types';

export type InstructorCertificatesFieldProps = {
    instructorCertificates: InstructorCertificate[];
};

export const InstructorCertificatesField: React.FC<InstructorCertificatesFieldProps> = ({ instructorCertificates }) => {
    const scrollToLastItem = () => {
        setTimeout(() => {
            const el = document.getElementById('certificate-scroll-anchor');
            if (el) {
                const y = (el.getBoundingClientRect().top || 0) + window.pageYOffset - 64;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        }, 250);
    };

    return (
        <FieldArray name="certificates">
            {({
                form,
                push,
                remove,
            }: ArrayHelpers & {
                form: FormikProps<UpdateInstructorExperienceInput>;
                name: string;
            }) => {
                const certificates = form.values.certificates || [];
                return (
                    <Grid container spacing={4}>
                        {certificates.map((_certificate, index) => {
                            return (
                                <Grid
                                    key={index}
                                    id={index === certificates.length - 1 ? 'certificate-scroll-anchor' : undefined}
                                    item
                                    xs={12}
                                >
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                                <Typography variant="h6" color="primary" fontWeight={600}>
                                                    Sertifikat #{index + 1}
                                                </Typography>
                                                <IconButton size="small" onClick={() => remove(index)} color="error">
                                                    <CloseIcon fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <Box
                                                sx={{
                                                    width: '100%',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <Field
                                                    component={FileUploadField}
                                                    label="Diplom əlavə edin"
                                                    defaultUrl={
                                                        instructorCertificates.find(
                                                            (certificate) => certificate.id === _certificate.id,
                                                        )?.file
                                                    }
                                                    name={`certificates[${index}].file`}
                                                    width={{ xs: 170, sm: '100%' }}
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={9}>
                                            <Field
                                                component={TextField}
                                                name={`certificates[${index}].name`}
                                                label="Sənədin adı"
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            );
                        })}
                        {certificates.length > 0 && (
                            <Grid item xs={12}>
                                <Divider light />
                            </Grid>
                        )}
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
                                    });
                                    scrollToLastItem();
                                }}
                            >
                                Sertifikat əlavə et
                            </Button>
                        </Grid>
                    </Grid>
                );
            }}
        </FieldArray>
    );
};
