import { DashboardLayout } from 'layout/dashboard';
import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

const AccountPage = lazy(() => import('views/dashboard/student/account'));
const CoursesPage = lazy(() => import('views/dashboard/student/courses'));
const PaymentPage = lazy(() => import('views/dashboard/student/payment'));
const PaymentResultPage = lazy(() => import('views/dashboard/student/payment/payment-result'));

export const studentRoutes: RouteObject[] = [
    {
        element: <DashboardLayout />,
        children: [
            { index: true, element: <Navigate to="courses" replace /> },
            { path: 'account', element: <AccountPage /> },
            { path: 'courses', element: <CoursesPage /> },
            { path: 'payments', element: <PaymentPage /> },
            { path: 'payment/success', element: <PaymentResultPage status="success" /> },
            { path: 'payment/fail', element: <PaymentResultPage status="fail" /> },
            { path: 'account/complete', element: <Navigate to="/dashboard" replace /> },
        ],
    },
];
