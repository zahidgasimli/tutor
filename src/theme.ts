import { createTheme, Theme } from '@mui/material/styles';
import { createBreakpoints, SxProps } from '@mui/system';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import { PaletteType } from 'context/settings/store';

declare module '@mui/material/styles' {
    interface Theme {
        dark: boolean;
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
        dark?: boolean;
    }
}

const breakpoints = createBreakpoints({});

const theme = (mode: PaletteType): Theme => {
    const isDarkMode = mode === PaletteType.DARK;
    return createTheme({
        dark: isDarkMode,
        shape: {
            borderRadius: 16,
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    html: {
                        fontSize: 16,
                    },
                },
            },
            // MuiPaper: {
            //     styleOverrides: {
            //         root: {
            //             transition: '.3s all',
            //         },
            //     },
            // },
            MuiButton: {
                styleOverrides: {
                    root: {
                        textTransform: 'none',
                    },
                    sizeMedium: {
                        height: 48,
                        padding: '14.5px 24px',
                    },
                    sizeSmall: {
                        height: 36,
                        padding: '12.5px 24px',
                    },
                },
            },
            MuiTextField: {
                defaultProps: {
                    margin: 'none',
                    variant: 'outlined',
                    fullWidth: true,
                },
            },
            MuiDatePicker: {
                defaultProps: {
                    slotProps: {
                        popper: {
                            placement: 'top',
                        },
                    },
                },
            },
            MuiDialogTitle: {
                styleOverrides: {
                    root: {
                        padding: '16px 24px',
                    },
                },
            },
            MuiDialogContent: {
                styleOverrides: {
                    root: {
                        padding: '16px 24px !important',
                    },
                },
            },
            MuiDialogActions: {
                styleOverrides: {
                    root: {
                        padding: '16px 24px',
                    },
                },
            },
        },
        palette: {
            mode,
            primary: {
                main: '#155577',
                light: '#20A4F3',
            },
            secondary: {
                main: 'rgb(255, 107, 53)',
                contrastText: '#fff',
            },
            info: {
                main: '#20A4F3',
                contrastText: '#fff',
            },
            background: {
                default: isDarkMode ? '#121212' : '#F9FAFC',
            },
        },
        typography: {
            fontFamily: ['Poppins', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
            h1: {
                fontSize: 56,
                lineHeight: '70px',
                fontWeight: 700,
                [breakpoints.down('sm')]: {
                    fontSize: 36,
                    lineHeight: '45px',
                },
            },
            h2: {
                fontSize: 48,
                fontWeight: 700,
                [breakpoints.down('sm')]: {
                    fontSize: 28,
                },
            },
            h3: {
                fontSize: 40,
                fontWeight: 700,
                [breakpoints.down('sm')]: {
                    fontSize: 24,
                },
            },
            h4: {
                fontSize: 34,
                fontWeight: 700,
                [breakpoints.down('sm')]: {
                    fontSize: 22,
                },
            },
            h5: {
                fontSize: 28,
                fontWeight: 700,
                [breakpoints.down('sm')]: {
                    fontSize: 20,
                },
            },
            h6: {
                fontSize: 20,
                fontWeight: 700,
                [breakpoints.down('sm')]: {
                    fontSize: 18,
                },
            },
        },
        shadows: [
            'none',
            '0px 2px 20px rgba(0, 0, 0, 0.02)',
            '0px 2px 20px rgba(0, 0, 0, 0.04)',
            '0px 4px 40px rgba(0, 0, 0, 0.08)',
            '0px 4px 40px rgba(0, 0, 0, 0.08)',
            '0px 4px 40px rgba(0, 0, 0, 0.08)',
            '0px 4px 40px rgba(0, 0, 0, 0.08)',
            '0px 4px 40px rgba(0, 0, 0, 0.08)',
            '0px 4px 40px rgba(0, 0, 0, 0.08)',
            '0px 4px 40px rgba(0, 0, 0, 0.08)',
            '0px 4px 40px rgba(0, 0, 0, 0.08)',
            '0px 4px 40px rgba(0, 0, 0, 0.08)',
            '0px 4px 40px rgba(0, 0, 0, 0.08)',
            '0px 4px 40px rgba(0, 0, 0, 0.08)',
            '0px 4px 40px rgba(0, 0, 0, 0.08)',
            '0px 4px 40px rgba(0, 0, 0, 0.08)',
            '0px 4px 40px rgba(0, 0, 0, 0.08)',
            '0px 4px 40px rgba(0, 0, 0, 0.08)',
            '0px 4px 40px rgba(0, 0, 0, 0.08)',
            '0px 4px 40px rgba(0, 0, 0, 0.08)',
            '0px 4px 40px rgba(0, 0, 0, 0.08)',
            '0px 4px 40px rgba(0, 0, 0, 0.08)',
            '0px 4px 40px rgba(0, 0, 0, 0.08)',
            '0px 4px 40px rgba(0, 0, 0, 0.08)',
            '0px 4px 40px rgba(0, 0, 0, 0.08)',
        ],
    });
};

type Sx<SxKey extends string = string> = Record<SxKey, SxProps<Theme>>;

const createSx = <Props = Record<string, unknown>, SxKey extends string = string>(
    makeSx: (props?: Props) => Sx<SxKey>,
) => {
    return makeSx;
};

export default theme;
export { createSx };
export type { Sx };
