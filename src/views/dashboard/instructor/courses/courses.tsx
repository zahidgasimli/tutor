import {
    // Box,
    Container,
    Grid,
    Hidden,
} from '@mui/material';
import { NotificationList } from 'components';
// import { BuySubscription } from '../components';
import { InstructorCoursesContent } from './course-content';

export const Courses: React.FC = () => {
    return (
        <Container maxWidth="xl">
            <Grid container spacing={3} flexDirection={{ xs: 'column-reverse', md: 'row' }}>
                <Grid item xs={12} md={7.5}>
                    <InstructorCoursesContent />
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
