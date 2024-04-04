import {
    // Box,
    Container,
    Grid,
    Hidden,
} from '@mui/material';
// import { BuySubscription } from '../components';
import { InstructorCourseModeration } from './course-moderation';
import { NotificationList } from 'components';

export const ControlPanel = () => {
    return (
        <Container maxWidth="xl">
            <Grid container spacing={3} flexDirection={{ xs: 'column-reverse', md: 'row' }}>
                <Grid item xs={12} md={7.5}>
                    <InstructorCourseModeration />
                </Grid>
                <Hidden mdDown>
                    <Grid item xs={12} md={4.5}>
                        {/* <BuySubscription /> */}
                        {/* <Box mt={3}> */}
                        <NotificationList />
                        {/* </Box> */}
                    </Grid>
                </Hidden>
            </Grid>
        </Container>
    );
};
