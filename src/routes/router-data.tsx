import { AuthUserProps } from 'context/auth/store';
import { AppLayout } from 'layout/app';
import { lazy } from 'react';
import { Navigate, RouteObject, createBrowserRouter } from 'react-router-dom';
import { AuthPreventRoute } from './components/auth-prevent-route';
import { ProtectedRoute } from './components/protected-route';
import { studentRoutes } from './student-routes';
import { instructorRoutes } from './instructor-routes';

// PUBLIC START
const HomePage = lazy(() => import('views/home'));
const AboutPage = lazy(() => import('views/about'));
const CourseListPage = lazy(() => import('views/course-list'));
const CourseDetailPage = lazy(() => import('views/course-detail'));

// PUBLIC END

// AUTH START
const SignInPage = lazy(() => import('views/auth/sign-in'));
const GoogleLoginCallbackPage = lazy(() => import('views/auth/google-login-callback'));
const SignUpPage = lazy(() => import('views/auth/sign-up'));
const CompleteProfilePage = lazy(() => import('views/auth/complete-profile'));
const ForgotPasswordPage = lazy(() => import('views/auth/forgot-password'));
const ResetPasswordPage = lazy(() => import('views/auth/reset-password'));
const BeAnInstructorPage = lazy(() => import('views/auth/be-an-instructor'));
const BeAnInstructorSuccessPage = lazy(() => import('views/auth/be-an-instructor-success'));
// AUTH END

// COMMON START
const NotFoundPage = lazy(() => import('views/not-found'));
// COMMON END

type RouterProps = { userRole?: AuthUserProps['role']; isCompleted?: AuthUserProps['isCompleted'] };

const renderDashboard = ({ userRole, isCompleted }: RouterProps): RouteObject[] => {
    if (!isCompleted) {
        return [
            { index: true, element: <Navigate to="account/complete" /> },
            {
                path: 'account/complete',
                element: <AppLayout />,
                children: [{ index: true, element: <CompleteProfilePage /> }],
            },
            { path: '*', element: <Navigate to="account/complete" /> },
        ];
    } else if (userRole && userRole === 'INSTRUCTOR') {
        return instructorRoutes;
    } else {
        return studentRoutes;
    }
};

export const getRouterData = ({ userRole, isCompleted }: RouterProps) =>
    createBrowserRouter([
        {
            path: '/',
            element: <AppLayout />,
            children: [
                {
                    index: true,
                    element: <HomePage />,
                },
                {
                    path: 'about-us',
                    element: <AboutPage />,
                },
                {
                    path: 'courses',
                    children: [
                        {
                            index: true,
                            element: <CourseListPage />,
                        },
                        {
                            path: ':slug',
                            element: <CourseDetailPage />,
                        },
                    ],
                },
                {
                    element: <ProtectedRoute />,
                    children: [
                        {
                            path: 'be-an-instructor',
                            children: [
                                {
                                    index: true,
                                    element: <BeAnInstructorPage />,
                                },
                                {
                                    path: 'success',
                                    element: <BeAnInstructorSuccessPage />,
                                },
                            ],
                        },
                    ],
                },
                {
                    path: 'auth',
                    element: <AuthPreventRoute />,
                    children: [
                        {
                            path: 'sign-in',
                            element: <SignInPage />,
                        },
                        {
                            path: 'sign-up',
                            element: <SignUpPage />,
                        },
                        {
                            path: 'forgot-password',
                            element: <ForgotPasswordPage />,
                        },
                        {
                            path: 'google/login/callback',
                            element: <GoogleLoginCallbackPage />,
                        },
                        {
                            path: 'reset-password/:token',
                            element: <ResetPasswordPage />,
                        },
                    ],
                },
            ],
        },
        {
            path: '/dashboard',
            element: <ProtectedRoute />,
            children: renderDashboard({ userRole, isCompleted }),
        },
        {
            path: '*',
            element: <NotFoundPage />,
        },
    ]);
