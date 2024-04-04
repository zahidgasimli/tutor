import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import LinkedinIcon from '@mui/icons-material/LinkedIn';
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Box, BoxProps, IconButton, styled } from '@mui/material';
import { socialShareLink } from 'config';

type SocialShareButtonsProps = BoxProps & {
    url: string;
};

const Root = styled(Box)(({ theme }) => {
    return {
        display: 'flex',
        '& a:first-of-type': {
            marginRight: theme.spacing(1),
            [theme.breakpoints.down('sm')]: {
                marginRight: theme.spacing(0.5),
            },
        },
        '& a:not(:first-of-type):not(:last-of-type)': {
            margin: theme.spacing(0, 1),
            [theme.breakpoints.down('sm')]: {
                margin: theme.spacing(0, 0.5),
            },
        },
        '& a:last-of-type': {
            marginLeft: theme.spacing(1),
            [theme.breakpoints.down('sm')]: {
                marginLeft: theme.spacing(0.5),
            },
        },
    };
});

export const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({ url, ...props }) => {
    return (
        <Root {...props}>
            <a rel="noreferrer noopener" target="_blank" href={socialShareLink.facebook(url)}>
                <IconButton>
                    <FacebookOutlinedIcon />
                </IconButton>
            </a>
            <a rel="noreferrer noopener" target="_blank" href={socialShareLink.whatsappMobile(url)}>
                <IconButton>
                    <WhatsAppIcon />
                </IconButton>
            </a>
            <a rel="noreferrer noopener" target="_blank" href={socialShareLink.twitter(url)}>
                <IconButton>
                    <TwitterIcon />
                </IconButton>
            </a>
            <a rel="noreferrer noopener" target="_blank" href={socialShareLink.linkedin(url)}>
                <IconButton>
                    <LinkedinIcon />
                </IconButton>
            </a>
            <a rel="noreferrer noopener" target="_blank" href={socialShareLink.telegram(url)}>
                <IconButton>
                    <TelegramIcon />
                </IconButton>
            </a>
        </Root>
    );
};
