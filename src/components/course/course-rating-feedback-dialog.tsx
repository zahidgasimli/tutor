import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import {
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogProps,
    DialogTitle,
    Grid,
    IconButton,
    Rating,
    Typography,
} from '@mui/material';
import { isAxiosError } from 'axios';
import { useNotifications } from 'context/NotificationsContext';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import useRateCourse, { RateCourseInput, rateCourseFormSchema } from 'mutations/use-rate-course';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { extractErrorMessageFromAxiosError } from 'utils/error-helper';

export const CourseRatingFeedbackDialog: React.FC<DialogProps & { course_id: number }> = ({ course_id, ...props }) => {
    const { t } = useTranslation('course-detail');
    const { notify } = useNotifications();
    const { mutateAsync: rateCourse, isLoading: ratingCourse } = useRateCourse(course_id);

    const [hover, setHover] = useState(-1);

    const initialValues: RateCourseInput = {
        rate: '5',
        feedback: '',
    };

    const onSubmit = async (values: RateCourseInput) => {
        try {
            const response = await rateCourse(values);
            notify({ type: 'success', message: response.data.message });
        } catch (error) {
            if (isAxiosError(error)) {
                notify({ type: 'error', message: extractErrorMessageFromAxiosError(error) });
            }
        } finally {
            props.onClose?.({}, 'backdropClick');
        }
    };

    const labels: { [index: string]: string } = {
        1: t('veryBad'),
        2: t('bad'),
        3: t('normal'),
        4: t('good'),
        5: t('awesome'),
    };

    function getLabelText(value: number) {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
    }

    return (
        <Dialog maxWidth="sm" fullWidth {...props}>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={rateCourseFormSchema}>
                {({ handleSubmit, values, setFieldValue }) => {
                    return (
                        <Form onSubmit={handleSubmit}>
                            <DialogTitle>
                                <Box display="flex" width="100%" justifyContent="space-between" alignItems="center">
                                    {t('rateCourse')}
                                    <IconButton size="small" onClick={() => props.onClose?.({}, 'backdropClick')}>
                                        <CloseIcon />
                                    </IconButton>
                                </Box>
                            </DialogTitle>
                            <DialogContent dividers>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Box
                                            display="flex"
                                            flexDirection="column"
                                            justifyContent="center"
                                            alignItems="center"
                                        >
                                            <Typography fontSize={20} fontWeight={600} mb={2}>
                                                {labels[hover !== -1 ? hover : values.rate]}
                                            </Typography>
                                            <Rating
                                                value={Number(values.rate)}
                                                precision={1}
                                                getLabelText={getLabelText}
                                                onChange={(_e, value) =>
                                                    value && setFieldValue('rate', value.toString())
                                                }
                                                onChangeActive={(_event, newHover) => {
                                                    setHover(newHover);
                                                }}
                                                size="large"
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            component={TextField}
                                            name="feedback"
                                            multiline
                                            minRows={7}
                                            maxRows={14}
                                            placeholder={t('writeAboutCourse')}
                                            label={t('aboutCourse')}
                                        />
                                    </Grid>
                                </Grid>
                            </DialogContent>
                            <DialogActions>
                                <LoadingButton
                                    type="submit"
                                    variant="contained"
                                    loading={ratingCourse}
                                    disabled={ratingCourse}
                                >
                                    {t('rate')}
                                </LoadingButton>
                            </DialogActions>
                        </Form>
                    );
                }}
            </Formik>
        </Dialog>
    );
};
