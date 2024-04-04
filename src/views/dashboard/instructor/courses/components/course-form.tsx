import { LoadingButton } from '@mui/lab';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { isAxiosError } from 'axios';
import { GoodToKnowBox, Spinner, StepperContent } from 'components';
import { useNotifications } from 'context/NotificationsContext';
import { Form, Formik, FormikHelpers } from 'formik';
import useCreateCourse, { CreateCourseInput, createCourseFormSchema } from 'mutations/use-create-course';
import useUpdateCourse, { UpdateCourseInput } from 'mutations/use-update-course';
import { CourseDirection, CourseLanguage, LessonFormat, StudyType } from 'queries/types';
import useCategories from 'queries/use-categories';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { extractErrorMessageFromAxiosError } from 'utils/error-helper';
import { CourseFormStep1 } from './course-form-step1';
import { CourseFormStep2 } from './course-form-step2';
import { scrollToTop } from 'utils/browser-utils';

const titles = [
    <Typography key={0} variant="h2">
        Tədris <Box sx={{ color: 'primary.main', display: 'inline' }}>formatınız</Box> <br />
        necədir?
    </Typography>,
    <Typography key={1} variant="h2">
        Hansı <Box sx={{ color: 'primary.main', display: 'inline' }}>dərsi</Box> <br />
        Öyrədirsiniz?
    </Typography>,
];

export type CourseFormProps = { initialCourseValues?: CreateCourseInput | UpdateCourseInput; editMode?: boolean };

export const CourseForm: React.FC<CourseFormProps> = ({ initialCourseValues, editMode }) => {
    const { notify } = useNotifications();
    const navigate = useNavigate();

    const [activeStep, setActiveStep] = useState(0);

    const { data: categoriesData, isLoading: categoriesLoading } = useCategories();
    const { mutateAsync: createCourse, isLoading: creatingCourse } = useCreateCourse();
    const { mutateAsync: updateCourse, isLoading: updatingCourse } = useUpdateCourse();
    const categories = categoriesData?.data || [];

    if (categoriesLoading) return <Spinner />;

    const initialValues: CreateCourseInput | UpdateCourseInput = initialCourseValues || {
        title: '',
        description: '',
        sub_category: null,
        address_city: '',
        address_state: '',
        address_metros: [],
        direction: CourseDirection['PRIMARY-SCHOOL'],
        language: CourseLanguage.AZERBAIJANI,
        lesson_format: LessonFormat['IN-INSTRUCTOR'],
        study_type: StudyType.INDIVIDUAL,
        price: 0,
        sections: [],
    };

    const onSubmit = async (
        values: CreateCourseInput | UpdateCourseInput,
        helpers: FormikHelpers<CreateCourseInput | UpdateCourseInput>,
    ) => {
        try {
            if (activeStep === 0) {
                setActiveStep(1);
                helpers.setErrors({});
                helpers.setTouched({});
            }
            if (activeStep === 1) {
                if (editMode) {
                    const response = await updateCourse(values);
                    notify({
                        type: 'success',
                        message: `${response.data.title} kursu üçün dəyişiklikləriniz yadda saxlanıldı!`,
                    });
                } else {
                    const response = await createCourse(values);
                    notify({ type: 'success', message: `${response.data.title} kursu yaradıldı!` });
                }
                navigate(-1);
            }
            setTimeout(scrollToTop, 200);
        } catch (error) {
            if (isAxiosError(error)) {
                notify({ type: 'error', message: extractErrorMessageFromAxiosError(error) });
            }
            helpers.setSubmitting(false);
        }
    };

    const handleGoBack = () => {
        if (activeStep === 1) {
            setActiveStep(0);
        } else {
            navigate(-1);
        }
        setTimeout(scrollToTop, 200);
    };

    return (
        <Box overflow="hidden">
            <Container maxWidth="xl">
                <Box sx={{ pb: 3.5, pt: 0.5 }}>{titles[activeStep]}</Box>

                <Grid container spacing={3} flexDirection={{ xs: 'column-reverse', md: 'row' }}>
                    <Grid item xs={12} md={7.5}>
                        <Formik
                            initialValues={initialValues}
                            onSubmit={onSubmit}
                            validationSchema={createCourseFormSchema[activeStep]}
                        >
                            {({ handleSubmit, values, touched, errors }) => {
                                return (
                                    <Form onSubmit={handleSubmit}>
                                        <StepperContent
                                            sx={{ py: 0 }}
                                            activeStep={activeStep}
                                            contents={[
                                                <CourseFormStep1
                                                    key={0}
                                                    values={values}
                                                    touched={touched}
                                                    errors={errors}
                                                />,
                                                <CourseFormStep2 key={1} categories={categories} />,
                                            ]}
                                        />
                                        <Box display="flex" justifyContent="space-between" mt={5}>
                                            <Button
                                                variant="outlined"
                                                disabled={creatingCourse || updatingCourse}
                                                sx={{
                                                    maxWidth: { xs: 'unset', sm: 175 },
                                                    width: { xs: 'unset', sm: '100%' },
                                                    mr: { xs: 2, md: 0 },
                                                }}
                                                onClick={handleGoBack}
                                            >
                                                Geriyə
                                            </Button>
                                            <LoadingButton
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                loading={creatingCourse || updatingCourse}
                                                disabled={creatingCourse || updatingCourse}
                                                sx={{ maxWidth: { xs: 'unset', sm: 175 } }}
                                            >
                                                {activeStep === 0 ? 'Növbəti' : editMode ? 'Dəyiş' : 'Yarat'}
                                            </LoadingButton>
                                        </Box>
                                    </Form>
                                );
                            }}
                        </Formik>
                    </Grid>
                    <Grid item xs={12} md={4.5}>
                        <GoodToKnowBox
                            title={['Bilmək yaxşıdır', 'Haqqında'][activeStep]}
                            body={
                                [
                                    'Tutor Az platformasında siz 1-dən çox fənni öyrədə bilərsiniz! Ünvanınız, əlaqə nömrəniz heç vaxt saytda görünməyəcək. O, yalnız dərs verməyə razılaşdığınız tələbələrlə paylaşılacaq və sizdən icazə alınaraq baş verəcək. Göstərilən ünvanda evinizdə dərs keçə bilərsiniz',
                                    'Siz dərsiniz barəsində məlumatlar qeyd etməlisiniz. İlk aylarda hansı mövzular keçirilir? Qrupda neçə uşaq olur ? Əlavə dərslər olurmu ? İmtahanlar keçirilirmi və nəticəsi valideynlə bölüşülürmü ? və bunun kimi bir çox sualların yaranmaması üçün çalışın haqqında hissəsində geniş məlumat verəsiniz. Məsələn belə başlaya bilərsiniz “Öyrətmək mənim işimdir, səbrliyəm nəticələrimiz çox zaman yaxşı olur, Bu sahədə kurs və fərdi hazırlıq uzunmüddətli və təminatlı təcrübə qazanmağıma şərait yaratmışdır...”',
                                ][activeStep]
                            }
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};
