import { Box, Paper } from '@mui/material';
import { PageTabs, Spinner } from 'components';
import { useTabs } from 'hooks/use-tabs';
import { StudentApplicationsList } from './applications-list';
import { StudentCourseList } from './course-list';
import useStudentCourses from 'queries/use-student-courses';
import useStudentApplications from 'queries/use-student-applications';

export const StudentCoursesContent = () => {
    const { activeTab, loading, changeActiveTab } = useTabs<'courses' | 'applications'>('courses');

    const { data: coursesData, isLoading: coursesLoading } = useStudentCourses();
    const { data: applicationsData, isLoading: applicationsLoading } = useStudentApplications();
    const courses = coursesData?.data || [];
    const applications = applicationsData?.data || [];

    return (
        <Paper sx={{ p: { xs: 2, sm: 3 }, display: 'flex', flexDirection: 'column' }}>
            <PageTabs
                tabs={[
                    { value: 'courses', label: 'Aktiv dərslərim' },
                    { value: 'applications', label: 'Müraciətlərim' },
                ]}
                value={activeTab}
                onTabChange={changeActiveTab}
                loading={loading}
            />
            {!loading ? (
                <Box mt={3}>
                    {activeTab === 'courses' && <StudentCourseList courses={courses} loading={coursesLoading} />}
                    {activeTab === 'applications' && (
                        <StudentApplicationsList applications={applications} loading={applicationsLoading} />
                    )}
                </Box>
            ) : (
                <Box height={300}>
                    <Spinner />
                </Box>
            )}
        </Paper>
    );
};
