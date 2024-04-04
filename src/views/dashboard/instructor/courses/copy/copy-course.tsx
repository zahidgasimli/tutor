import { Spinner } from 'components';
import { UpdateCourseInput } from 'mutations/use-update-course';
import useInstructorCourse from 'queries/use-instructor-course';
import { useParams } from 'react-router-dom';
import { CourseForm } from '../components/course-form';

export const CopyCourse = () => {
    const { id } = useParams<{ id: string }>();

    const { data: courseData, isLoading: courseLoading } = useInstructorCourse(id);
    const course = courseData?.data;

    if (courseLoading) {
        return <Spinner />;
    }

    if (!course) return null;

    const initialValues: UpdateCourseInput = {
        ...course,
        start_date: undefined,
        end_date: undefined,
    };

    return <CourseForm initialCourseValues={initialValues} />;
};
