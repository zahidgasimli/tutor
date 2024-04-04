import { Button, Typography } from '@mui/material';
import { isAxiosError } from 'axios';
import { useNotifications } from 'context/NotificationsContext';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import { extractErrorMessageFromAxiosError } from 'utils/error-helper';
import * as Yup from 'yup';

const newsletterSubscribeFormSchema = Yup.object().shape({
    email: Yup.string().email('Email formatı yanlışdır').required('Email daxil olunmalıdır'),
});

export const NewsletterSubscribe = () => {
    const { notify } = useNotifications();
    const initialValues = { email: '' };

    const onSubscribe = async (values: typeof initialValues) => {
        try {
            notify({ type: 'success', message: `Yeniliklərə abonə oldunuz ${values.email}!` });
        } catch (error) {
            if (isAxiosError(error)) {
                notify({ type: 'error', message: extractErrorMessageFromAxiosError(error) });
            }
        }
    };

    return (
        <Formik initialValues={initialValues} onSubmit={onSubscribe} validationSchema={newsletterSubscribeFormSchema}>
            {({ handleSubmit }) => {
                return (
                    <Form onSubmit={handleSubmit}>
                        <Typography fontWeight={600}>Yeniliklərə abonə olun</Typography>

                        <Field
                            component={TextField}
                            placeholder="Your email"
                            name="email"
                            sx={{
                                mt: 2,
                                '& .MuiInputBase-root': {
                                    bgcolor: 'background.paper',
                                },
                            }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="info"
                            fullWidth
                            sx={{ maxWidth: { xs: 'unset', md: 175 }, mt: 2 }}
                        >
                            Subscribe
                        </Button>
                    </Form>
                );
            }}
        </Formik>
    );
};
