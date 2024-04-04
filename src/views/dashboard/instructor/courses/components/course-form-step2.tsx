import {
    Box,
    Divider,
    FormControlLabel,
    FormHelperText,
    Grid,
    TextField as MUITextField,
    Paper,
    Radio,
    Typography,
} from '@mui/material';
import { CourseSectionField, RichTextEditorField } from 'components/formik';
import { ErrorMessage, Field, useFormikContext } from 'formik';
import { Autocomplete, AutocompleteRenderInputParams, RadioGroup, TextField } from 'formik-mui';
import { CreateCourseInput } from 'mutations/use-create-course';
import { CourseDirection } from 'queries/types';
import { Category } from 'queries/use-categories';
import { useTranslation } from 'react-i18next';

export const CourseFormStep2: React.FC<{ categories: Category[] }> = ({ categories }) => {
    const { t } = useTranslation();
    const { values, errors, touched } = useFormikContext<CreateCourseInput>();

    const groupedCategories = categories
        .map((category) =>
            category.sub_categories.map((sub_category) => ({ ...sub_category, parent_category: category.name })),
        )
        .flat();

    return (
        <Paper sx={{ p: { xs: 2, sm: 3 } }}>
            <Grid container spacing={2.5}>
                <Grid item xs={12}>
                    <Grid item xs={12}>
                        <Field
                            component={Autocomplete}
                            options={groupedCategories.map((c) => c.id)}
                            groupBy={(optionId) => groupedCategories.find((c) => c.id === optionId)?.parent_category}
                            getOptionLabel={(optionId) => groupedCategories.find((c) => c.id === optionId)?.name}
                            fullWidth
                            name="sub_category"
                            renderInput={(params: AutocompleteRenderInputParams) => (
                                <MUITextField
                                    {...params}
                                    name="sub_category"
                                    error={touched['sub_category'] && !!errors['sub_category']}
                                    label="Kateqoriya"
                                />
                            )}
                        />
                        <ErrorMessage
                            name="sub_category"
                            render={(error) => (
                                <FormHelperText variant="filled" error>
                                    {error}
                                </FormHelperText>
                            )}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Divider light />
                </Grid>
                <Grid item xs={12}>
                    <Typography color="primary" fontWeight={500} mb={1}>
                        İstiqamət
                    </Typography>
                    <Field component={RadioGroup} name="direction" row>
                        {Object.keys(CourseDirection).map((key) => (
                            <Paper variant="outlined" key={key} sx={{ mr: 2, mb: 2 }}>
                                <FormControlLabel
                                    sx={{ pr: 2, m: 0 }}
                                    value={CourseDirection[key]}
                                    control={<Radio disableRipple />}
                                    label={t(`enum:CourseDirection_${key}`)}
                                />
                            </Paper>
                        ))}
                    </Field>
                </Grid>
                <Grid item xs={12}>
                    <Typography color="primary" fontWeight={500} mb={1.5}>
                        Kurs haqqında məlumat
                    </Typography>
                    <Field component={RichTextEditorField} name="description" />
                </Grid>
                <Grid item xs={12}>
                    <Divider light />
                </Grid>
                <Grid item xs={12}>
                    <Typography color="primary" fontWeight={500} mb={0.5}>
                        Dərsin qiyməti
                    </Typography>
                    <Typography color="textSecondary" fontSize={12} mb={3}>
                        1 Dərsin qiyməti
                    </Typography>
                    <Box display="flex" alignItems="center" flexWrap="wrap">
                        <Typography variant="body2" mr={3}>
                            {t(`enum:LessonFormat_${values.lesson_format}`)}:
                        </Typography>
                        <Field
                            component={TextField}
                            type="number"
                            name="price"
                            fullWidth={false}
                            sx={{ my: 1 }}
                            InputProps={{
                                endAdornment: (
                                    <Typography variant="body2" fontWeight={500} ml={1}>
                                        AZN
                                    </Typography>
                                ),
                            }}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Divider light />
                </Grid>
                <Grid item xs={12}>
                    <Field
                        component={CourseSectionField}
                        name="sections"
                        title="Dərs hansı gün və saatda keçirilir ?"
                    />
                </Grid>
            </Grid>
        </Paper>
    );
};
