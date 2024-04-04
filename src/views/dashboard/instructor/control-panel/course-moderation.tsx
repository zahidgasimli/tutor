import { Box } from '@mui/material';
import { CourseModerationRequestList } from './course-moderation-request-list';
import { CourseModerationStudentList } from './course-moderation-student-list';

export const InstructorCourseModeration = () => {
    return (
        <>
            <CourseModerationRequestList />
            <Box mt={{ xs: 2, sm: 4 }}>
                <CourseModerationStudentList />
            </Box>
        </>
    );
};
