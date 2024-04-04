import { useAuthStore } from 'context/auth/store';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

    return isLoggedIn ? <Outlet /> : <Navigate to="/auth/sign-in" replace />;
};
