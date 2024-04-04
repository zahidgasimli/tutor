import { create, StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export enum PaletteType {
    DARK = 'dark',
    LIGHT = 'light',
}

export enum Language {
    AZ = 'az',
    EN = 'en',
    RU = 'ru',
}

export type SettingsState = {
    themeType: PaletteType;
    language: Language;
    isDarkMode: boolean;
    toggleTheme: () => void;
    changeLanguage: (language: Language) => void;
};

const toggleTheme = ({ set }: { set: SetFunction }) => {
    set((state) => ({
        isDarkMode: !state.isDarkMode,
        themeType: state.isDarkMode ? PaletteType.LIGHT : PaletteType.DARK,
    }));
};

const changeLanguage = ({ language, set }: { language: Language; set: SetFunction }) => {
    set({ language });
};

export type SetFunction = Parameters<StateCreator<SettingsState>>['0'];

export const useSettingsStore = create<SettingsState>()(
    devtools(
        persist(
            (set) => ({
                isDarkMode: false,
                themeType: PaletteType.LIGHT,
                language: Language.AZ,
                toggleTheme: () => toggleTheme({ set }),
                changeLanguage: (language: Language) => changeLanguage({ language, set }),
            }),
            { name: '@settings' },
        ),
    ),
);
