import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Button, Collapse, Hidden, Paper, PaperProps, Theme, Typography, useMediaQuery } from '@mui/material';
import { useState } from 'react';

export const BuySubscription: React.FC<PaperProps> = ({ sx, ...props }) => {
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const [collapsed, setCollapsed] = useState(true);
    return (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                textAlign: { xs: 'start', md: 'center', lg: 'start' },
                px: { xs: 2, md: 5, lg: 2 },
                flexDirection: { xs: 'column', sm: 'row', md: 'column', lg: 'row' },
                '& button': {
                    mt: { xs: 3, sm: 0, md: 3, lg: 0 },
                    ml: { xs: 0, sm: 1.5, md: 0, lg: 1.5 },
                },

                ...sx,
            }}
            {...props}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: { xs: 'pointer', sm: 'default' },
                }}
                onClick={() => {
                    if (!isMobile) return;
                    setCollapsed((p) => !p);
                }}
            >
                <Typography fontSize={14} fontWeight={600}>
                    Daha çox tələbə qazanmaq istəyirsiniz?
                </Typography>
                <Hidden smUp>
                    <KeyboardArrowDownIcon
                        sx={{ ml: 2, transform: collapsed ? 'rotate(0deg)' : 'rotate(180deg)', transition: '.3s' }}
                    />
                </Hidden>
            </Box>
            <Hidden smUp>
                <Box width="100%" display="flex" justifyContent="flex-end">
                    <Collapse in={!collapsed}>
                        <Button size="small" variant="contained">
                            Abonə ol
                        </Button>
                    </Collapse>
                </Box>
            </Hidden>
            <Hidden smDown>
                <Button sx={{ whiteSpace: 'nowrap', minWidth: 150 }} variant="contained">
                    Abonə ol
                </Button>
            </Hidden>
        </Paper>
    );
};
