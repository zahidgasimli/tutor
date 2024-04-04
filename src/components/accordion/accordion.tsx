import AddIcon from '@mui/icons-material/Add';
import { Box, Collapse, IconButton, SxProps, Theme, Typography } from '@mui/material';
import { ReactNode, useCallback, useState } from 'react';
import { createSx } from 'theme';

export const Accordion: React.FC<{
    title: string;
    description: string | ReactNode;
    defaultExpanded?: boolean;
}> = ({ title, description, defaultExpanded }) => {
    const [collapsed, setCollapsed] = useState(!defaultExpanded);
    const sx = makeSx({ collapsed });

    const toggleCollapse = useCallback(() => setCollapsed((p) => !p), []);

    return (
        <Box display="flex" flexDirection="column" justifyContent="center" sx={sx.root}>
            <Box
                display="flex"
                alignItems="center"
                onClick={toggleCollapse}
                sx={[sx.content, { cursor: 'pointer' }] as SxProps<Theme>}
            >
                <Typography sx={sx.title}>{title}</Typography>
                <Box>
                    <IconButton sx={sx.icon} size="small">
                        <AddIcon />
                    </IconButton>
                </Box>
            </Box>
            <Collapse in={!collapsed}>
                <Box sx={[sx.content] as SxProps<Theme>} style={{ paddingTop: 0 }}>
                    {typeof description === 'string' ? (
                        <Typography sx={sx.description}>{description}</Typography>
                    ) : (
                        description
                    )}
                </Box>
            </Collapse>
        </Box>
    );
};

const makeSx = createSx<{ collapsed: boolean }>((props) => {
    return {
        root: {
            flex: 1,
        },
        content: {
            p: { xs: 2.5, sm: 4 },
        },
        title: {
            fontSize: { xs: 18, sm: 22 },
            fontWeight: 600,
            flex: 1,
        },
        description: {
            color: 'text.secondary',
            fontSize: { xs: 14, sm: 18 },
            whiteSpace: 'pre-line',
        },
        icon: {
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: 'primary.main',
            backgroundColor: props?.collapsed ? 'transparent' : 'primary.main',
            transform: props?.collapsed ? 'rotate(0deg)' : 'rotate(45deg)',
            transition: '.3s',
            p: { xs: 0, sm: 0.125 },
            '&:hover': {
                backgroundColor: props?.collapsed ? 'transparent' : 'primary.main',
            },
            color: props?.collapsed ? 'primary.main' : '#fff',
        },
    };
});
