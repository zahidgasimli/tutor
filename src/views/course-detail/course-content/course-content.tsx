import { Divider, Paper } from '@mui/material';
import { Accordion, RichText } from 'components';
import { Course } from 'queries/use-course';
import { CourseMetroList } from './course-metro-list';
import { CourseSummary } from './course-summary';
import { CourseInstructorEducationList } from './course-instructor-education-list';
import { CourseInstructorCertificateList } from './course-instructor-certificate-list';
import { Instructor } from 'queries/use-instructor';
import { CourseInstructorJobList } from './course-instructor-experience-list';
import { useTranslation } from 'react-i18next';

export type CourseContentProps = Pick<
    Course,
    'description' | 'address_metros' | 'address_city' | 'address_state' | 'lesson_format' | 'study_type' | 'direction'
> &
    Pick<Instructor, 'educations' | 'jobs' | 'certificates'>;

export const CourseContent: React.FC<CourseContentProps> = ({
    description,
    address_metros,
    address_city,
    address_state,
    direction,
    lesson_format,
    study_type,
    educations,
    jobs,
    certificates,
}) => {
    const { t } = useTranslation('course-detail');
    return (
        <Paper>
            <Accordion title={t('about')} description={<RichText content={description} />} defaultExpanded />
            <Divider light />
            <Accordion
                title={t('shortSummary')}
                description={
                    <CourseSummary {...{ address_city, address_state, direction, lesson_format, study_type }} />
                }
            />
            <Divider light />
            {educations.length > 0 && (
                <>
                    <Accordion
                        title={t('education')}
                        description={<CourseInstructorEducationList educations={educations} />}
                    />
                    <Divider light />
                </>
            )}
            {jobs.length > 0 && (
                <>
                    <Accordion title={t('jobs')} description={<CourseInstructorJobList jobs={jobs} />} />
                    <Divider light />
                </>
            )}
            {certificates.length > 0 && (
                <>
                    <Accordion
                        title={t('certificates')}
                        description={<CourseInstructorCertificateList certificates={certificates} />}
                    />
                    <Divider light />
                </>
            )}
            <Accordion title={t('metro')} description={<CourseMetroList address_metros={address_metros} />} />
        </Paper>
    );
};
