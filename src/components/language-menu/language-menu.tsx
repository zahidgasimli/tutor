import { styled } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectProps } from '@mui/material/Select';
import { Language, useSettingsStore } from 'context/settings/store';
import { useTranslation } from 'react-i18next';

const Root = styled(Select)(({ theme }) => ({
    '&.MuiOutlinedInput-root': {
        '& fieldset': {
            border: 'none',
        },
        '&.Mui-focused fieldset': {
            border: 'none',
        },
        '& .MuiSelect-select': {
            padding: theme.spacing(0.25, 1),
            fontSize: '0.75rem',
            backgroundColor: theme.palette.primary.dark,
            color: '#fff',
            borderRadius: theme.spacing(1),
        },
        '& .MuiSvgIcon-root': {
            color: '#fff',
        },
    },
}));

const MenuItemComponent = styled(MenuItem)(({ theme }) => ({
    '&.MuiMenuItem-root': {
        fontSize: '0.75rem',
        paddingTop: theme.spacing(0.5),
        paddingBottom: theme.spacing(0.5),
    },
}));

export const LanguageMenu: React.FC<SelectProps> = ({ className }) => {
    const language = useSettingsStore((state) => state.language);
    const changeLanguage = useSettingsStore((state) => state.changeLanguage);
    const { i18n } = useTranslation();

    const handleChange: SelectProps['onChange'] = (event) => {
        changeLanguage(event.target.value as Language);
        i18n.changeLanguage(event.target.value as Language);
    };

    const languages = {
        az: { name: 'Azərbaycanca', shortName: 'AZ' },
        en: { name: 'English', shortName: 'EN' },
        ru: { name: 'Русский', shortName: 'РУ' },
    };

    return (
        <Root className={className} value={language} onChange={handleChange} MenuProps={{ disableScrollLock: true }}>
            {Object.keys(languages).map((key) => (
                <MenuItemComponent key={key} value={key}>
                    {languages[key].shortName}
                </MenuItemComponent>
            ))}
        </Root>
    );
};
