import { Box, BoxProps, Fade, SxProps, Theme } from '@mui/material';
import React, { useEffect, useRef } from 'react';

type StepperContentProps = BoxProps & {
    activeStep: number;
    contents: React.ReactElement[];
};

export const StepperContent: React.FC<StepperContentProps> = ({ activeStep, contents, sx, ...props }) => {
    const previousActiveStep = useRef(activeStep);

    useEffect(() => {
        previousActiveStep.current = activeStep;
    }, [activeStep]);

    return (
        <Box position="relative" overflow="hidden" sx={[{ py: 0.75 }, sx] as SxProps<Theme>} {...props}>
            {contents.map((content, index) => {
                const isActive = activeStep === index;
                return (
                    <Fade in={isActive} key={index} mountOnEnter unmountOnExit timeout={500}>
                        <Box sx={{ display: isActive ? 'block' : 'none' }}>{content}</Box>
                    </Fade>
                );
            })}
        </Box>
    );
};
