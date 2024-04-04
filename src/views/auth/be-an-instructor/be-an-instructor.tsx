import { LoadingButton } from '@mui/lab';
import {
    Avatar,
    Box,
    Container,
    Grid,
    Hidden,
    Step,
    StepLabel,
    Stepper,
    Theme,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { GoodToKnowBox, StepperContent } from 'components';
import { InstructorExperienceForm, InstructorPersonalInfoForm } from 'components/form';
import { mobileSize } from 'config';
import { UpdateInstructorExperienceInput } from 'mutations/use-update-instructor-experience';
import { UpdateInstructorProfileInput } from 'mutations/use-update-instructor-profile';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export type UpdateInstructorFormValues = UpdateInstructorProfileInput & UpdateInstructorExperienceInput;

const steps = ['Şəxsi məlumat', 'Təcrübəniz haqqında məlumat verin'];
const goodToKnows = [
    <Box key={0} sx={{ color: 'text.secondary' }}>
        <Typography>
            Şəkiliniz tələbələrin görəcəyi ilk şeydir, ona görə də aşağıdakı kriteryalara diqqət yetirin.
        </Typography>
        <br />
        <Typography variant="h6" fontSize={16} fontWeight={600}>
            ŞƏKİL FORMATI NECƏ OLMALIDIR ?
        </Typography>

        <Box display="flex" mt={2}>
            <Avatar
                variant="square"
                sx={{ mr: 2, width: 56, height: 56 }}
                src={require('assets/images/person/person-1.png').default}
            />
            <Avatar
                variant="square"
                sx={{ mr: 2, width: 56, height: 56 }}
                src={require('assets/images/person/person-5.png').default}
            />
            <Avatar
                variant="square"
                sx={{ width: 56, height: 56 }}
                src={require('assets/images/person/person-3.png').default}
            />
        </Box>

        <br />
        <ul style={{ listStylePosition: 'inside' }}>
            <li>Gülümsəməyə çalışın</li>
            <li>JPG formatında </li>
            <li>Tək, biz ancaq sizi fotoda görmək istəyirik</li>
        </ul>
    </Box>,
    <Typography key={1} color="textSecondary" textAlign="center">
        Yaşadığınız təcrübədən aslı olaraq əldə etdiyiniz diplomu və ya sertifikatı aşağı hissədə əlavə edə bilərsiniz.
        Diqqətinizə çatdırmaq istərdik ki qeyd etdiyiniz hər bir məlumat yaratdığınız kurs bölməsində görsənəcək.
        Yaranmış hər hansı bir çətinlikdə aşağıdakı nömrəmizlə əlaqə saxlıya bilərsiniz.
    </Typography>,
];

export const BeAnInstructor = () => {
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down(mobileSize));
    const navigate = useNavigate();

    const [activeStep, setActiveStep] = useState(0);

    const redirectToSuccessPage = () => {
        navigate('/be-an-instructor/success');
    };

    return (
        <Box overflow="hidden">
            <Container sx={{ pb: 6 }}>
                <Container maxWidth="xs" sx={{ mb: 8 }}>
                    <Stepper activeStep={activeStep}>
                        <Step completed={activeStep === 1}>
                            <StepLabel sx={{ '& .MuiStepLabel-label': { fontSize: 14 } }}>
                                {isMobile ? '' : 'Şəxsi məlumat'}
                            </StepLabel>
                        </Step>
                        <Step>
                            <StepLabel sx={{ '& .MuiStepLabel-label': { fontSize: 14 } }}>
                                {isMobile ? '' : 'Təcrübə'}
                            </StepLabel>
                        </Step>
                    </Stepper>
                </Container>
                <Grid container spacing={{ xs: 3, md: 6 }}>
                    <Grid item xs={12} md={7}>
                        <Typography variant="h2" sx={{ mb: 4 }} fontWeight={600}>
                            {steps[activeStep]}
                        </Typography>
                        <StepperContent
                            sx={{ m: -6, p: 6 }}
                            activeStep={activeStep}
                            contents={[
                                <InstructorPersonalInfoForm key={0} onSuccess={() => setActiveStep((p) => p + 1)} />,
                                <InstructorExperienceForm
                                    key={0}
                                    actions={[
                                        <LoadingButton
                                            key={0}
                                            variant="outlined"
                                            loading={false}
                                            disabled={false}
                                            sx={{ mr: 3 }}
                                            onClick={() => setActiveStep((p) => p - 1)}
                                        >
                                            Geriyə
                                        </LoadingButton>,
                                    ]}
                                    emptyInitialValues
                                    onSuccess={redirectToSuccessPage}
                                />,
                            ]}
                        />
                    </Grid>
                    <Hidden mdDown>
                        <Grid item md>
                            <GoodToKnowBox title="Bilmək yaxşıdır" body={goodToKnows[activeStep]} />
                        </Grid>
                    </Hidden>
                </Grid>
            </Container>
        </Box>
    );
};
