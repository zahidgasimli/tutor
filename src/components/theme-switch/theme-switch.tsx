import { Switch, SwitchProps } from '@mui/material';
import { styled, Theme } from '@mui/material/styles';
import { useSettingsStore } from 'context/settings/store';

const SwitchWithIcons = styled((props: SwitchProps) => (
    <Switch
        focusVisibleClassName=".Mui-focusVisible"
        disableRipple
        inputProps={{ 'aria-label': 'switch theme' }}
        {...props}
    />
))(({ theme }: { theme: Theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& .MuiSwitch-thumb:before': {
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                backgroundImage: `url(${require('assets/moon.svg').default})`,
            },
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.primary.dark,
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
        backgroundColor: '#fff',
        '&:before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            backgroundImage: `url(${require('assets/sun.svg').default})`,
        },
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: '#E9E9EA',
        opacity: 1,
    },
}));

export const ThemeSwitch: React.FC = () => {
    const isDarkMode = useSettingsStore((state) => state.isDarkMode);
    const toggleTheme = useSettingsStore((state) => state.toggleTheme);
    return <SwitchWithIcons checked={isDarkMode} onChange={toggleTheme} />;
};
