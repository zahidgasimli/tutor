import { useAuthStore } from 'context/auth/store';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export const InstructorPreventRoute = () => {
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);

    useEffect(() => {
        if (user?.role === 'INSTRUCTOR') {
            navigate('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <Outlet />;
};
