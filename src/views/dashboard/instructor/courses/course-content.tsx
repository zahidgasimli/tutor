import { Box, Paper } from '@mui/material';
import { PageTabs, Spinner } from 'components';
import { useTabs } from 'hooks/use-tabs';
import useInstructorCourses, { InstructorCourseStatus } from 'queries/use-instructor-courses';
import { useMemo } from 'react';
import { InstructorCourseList } from './course-list';

export const InstructorCoursesContent = () => {
    const { activeTab, loading, changeActiveTab } = useTabs<InstructorCourseStatus>('ACTIVE', {
        customURLParamName: 'status',
    });

    const refetchAfk = useMemo(() => new Date().getTime(), [activeTab]);

    const { data: coursesData, isLoading: coursesLoading } = useInstructorCourses(
        `${refetchAfk}-${activeTab}`,
        { status: activeTab },
        { retry: false },
    );

    const courses = coursesData?.data || [];

    return (
        <Paper sx={{ p: { xs: 2, sm: 3 }, display: 'flex', flexDirection: 'column' }}>
            <PageTabs
                tabs={[
                    { value: 'ACTIVE', label: 'Aktiv Dərslər', shortLabel: 'Aktiv' },
                    { value: 'DRAFT', label: 'Gözləntidə Olan Dərslər', shortLabel: 'Gözləntidə' },
                    { value: 'ARCHIVED', label: 'Arxiv Dərslər', shortLabel: 'Arxiv' },
                ]}
                value={activeTab}
                onTabChange={changeActiveTab}
                loading={loading}
            />
            {!loading ? (
                <Box mt={3}>
                    <InstructorCourseList courses={courses} loading={coursesLoading} status={activeTab} />
                </Box>
            ) : (
                <Box height={300}>
                    <Spinner />
                </Box>
            )}
        </Paper>
    );
};
