import { Box, Breakpoint, Button, Theme, useMediaQuery } from '@mui/material';

export type CourseTab = 'courses' | 'applicatons';

export type Tab<T> = { value: T; label: string; shortLabel?: string; labelBreakpoint?: Breakpoint };

export type CourseTabsProps<T> = {
    tabs: Tab<T>[];
    value: T;
    onTabChange: (tab: T) => void;
    loading?: boolean;
};

export const PageTabs = <T,>({ tabs, value, onTabChange, loading }: CourseTabsProps<T>) => {
    return (
        <Box display="flex">
            {tabs.map((tab, index) => {
                const isFirst = index === 0;
                const isLast = index === tabs.length - 1;
                const isActive = tab.value === value && !loading;
                return (
                    <Button
                        key={index}
                        fullWidth
                        color="secondary"
                        variant={isActive ? 'contained' : 'outlined'}
                        onClick={() => {
                            if (isActive) return;
                            onTabChange(tab.value);
                        }}
                        sx={isFirst ? { mr: 1 } : isLast ? { ml: 1 } : { mx: 1 }}
                    >
                        <TabLabel label={tab.label} shortLabel={tab.shortLabel} labelBreakpoint={tab.labelBreakpoint} />
                    </Button>
                );
            })}
        </Box>
    );
};

export const TabLabel = <T,>({ label, shortLabel, labelBreakpoint = 'sm' }: Omit<Tab<T>, 'value'>) => {
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down(labelBreakpoint));
    return <>{shortLabel && isMobile ? shortLabel : label}</>;
};
