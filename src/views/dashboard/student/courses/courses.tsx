import { Box, Container, Grid, Hidden } from '@mui/material';
// import { BuyApply } from '../components';
import { StudentCoursesContent } from './course-content';
import { NotificationList, WishlistedCoursesList } from 'components';

export const Courses: React.FC = () => {
    return (
        <Container maxWidth="xl">
            <Grid container spacing={3} flexDirection={{ xs: 'column-reverse', md: 'row' }}>
                <Grid item xs={12} md={7.5}>
                    <StudentCoursesContent />
                </Grid>
                <Hidden mdDown>
                    <Grid item xs={12} md={4.5}>
                        {/* <BuyApply /> */}
                        {/* <Box mt={3}> */}
                        <NotificationList />
                        {/* </Box> */}
                        <Box mt={3}>
                            <WishlistedCoursesList />
                        </Box>
                    </Grid>
                </Hidden>
            </Grid>
        </Container>
    );
};
