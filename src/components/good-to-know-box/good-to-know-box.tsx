import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Collapse, Hidden, Paper, PaperProps, Theme, Typography, styled, useMediaQuery } from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';

const StyledPaper = styled(Paper)(({ theme }) => {
    return {
        backgroundColor: 'rgba(32, 164, 243, 0.2)',
        padding: theme.spacing(5),
        height: 'fit-content',
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(3),
        },
    };
});

export type GoodToKnowBoxProps = Omit<PaperProps, 'title'> & { title: string; body: string | ReactNode };

export const GoodToKnowBox: React.FC<GoodToKnowBoxProps> = ({ title, body, ...props }) => {
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const [collapsed, setCollapsed] = useState(true);

    useEffect(() => {
        setCollapsed(isMobile);
    }, [isMobile]);

    return (
        <StyledPaper {...props}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: { xs: 'space-between', sm: 'center' },
                    cursor: { xs: 'pointer', sm: 'default' },
                }}
                onClick={() => {
                    if (!isMobile) return;
                    setCollapsed((p) => !p);
                }}
            >
                <Typography textAlign="center" color="primary" fontSize={{ xs: 20, sm: 34 }} fontWeight={600}>
                    {title}
                </Typography>
                <Hidden smUp>
                    <KeyboardArrowDownIcon
                        sx={{ ml: 2, transform: collapsed ? 'rotate(0deg)' : 'rotate(180deg)', transition: '.3s' }}
                    />
                </Hidden>
            </Box>

            <Collapse in={!collapsed}>
                <Box pt={{ xs: 4, sm: 2 }}>
                    {typeof body === 'string' ? (
                        <Typography color="textSecondary" textAlign="center">
                            {body}
                        </Typography>
                    ) : (
                        <div>{body}</div>
                    )}
                </Box>
            </Collapse>
        </StyledPaper>
    );
};
