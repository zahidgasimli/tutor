import { Box, BoxProps, Rating, SxProps, Theme, Typography } from '@mui/material';
import { Course } from 'queries/use-course';
import { memo } from 'react';
import { createSx } from 'theme';

export const getCourseRatingColor = (rating: Required<Course>['average_rating']) => {
    if (rating > 4) return 'success.light';
    if (rating > 3) return 'warning.light';
    if (rating > 2) return 'warning.dark';
    return 'error.main';
};

type CourseRatingProps = {
    course_id: Course['id'];
    rating: Course['average_rating'];
};

export const CourseRatingComponent: React.FC<BoxProps & CourseRatingProps> = ({ rating, ...props }) => {
    const sx = makeSx({ rating });

    return (
        <Box {...props} sx={{ ...sx.root, ...props.sx } as SxProps<Theme>}>
            <Rating value={rating} precision={1} readOnly />
            {rating && <Typography sx={sx.text}>{rating}</Typography>}
        </Box>
    );
};

export const CourseRating = memo(CourseRatingComponent, (oldProps, newProps) => oldProps.rating === newProps.rating);

const makeSx = createSx<{ rating: Course['average_rating'] }>((props) => {
    return {
        root: {
            display: 'flex',
            alignItems: 'center',
            '& .MuiRating-icon': {
                color: (theme) => theme.palette.warning.light,
            },
        },
        text: {
            color: '#fff',
            padding: (theme) => theme.spacing(0.35, 2.5),
            borderRadius: 8,
            marginLeft: (theme) => theme.spacing(1.5),
            fontSize: 14,
            bgcolor: props?.rating ? getCourseRatingColor(props.rating) : 'transparent',
        },
    };
});
