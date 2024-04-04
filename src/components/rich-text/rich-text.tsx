import { Box, BoxProps, styled } from '@mui/material';
import DOMPurify from 'dompurify';

const purify = DOMPurify(window);

const StyledBox = styled(Box)(({ theme }) => {
    return {
        '& a': {
            color: theme.palette.primary.main,
        },
        '& ol,& ul': {
            listStylePosition: 'inside',
        },
    };
});

export const RichText: React.FC<BoxProps & { content: string }> = ({ content, ...props }) => {
    const purifiedText = purify.sanitize(content);
    return <StyledBox {...props} dangerouslySetInnerHTML={{ __html: purifiedText }} />;
};
