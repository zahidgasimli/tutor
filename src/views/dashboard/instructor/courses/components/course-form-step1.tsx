import {
    AutocompleteRenderInputParams,
    FormControlLabel,
    FormHelperText,
    Grid,
    TextField as MUITextField,
    MenuItem,
    Paper,
    Radio,
    Typography,
} from '@mui/material';
import { ErrorMessage, Field, FormikErrors, FormikTouched, useFormikContext } from 'formik';
import { Autocomplete, RadioGroup, TextField } from 'formik-mui';
import { CreateCourseInput } from 'mutations/use-create-course';
import { UpdateCourseInput } from 'mutations/use-update-course';
import { CourseLanguage, LessonFormat, StudyType } from 'queries/types';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Metro } from 'types';
import { cities } from 'variables';

export const CourseFormStep1: React.FC<{
    values: CreateCourseInput | UpdateCourseInput;
    touched: FormikTouched<CreateCourseInput | UpdateCourseInput>;
    errors: FormikErrors<CreateCourseInput | UpdateCourseInput>;
}> = ({ values, touched, errors }) => {
    const { t } = useTranslation();

    const selectedCity = cities.find((city) => city.name === values.address_city);
    const selectedCityStates = selectedCity?.states || [];

    return (
        <Paper sx={{ p: { xs: 2, sm: 3 } }}>
            <Grid container spacing={2.5}>
                <Grid item xs={12}>
                    <Field component={TextField} fullWidth label="Kursun adı" name="title" />
                </Grid>
                <Grid item xs={12}>
                    <Field component={TextField} select fullWidth label="Tədris dili" name="language">
                        {Object.keys(CourseLanguage).map((key) => (
                            <MenuItem key={key} value={CourseLanguage[key]}>
                                {t(`enum:CourseLanguage_${key}`)}
                            </MenuItem>
                        ))}
                    </Field>
                </Grid>
                <Grid item xs={12}>
                    <Typography color="primary" fontWeight={500} mb={1}>
                        Tədris növü
                    </Typography>
                    <Field component={RadioGroup} name="study_type" row>
                        {Object.keys(StudyType).map((key) => (
                            <Paper variant="outlined" key={key} sx={{ mr: 2, mb: 2 }}>
                                <FormControlLabel
                                    sx={{ pr: 2, m: 0 }}
                                    value={StudyType[key]}
                                    control={<Radio disableRipple />}
                                    label={t(`enum:StudyType_${key}`)}
                                />
                            </Paper>
                        ))}
                    </Field>
                </Grid>
                <Grid item xs={12}>
                    <Typography color="primary" fontWeight={500} mb={1}>
                        Dərsin formatı
                    </Typography>
                    <Field component={RadioGroup} name="lesson_format" row>
                        {Object.keys(LessonFormat).map((key) => (
                            <Paper variant="outlined" key={key} sx={{ mr: 2, mb: 2 }}>
                                <FormControlLabel
                                    sx={{ pr: 2, m: 0 }}
                                    value={LessonFormat[key]}
                                    control={<Radio disableRipple />}
                                    label={t(`enum:LessonFormat_${key}`)}
                                />
                            </Paper>
                        ))}
                    </Field>
                </Grid>
                <Grid item xs={12}>
                    <Typography color="primary" fontWeight={500}>
                        Ünvan
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Field
                        component={Autocomplete}
                        options={cities.map((city) => city.name)}
                        autoHighlight
                        fullWidth
                        name="address_city"
                        renderInput={(params: AutocompleteRenderInputParams) => (
                            <MUITextField
                                {...params}
                                name="address_city"
                                error={touched['address_city'] && !!errors['address_city']}
                                label="Şəhər"
                            />
                        )}
                    />
                    <ErrorMessage
                        name="address_city"
                        render={(error) => (
                            <FormHelperText variant="filled" error>
                                {error}
                            </FormHelperText>
                        )}
                    />
                </Grid>
                <CityChangeListener />
                <Grid item xs={12}>
                    <Field
                        component={Autocomplete}
                        options={selectedCityStates}
                        autoHighlight
                        fullWidth
                        name="address_state"
                        disabled={selectedCityStates.length === 0}
                        renderInput={(params: AutocompleteRenderInputParams) => (
                            <MUITextField
                                {...params}
                                name="address_state"
                                error={touched['address_state'] && !!errors['address_state']}
                                label="Rayon"
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Field
                        component={Autocomplete}
                        options={Object.keys(Metro)}
                        getOptionLabel={(option) => t(`enum:Metro_${option}`)}
                        autoHighlight
                        fullWidth
                        multiple
                        disableCloseOnSelect
                        name="address_metros"
                        renderInput={(params: AutocompleteRenderInputParams) => (
                            <MUITextField
                                {...params}
                                name="address_metros"
                                error={touched['address_metros'] && !!errors['address_metros']}
                                label="Metrostansiya"
                            />
                        )}
                    />
                    <ErrorMessage
                        name="address_metros"
                        render={(error) => (
                            <FormHelperText variant="filled" error>
                                {error}
                            </FormHelperText>
                        )}
                    />
                </Grid>
            </Grid>
        </Paper>
    );
};

export const CityChangeListener = () => {
    const { values, setFieldValue } = useFormikContext<CreateCourseInput | UpdateCourseInput>();

    useEffect(() => {
        const selectedCity = cities.find((city) => city.name === values.address_city);
        const selectedCityStates = selectedCity?.states || [];

        if (selectedCityStates.length === 0) {
            setFieldValue('address_state', '');
        }
    }, [values.address_city]);

    return null;
};
