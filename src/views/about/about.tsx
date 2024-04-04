import { Box } from '@mui/material';
import { HeroSection, ValuesSection, TeachersSection, MissionSection, SuccessSection } from './components';

export const About = () => {
    return (
        <Box>
            <HeroSection />
            <ValuesSection />
            <TeachersSection />
            <MissionSection />
            <SuccessSection />
        </Box>
    );
};
