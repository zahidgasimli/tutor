import {
    Avatar,
    Box,
    Divider,
    Hidden,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Paper,
    Typography,
} from '@mui/material';
import { Link } from 'components/link';
import { Spinner } from 'components/spinner';
import useWishlistedCourses from 'queries/use-wishlisted-courses';
import React from 'react';

const WISHLIST_ITEM_MIN_HEIGHT = 240 / 3;

export const WishlistedCoursesList = () => {
    const { data: wishlistedCoursesData, isLoading } = useWishlistedCourses();

    const wishlistedCourses = wishlistedCoursesData?.data?.courses || [];

    const renderContent = () => {
        if (isLoading) {
            return (
                <Box height={200}>
                    <Spinner />
                </Box>
            );
        }
        if (wishlistedCourses.length === 0) {
            return (
                <Box display="flex" justifyContent="center" alignItems="center" textAlign="center" height={200}>
                    <Typography variant="h6">Bəyəndiyiniz kurs yoxdur</Typography>
                </Box>
            );
        }
        return (
            <List
                disablePadding
                sx={{
                    height: WISHLIST_ITEM_MIN_HEIGHT * 3,
                    maxHeight: WISHLIST_ITEM_MIN_HEIGHT * 3,
                    overflowY: 'auto',
                }}
            >
                {wishlistedCourses.map((wishlistedCourse, index) => (
                    <React.Fragment key={index}>
                        <Link to={`/courses/${wishlistedCourse.slug}`}>
                            <ListItemButton sx={{ minHeight: WISHLIST_ITEM_MIN_HEIGHT }}>
                                <Hidden lgDown>
                                    <ListItemAvatar>
                                        <Avatar src={wishlistedCourse.instructor_image || undefined} />
                                    </ListItemAvatar>
                                </Hidden>
                                <ListItemText
                                    primary={wishlistedCourse.title}
                                    secondary={
                                        wishlistedCourse.instructor_first_name +
                                        ' ' +
                                        wishlistedCourse.instructor_last_name
                                    }
                                    primaryTypographyProps={{ fontSize: 15, fontWeight: 600, color: 'primary' }}
                                    secondaryTypographyProps={{ fontWeight: 500 }}
                                />
                                <Hidden lgDown>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        textAlign="right"
                                        ml={2}
                                        minWidth={100}
                                    >
                                        {wishlistedCourse.monthly_price} AZN
                                    </Typography>
                                </Hidden>
                            </ListItemButton>
                        </Link>
                        {index !== wishlistedCourses.length - 1 && <Divider variant="inset" component="li" />}
                    </React.Fragment>
                ))}
            </List>
        );
    };

    return (
        <Paper sx={{ overflow: 'hidden' }}>
            <Typography p={2} variant="h6" color="primary" fontWeight={600}>
                Bəyəndiklərim
            </Typography>

            {renderContent()}
        </Paper>
    );
};
