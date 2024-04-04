import { DashboardLayout } from 'layout/dashboard';
import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

const AccountPage = lazy(() => import('views/dashboard/instructor/account'));
const CoursesPage = lazy(() => import('views/dashboard/instructor/courses'));
const CourseCreatePage = lazy(() => import('views/dashboard/instructor/courses/create'));
const CourseUpdatePage = lazy(() => import('views/dashboard/instructor/courses/update'));
const CourseCopyPage = lazy(() => import('views/dashboard/instructor/courses/copy'));
const ControlPanelPage = lazy(() => import('views/dashboard/instructor/control-panel'));
// const PaymentPage = lazy(() => import('views/dashboard/instructor/payment'));

export const instructorRoutes: RouteObject[] = [
    {
        element: <DashboardLayout />,
        children: [
            { index: true, element: <Navigate to="courses" replace /> },
            { path: 'account', element: <AccountPage /> },
            {
                path: 'courses',
                children: [
                    {
                        index: true,
                        element: <CoursesPage />,
                    },
                    {
                        path: 'create',
                        element: <CourseCreatePage />,
                    },
                    {
                        path: 'update/:id',
                        element: <CourseUpdatePage />,
                    },
                    {
                        path: 'copy/:id',
                        element: <CourseCopyPage />,
                    },
                ],
            },
            { path: 'control-panel', element: <ControlPanelPage /> },
            // { path: 'payments', element: <PaymentPage /> },
            { path: 'account/complete', element: <Navigate to="/dashboard" replace /> },
        ],
    },
];
