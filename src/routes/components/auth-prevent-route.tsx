import { useAuthStore } from 'context/auth/store';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export const AuthPreventRoute = () => {
    const navigate = useNavigate();
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <Outlet />;
};
