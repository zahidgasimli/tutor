import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import TelegramIcon from '@mui/icons-material/Telegram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Box, Container, ContainerProps, Divider, Grid, IconButton, Typography, styled } from '@mui/material';
import { WhiteLogo } from 'config';
import { useLayoutStore } from 'context/layout/store';
import { Link } from 'react-router-dom';
import { NewsletterSubscribe } from './newsletter-subscribe';

const Root = styled('footer')(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(3),
    color: '#fff',
    [theme.breakpoints.down('md')]: {
        paddingBottom: theme.spacing(5),
    },
}));

export const Footer: React.FC<
    // eslint-disable-next-line @typescript-eslint/ban-types
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, {}> & { maxWidth?: ContainerProps['maxWidth'] }
> = ({ maxWidth }) => {
    const headerWidth = useLayoutStore((state) => state.headerWidth);

    return (
        <Root>
            <Container sx={{ transition: '.3s' }} maxWidth={maxWidth || headerWidth}>
                <Grid container spacing={{ xs: 5, md: 3 }}>
                    <Grid item xs={12} sm={6} md={3}>
                        <img src={WhiteLogo} style={{ width: 116 }} width={116} height={30} alt="Tutor logo" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={5}>
                        <Box display="flex" alignItems="center">
                            <PhoneOutlinedIcon />
                            <Typography ml={2}>
                                <a style={{ color: 'inherit', textDecoration: 'none' }} href="tel:+994513314160">
                                    +994(51)331-41-60
                                </a>
                            </Typography>
                        </Box>
                        <Box mt={2} display="flex" alignItems="center">
                            <EmailOutlinedIcon />
                            <Typography ml={2}>
                                <a style={{ color: 'inherit', textDecoration: 'none' }} href="mailto:info@tutor.az">
                                    info@tutor.az
                                </a>
                            </Typography>
                        </Box>
                        <Box mt={2} display="flex" alignItems="center">
                            <LocationOnOutlinedIcon />
                            <Typography ml={2}>17 Abbasgulu Abbaszadeh, Baku</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <NewsletterSubscribe />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography fontWeight={600}>Bizi izləyin</Typography>

                        <Box mt={2}>
                            {socialMediaApps.map((app) => (
                                <a
                                    key={app.url}
                                    style={{ color: 'inherit', textDecoration: 'none' }}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={app.url}
                                    aria-label={app.aria}
                                >
                                    <IconButton
                                        sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: '#fff', mr: 1 }}
                                        size="large"
                                        aria-label={app.aria}
                                    >
                                        {app.icon}
                                    </IconButton>
                                </a>
                            ))}
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
                            <Typography mr={3} gutterBottom variant="body2">
                                Copyright © 2022 Tutor. All Rights Reserved.
                            </Typography>

                            <Typography
                                variant="body2"
                                gutterBottom
                                color="#fff"
                                component={Link}
                                to="/privacy-policy"
                                sx={{ textDecoration: 'none' }}
                            >
                                Privacy Policy
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Root>
    );
};

const socialMediaApps = [
    {
        icon: <FacebookOutlinedIcon fontSize="small" />,
        url: 'https://www.facebook.com/profile.php?id=100092511727791',
        aria: 'Facebook page',
    },
    {
        icon: <LinkedInIcon fontSize="small" />,
        url: 'https://www.linkedin.com/company/tutor-az/',
        aria: 'Linkedin page',
    },
    {
        icon: <InstagramIcon fontSize="small" />,
        url: 'https://www.instagram.com/tutor.azz/',
        aria: 'Instagram page',
    },
    {
        icon: <YouTubeIcon fontSize="small" />,
        url: 'https://www.youtube.com/@tutorazacademy4251',
        aria: 'Youtube channel',
    },
    {
        icon: <TelegramIcon fontSize="small" />,
        url: 'https://www.t.me/tutoraz',
        aria: 'Telegram chat link',
    },
];
