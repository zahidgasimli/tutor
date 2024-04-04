import { Box } from '@mui/material';
import { useAuthStore } from 'context/auth/store';
import { useEffect } from 'react';
import { shallow } from 'zustand/shallow';
import { BeAnInstructorSection, BenefitsSection, HeroSection, InfoSection } from './components';
import { CoursesSection } from './components/courses-section';
import { parse } from 'query-string';
import { useLayoutStore } from 'context/layout/store';

export const Home: React.FC = () => {
    const { isLoggedIn, user } = useAuthStore((state) => ({ isLoggedIn: state.isLoggedIn, user: state.user }), shallow);
    const hideFooter = useLayoutStore((state) => state.hideFooter);

    const showTeacherSection = isLoggedIn && user?.role !== 'INSTRUCTOR';

    useEffect(() => {
        const isInsideWebview = parse(location.search).webview === 'true';
        if (isInsideWebview) {
            hideFooter();
        }
    }, [location]);

    return (
        <Box display="flex" flexDirection="column">
            <HeroSection />
            {showTeacherSection && <BeAnInstructorSection />}
            <InfoSection />
            <CoursesSection />
            <BenefitsSection />
        </Box>
    );
};
