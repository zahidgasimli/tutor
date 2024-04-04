import { Box, Button, Divider, Paper, Theme, Typography, styled } from '@mui/material';
import { Link } from 'components/link';
import { RatioBox } from 'components/ratio-box';
import { RichText } from 'components/rich-text';
import { useAuthStore } from 'context/auth/store';
import { Course } from 'queries/use-courses';
import { CourseWishlistButton } from './course-wishlist-button';
// import { CourseRating } from './course-rating';

type CourseItemProps = {
    course: Course & { rating?: number };
    type?: 1 | 2;
};

const StyledPaper = styled(Paper)(({ theme }: { theme: Theme }) => {
    return {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transition: '.3s transform',
        height: '100%',
        '&:hover': {
            transform: 'scale(1.02)',
        },
        '& .course-cover-image': {
            width: '100%',
            height: '100%',
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
        },
        '& .course-price': {
            position: 'absolute',
            top: theme.spacing(2.5),
            left: theme.spacing(2.5),
            color: '#fff',
            padding: theme.spacing(0.75, 3),
            borderRadius: theme.shape.borderRadius,
        },
        '& .course-rating': {
            position: 'absolute',
            bottom: theme.spacing(2.5),
            left: theme.spacing(2.5),
        },
        '& .course-wishlist-button': {
            position: 'absolute',
            top: theme.spacing(2.5),
            right: theme.spacing(2.5),
        },
    };
});

export const CourseItem: React.FC<CourseItemProps> = ({ course, type = 1 }) => {
    const {
        id,
        slug,
        description,
        instructor_first_name,
        instructor_last_name,
        instructor_image,
        sub_category,
        monthly_price,
        is_in_wishlist,
    } = course;

    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const user = useAuthStore((state) => state.user);

    return (
        <Link to={`/courses/${slug}`} style={{ height: '100%' }}>
            <StyledPaper>
                <Box position="relative">
                    <RatioBox ratio={3 / 4}>
                        <div
                            className="course-cover-image"
                            style={{
                                backgroundImage: `url(${
                                    instructor_image || require('assets/images/course-placeholder.png').default
                                })`,
                            }}
                        />
                    </RatioBox>

                    <Box className="course-price" bgcolor="info.main">
                        {monthly_price} AZN
                    </Box>
                    {/* {rating && (
                        <Box className="course-rating">
                            <CourseRating rating={rating} />
                        </Box>
                    )} */}
                    {(!isLoggedIn || (isLoggedIn && user && user.isStudent)) && (
                        <CourseWishlistButton
                            course_id={id}
                            is_in_wishlist={is_in_wishlist}
                            className="course-wishlist-button"
                        />
                    )}
                </Box>
                <Divider light />
                <Box p={2} display="flex" flexDirection="column" flexGrow={1}>
                    <Box display="flex" flexDirection="column" flexGrow={1}>
                        <Typography gutterBottom color="textSecondary">
                            {sub_category}
                        </Typography>
                        <Typography sx={(theme) => theme.typography.h6} gutterBottom>
                            {instructor_first_name} {instructor_last_name}
                        </Typography>
                        {description.trim() && (
                            <Box sx={{ fontSize: { xs: 12, sm: 14 }, color: 'text.secondary' }}>
                                <RichText
                                    content={description.length > 150 ? `${description.slice(0, 150)}...` : description}
                                />
                            </Box>
                        )}
                    </Box>
                    {type === 1 && (
                        <Box display="flex" justifyContent="flex-end" mt={3}>
                            <Button size="small" variant="contained">
                                Daha çox
                            </Button>
                        </Box>
                    )}
                </Box>
            </StyledPaper>
        </Link>
    );
};
