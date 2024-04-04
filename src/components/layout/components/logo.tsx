import { ButtonBase, ButtonBaseProps, styled, useMediaQuery, Theme } from '@mui/material';
import { Logo as DarkLogo, WhiteLogo, mobileSize } from 'config';
import { useSettingsStore } from 'context/settings/store';
import { useLocation, useNavigate } from 'react-router-dom';

const StyledButtonBase = styled(ButtonBase)(({ theme }) => {
    return {
        '& img': {
            width: '102px',
            transition: '.3s',
            [theme.breakpoints.down(mobileSize)]: {
                width: '80px',
            },
        },
    };
});

export const Logo: React.FC<ButtonBaseProps & { onAfterClick?: () => void }> = (props) => {
    const isMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.down(mobileSize));
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const isDarkMode = useSettingsStore((state) => state.isDarkMode);

    const handleLogoClick = () => {
        if (pathname !== '/') {
            navigate('/');
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        props.onAfterClick?.();
    };

    return (
        <StyledButtonBase disableRipple onClick={handleLogoClick} {...props}>
            <img
                src={isDarkMode ? WhiteLogo : DarkLogo}
                alt="Tutor logo"
                width={isMobile ? 80 : 102}
                height={isMobile ? 20.69 : 26.38}
                draggable={false}
            />
        </StyledButtonBase>
    );
};
