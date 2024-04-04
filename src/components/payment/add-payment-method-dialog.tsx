import CloseIcon from '@mui/icons-material/Close';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogProps,
    DialogTitle,
    Grid,
    IconButton,
} from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import React from 'react';

export const AddPaymentMethodDialog: React.FC<DialogProps> = ({ ...props }) => {
    return (
        <Dialog maxWidth="sm" fullWidth {...props} onClose={undefined}>
            <Formik initialValues={{ digits: '', expiry: '', cvv: '' }} onSubmit={(values) => console.log(values)}>
                {({ handleSubmit }) => {
                    return (
                        <Form onSubmit={handleSubmit}>
                            <DialogTitle>
                                <Box display="flex" width="100%" justifyContent="space-between" alignItems="center">
                                    Ödəniş metodu əlavə et
                                    <IconButton size="small" onClick={() => props.onClose?.({}, 'backdropClick')}>
                                        <CloseIcon />
                                    </IconButton>
                                </Box>
                            </DialogTitle>
                            <DialogContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Field component={TextField} label="Kart nömrəsi" name="digits" />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Field component={TextField} label="Bitmə tarixi" name="expiry" />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Field component={TextField} label="CVV" name="cvv" />
                                    </Grid>
                                </Grid>
                            </DialogContent>
                            <DialogActions>
                                <Button>Bağla</Button>
                                <Button type="submit" variant="contained">
                                    Yadda saxla
                                </Button>
                            </DialogActions>
                        </Form>
                    );
                }}
            </Formik>
        </Dialog>
    );
};
