import { Box, Divider, Paper, Skeleton, styled } from '@mui/material';
import { RatioBox } from 'components/ratio-box';

const StyledPaper = styled(Paper)(() => {
    return {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transition: '.3s transform',
        height: '100%',
        '&:hover': {
            transform: 'scale(1.02)',
        },
    };
});

type CourseItemSkeletonProps = {
    type?: 1 | 2;
};

export const CourseItemSkeleton: React.FC<CourseItemSkeletonProps> = ({ type }) => {
    return (
        <StyledPaper>
            <Box position="relative">
                <RatioBox ratio={3 / 4}>
                    <Skeleton variant="rectangular" width="100%" height="100%" />
                </RatioBox>
            </Box>
            <Divider light />
            <Box p={2} display="flex" flexDirection="column" flexGrow={1}>
                <Box display="flex" flexDirection="column" flexGrow={1}>
                    <Skeleton width="40%" height={24} style={{ marginBottom: 5 }} />
                    <Skeleton width="50%" height={32} />
                    <Skeleton width="100%" height={20.75} style={{ marginBottom: 3 }} />
                    <Skeleton width="100%" height={20.75} style={{ marginBottom: 3 }} />
                    <Skeleton width="100%" height={20.75} style={{ marginBottom: 3 }} />
                    <Skeleton width="100%" height={20.75} />
                </Box>
                {type === 1 && (
                    <Box display="flex" justifyContent="flex-end" mt={3}>
                        <Skeleton variant="rectangular" width={110} height={36} style={{ borderRadius: 12 }} />
                    </Box>
                )}
            </Box>
        </StyledPaper>
    );
};
