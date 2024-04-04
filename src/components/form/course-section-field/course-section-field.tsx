import CloseIcon from '@mui/icons-material/Close';
import {
    Box,
    Button,
    FormHelperText,
    Grid,
    IconButton,
    InputLabel,
    Paper,
    PaperProps,
    Typography,
    TypographyProps,
    alpha,
    darken,
    useTheme,
} from '@mui/material';
import { TimeField } from '@mui/x-date-pickers';
import { DateTime } from 'luxon';
import { CourseSection, CourseSectionTimeRange } from 'queries/types';
import { useEffect, useState } from 'react';
import FlipMove from 'react-flip-move';
import { useTranslation } from 'react-i18next';
import { Weekday } from 'types';

export type CourseSectionFieldProps = Omit<PaperProps, 'title' | 'onChange' | 'onBlur'> & {
    title?: string;
    TitleProps?: TypographyProps;
    value: CourseSection[];
    onChange?: (value: CourseSection[]) => void;
    onBlur?: () => void;
    readonly?: boolean;
    error?: string | { start_time?: string; end_time?: string }[] | undefined;
};

const sortByWeekday = Object.values(Weekday).reduce((obj, item, index) => {
    return {
        ...obj,
        [item]: index,
    };
}, {});

export const CourseSectionField: React.FC<CourseSectionFieldProps> = ({
    title,
    TitleProps,
    value,
    onChange,
    onBlur,
    readonly,
    error,
    ...props
}) => {
    const { t } = useTranslation();
    const theme = useTheme();
    const [sections, setSections] = useState(value);

    const buttonColor = theme.palette.primary.main;
    const buttonBackgroundColor = alpha(theme.palette.primary.main, 0.08);

    const handleSectionSelect = (week_day: Weekday) => {
        if (readonly) return;
        const isPresentInSections = !!sections.find((section) => section.week_day === week_day);
        if (isPresentInSections) return;
        removeSectionsWithoutValue();
        setSections((prev) =>
            [...prev, { week_day, start_time: '', end_time: '' }].sort(
                (a, b) => sortByWeekday[a.week_day] - sortByWeekday[b.week_day],
            ),
        );
        onBlur?.();
    };

    const handleSectionValueSelect = (week_day: Weekday, timeRange: Partial<CourseSectionTimeRange>) => {
        if (readonly) return;
        setSections((prev) =>
            prev.map((section) =>
                section.week_day === week_day
                    ? {
                          ...section,
                          start_time: timeRange.start_time || section.start_time,
                          end_time: timeRange.end_time || section.end_time,
                      }
                    : section,
            ),
        );
        onBlur?.();
    };

    const removeSectionsWithoutValue = () => {
        if (readonly) return;
        const sectionsWithoutValue = sections.filter((section) => !section.start_time && !section.end_time);
        sectionsWithoutValue.forEach((section) => handleSectionRemove(section.week_day));
    };

    const handleSectionRemove = (week_day: Weekday) => {
        if (readonly) return;
        const filteredSections = sections.filter((section) => section.week_day !== week_day);
        setSections(filteredSections);
        onBlur?.();
    };

    useEffect(() => {
        onChange?.(sections);
    }, [sections]);

    const customEnterAnimation: FlipMove.AnimationProp = {
        from: { transform: 'scale(0.9)', opacity: '0' },
        to: { transform: 'scale(1)', opacity: '1' },
    };
    const customLeaveAnimation: FlipMove.AnimationProp = {
        from: { transform: 'scale(1)', opacity: '1' },
        to: { transform: 'scale(0.9)', opacity: '0' },
    };

    return (
        <Paper sx={{ p: 2.5 }} {...props}>
            {!!title && (
                <Typography variant="h5" mb={5} {...TitleProps}>
                    {title}
                </Typography>
            )}

            {!readonly && (
                <Box display="flex" mb={3} sx={{ overflowX: 'auto' }}>
                    {Object.values(Weekday).map((weekday, index, thisArr) => {
                        const isFilled = !!sections.find((section) => section.week_day === weekday);
                        return (
                            <Button
                                key={weekday}
                                variant="outlined"
                                onClick={() => handleSectionSelect(weekday)}
                                sx={[
                                    {
                                        flex: 1,
                                        whiteSpace: 'nowrap',
                                        mx: 0.5,
                                        ml: index === 0 ? 0 : 0.5,
                                        mr: index === thisArr.length - 1 ? 0 : 0.5,
                                        minWidth: 100,
                                    },
                                    isFilled && {
                                        bgcolor: `${buttonBackgroundColor} !important`,
                                        color: (theme) => `${theme.dark ? '#fff' : buttonColor} !important`,
                                        '&:hover': {
                                            bgcolor: darken(buttonBackgroundColor, 0.1),
                                        },
                                    },
                                ]}
                                disabled={readonly}
                                disableRipple
                            >
                                {t(`enum:WEEKDAY_${weekday}`)}
                            </Button>
                        );
                    })}
                </Box>
            )}

            <Box>
                <FlipMove
                    appearAnimation={customEnterAnimation}
                    enterAnimation={customEnterAnimation}
                    leaveAnimation={customLeaveAnimation}
                >
                    <Grid container spacing={2}>
                        {sections.map((section, index) => (
                            <Grid item xs={12} md={6} lg={4} key={section.week_day}>
                                <Paper
                                    sx={[
                                        { p: 2.5, bgcolor: 'transparent' },
                                        Array.isArray(error) && error[index] && { borderColor: 'error.main' },
                                    ]}
                                    variant="outlined"
                                >
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <Typography color="primary" fontWeight={600}>
                                            {t(`enum:WEEKDAY_${section.week_day}`)}
                                        </Typography>
                                        {!readonly && (
                                            <IconButton
                                                size="small"
                                                onClick={() => handleSectionRemove(section.week_day)}
                                            >
                                                <CloseIcon fontSize="small" />
                                            </IconButton>
                                        )}
                                    </Box>

                                    <Box mt={2} display="flex" sx={{ overflowX: 'auto' }}>
                                        <Grid container spacing={2} key={index}>
                                            <Grid item xs={12} sm={6}>
                                                <InputLabel sx={{ mb: 1, fontSize: 14 }}>
                                                    {t(`field:startHour`)}
                                                </InputLabel>
                                                <TimeField
                                                    format="HH:mm"
                                                    value={DateTime.fromFormat(
                                                        sections[index]?.start_time || '',
                                                        'HH:mm',
                                                    )}
                                                    onChange={(start_time) => {
                                                        handleSectionValueSelect(section.week_day, {
                                                            start_time: start_time?.toFormat('HH:mm'),
                                                        });
                                                    }}
                                                    disabled={readonly}
                                                />
                                                {Array.isArray(error) && error[index]?.start_time && (
                                                    <FormHelperText variant="filled" error>
                                                        {error[index].start_time}
                                                    </FormHelperText>
                                                )}
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <InputLabel sx={{ mb: 1, fontSize: 14 }}>
                                                    {t(`field:endHour`)}
                                                </InputLabel>
                                                <TimeField
                                                    format="HH:mm"
                                                    value={DateTime.fromFormat(
                                                        sections[index]?.end_time || '',
                                                        'HH:mm',
                                                    )}
                                                    onChange={(end_time) => {
                                                        handleSectionValueSelect(section.week_day, {
                                                            end_time: end_time?.toFormat('HH:mm'),
                                                        });
                                                    }}
                                                    disabled={readonly}
                                                />
                                                {Array.isArray(error) && error[index]?.end_time && (
                                                    <FormHelperText variant="filled" error>
                                                        {error[index].end_time}
                                                    </FormHelperText>
                                                )}
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </FlipMove>
            </Box>
        </Paper>
    );
};
