import { Avatar, Box, BoxProps, Divider, Hidden, Popover, Typography } from '@mui/material';
import { LogoutButton } from 'components/layout/components/logout-button';
import { useAuthStore } from 'context/auth/store';
import { useState } from 'react';
import { MenuItems } from '../../components/menu-items';

export const HeaderProfile: React.FC<BoxProps> = ({ ...props }) => {
    const [anchorEl, setAnchorEl] = useState<(EventTarget & HTMLDivElement) | null>(null);
    const open = Boolean(anchorEl);
    const user = useAuthStore((state) => state.user);

    const openMenu = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => setAnchorEl(event.currentTarget);
    const closeMenu = () => setAnchorEl(null);

    if (!user) {
        return null;
    }

    return (
        <>
            <Box
                onClick={openMenu}
                display="flex"
                alignItems="center"
                sx={{ color: 'primary.main', cursor: 'pointer', py: 1.5, px: 1 }}
                {...props}
            >
                <Avatar sx={{ width: 32, height: 32, mr: { xs: 0, md: 1 } }} src={user.avatarUrl} />
                <Hidden mdDown>
                    <Typography fontWeight="600" fontSize="0.875rem">
                        {user.firstName}
                    </Typography>
                </Hidden>
            </Box>

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={closeMenu}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                PaperProps={{ sx: { maxWidth: 300, width: '100%', color: 'text.secondary' } }}
                disableScrollLock
            >
                <MenuItems onClose={closeMenu} />
                <Divider light />
                <LogoutButton />
            </Popover>
        </>
    );
};
