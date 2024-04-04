import {
    Avatar,
    Box,
    Divider,
    Hidden,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Paper,
    Typography,
} from '@mui/material';
import { RichText } from 'components/rich-text';
import { Spinner } from 'components/spinner';
import { DateTime } from 'luxon';
import useNotifications from 'queries/use-notifications';
import React from 'react';
import { toRelative } from 'utils/dateTimeHelper';

const NOTIFICATION_ITEM_MIN_HEIGHT = 240 / 3;

export const NotificationList = () => {
    const { data: notifications = [], isLoading } = useNotifications();

    const renderContent = () => {
        if (isLoading) {
            return (
                <Box height={200}>
                    <Spinner />
                </Box>
            );
        }
        if (notifications.length === 0) {
            return (
                <Box display="flex" justifyContent="center" alignItems="center" textAlign="center" height={200}>
                    <Typography variant="h6">Bildirişiniz yoxdur</Typography>
                </Box>
            );
        }
        return (
            <List
                disablePadding
                sx={{
                    height: NOTIFICATION_ITEM_MIN_HEIGHT * 3,
                    maxHeight: NOTIFICATION_ITEM_MIN_HEIGHT * 3,
                    overflowY: 'auto',
                }}
            >
                {notifications.map((notification, index) => (
                    <React.Fragment key={index}>
                        <ListItem sx={{ minHeight: NOTIFICATION_ITEM_MIN_HEIGHT }}>
                            <Hidden lgDown>
                                <ListItemAvatar>
                                    <Avatar />
                                </ListItemAvatar>
                            </Hidden>
                            <ListItemText
                                primary={notification.title}
                                secondary={<RichText content={notification.description} />}
                            />
                            <Typography variant="body2" color="textSecondary" textAlign="right" ml={2} minWidth={100}>
                                {toRelative(DateTime.fromISO(notification.created_at))}
                            </Typography>
                        </ListItem>
                        {index !== notifications.length - 1 && <Divider variant="inset" component="li" />}
                    </React.Fragment>
                ))}
            </List>
        );
    };

    return (
        <Paper sx={{ overflow: 'hidden' }}>
            <Typography p={2} variant="h6" color="primary" fontWeight={600}>
                Bildirişlər
            </Typography>

            {renderContent()}
        </Paper>
    );
};
