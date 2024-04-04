import { ChevronLeft, KeyboardArrowDown, Search as SearchIcon } from '@mui/icons-material';
import {
    Box,
    Button,
    Collapse,
    CollapseProps,
    Divider,
    Grid,
    Grow,
    IconButton,
    Slider,
    Theme,
    Typography,
    TypographyProps,
    useMediaQuery,
} from '@mui/material';
import { Spinner } from 'components';
import { useCourseListStore } from 'context/course-list/store';
import { Field, Formik, useFormikContext } from 'formik';
import { Checkbox, TextField } from 'formik-mui';
import { isEmpty, isEqual, omit } from 'lodash';
import { CourseLanguage, LessonFormat, StudyType } from 'queries/types';
import useCategories from 'queries/use-categories';
import {
    CourseFilters,
    generateCourseSearchParams,
    getCourseFiltersFromSearchParams,
    initialCourseFilters,
} from 'queries/use-courses';
import { PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from 'react-use';
import { InstructorGender } from 'types';
import { CourseCategoryField } from './course-category-field';

export const CourseFilterForm = () => {
    const { t } = useTranslation();

    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

    const filters = useCourseListStore((state) => state.filters);
    const changeFilters = useCourseListStore((state) => state.changeFilters);

    const { data: categoriesData, isLoading: isCategoriesLoading } = useCategories();
    const categories = categoriesData?.data || [];

    const [searchParams, setSearchParams] = useSearchParams();

    const [newFilters, setNewFilters] = useState<CourseFilters>(initialCourseFilters);
    const [filtersCollapsed, setFiltersCollapsed] = useState(true);

    const handleFiltersChange = useCallback(() => {
        if (!isEqual(newFilters, filters)) {
            setSearchParams(generateCourseSearchParams({ ...newFilters, page: 1 }), {
                replace: true,
                preventScrollReset: true,
            });
            changeFilters({ ...newFilters, page: 1 });
        }
    }, [newFilters]);

    useDebounce(handleFiltersChange, 500, [newFilters]);

    const initialFilters: CourseFilters = useMemo(() => {
        const filtersFromSearchParams = getCourseFiltersFromSearchParams(searchParams);
        const newFilters = {
            ...initialCourseFilters,
            ...(isEmpty(filtersFromSearchParams) ? {} : filtersFromSearchParams),
        };
        return newFilters;
    }, [searchParams]);

    useEffect(() => {
        const filtersFromSearchParams = getCourseFiltersFromSearchParams(searchParams);
        const newFilters = {
            ...initialCourseFilters,
            ...(isEmpty(filtersFromSearchParams) ? {} : filtersFromSearchParams),
        };
        changeFilters(newFilters);
        setSearchParams(generateCourseSearchParams(newFilters), { replace: true, preventScrollReset: true });
    }, [searchParams]);

    useEffect(() => {
        if (isMobile) setFiltersCollapsed(true);
    }, [isMobile]);

    return (
        <Formik initialValues={initialFilters} onSubmit={setNewFilters} enableReinitialize>
            {({ resetForm, values, setFieldValue }) => (
                <Collapse in={!isMobile || (isMobile && !filtersCollapsed)} collapsedSize={40}>
                    <FilterChangeListener onValuesChange={setNewFilters} />
                    <Grid container spacing={2}>
                        <Grid item xs={12} mb={2}>
                            <Box display="flex" alignItems="center">
                                <Field
                                    component={TextField}
                                    name="query"
                                    placeholder={t('course-list:findYourInstructor')}
                                    InputProps={{ startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1 }} /> }}
                                    style={{ marginTop: 0 }}
                                    size={isMobile ? 'small' : 'medium'}
                                />
                                {isMobile && (
                                    <IconButton sx={{ ml: 2 }} onClick={() => setFiltersCollapsed((p) => !p)}>
                                        <KeyboardArrowDown
                                            fontSize="small"
                                            sx={{
                                                transform: filtersCollapsed ? 'none' : 'rotate(180deg)',
                                                transition: '.3s',
                                            }}
                                        />
                                    </IconButton>
                                )}
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <CourseFilterFormSection title={t('course-list:lessonFormat')}>
                                {Object.keys(LessonFormat).map((key) => (
                                    <label key={key} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Field
                                            component={Checkbox}
                                            name="lesson_formats"
                                            value={LessonFormat[key]}
                                            type="checkbox"
                                        />
                                        <Typography color="textSecondary">
                                            {t(`enum:LessonFormat_${LessonFormat[key]}`)}
                                        </Typography>
                                    </label>
                                ))}
                            </CourseFilterFormSection>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <Grid item xs={12}>
                            <CourseFilterFormSection title={t('course-list:studyType')}>
                                {Object.keys(StudyType).map((key) => (
                                    <label key={key} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Field
                                            component={Checkbox}
                                            name="study_types"
                                            value={StudyType[key]}
                                            type="checkbox"
                                        />
                                        <Typography color="textSecondary">
                                            {t(`enum:StudyType_${StudyType[key]}`)}
                                        </Typography>
                                    </label>
                                ))}
                            </CourseFilterFormSection>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <Grid item xs={12}>
                            <CourseFilterFormSection title={t('course-list:subjects')}>
                                {isCategoriesLoading && (
                                    <Box height={200}>
                                        <Spinner />
                                    </Box>
                                )}
                                <CourseCategoryField categories={categories} />
                            </CourseFilterFormSection>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <Grid item xs={12}>
                            <CourseFilterFormSection title={t('course-list:language')}>
                                {Object.keys(CourseLanguage).map((key) => (
                                    <label key={key} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Field
                                            component={Checkbox}
                                            name="languages"
                                            value={CourseLanguage[key]}
                                            type="checkbox"
                                        />
                                        <Typography color="textSecondary">
                                            {t(`enum:CourseLanguage_${CourseLanguage[key]}`)}
                                        </Typography>
                                    </label>
                                ))}
                            </CourseFilterFormSection>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <Grid item xs={12}>
                            <CourseFilterFormSection title={t('course-list:instructorGender')}>
                                {Object.keys(InstructorGender).map((key) => (
                                    <label key={key} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Field
                                            component={Checkbox}
                                            name="instructor_genders"
                                            value={InstructorGender[key]}
                                            type="checkbox"
                                        />
                                        <Typography color="textSecondary">
                                            {t(`enum:InstructorGender_${InstructorGender[key]}`)}
                                        </Typography>
                                    </label>
                                ))}
                            </CourseFilterFormSection>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        {/* <Grid item xs={12}>
                            <CourseFilterFormSection title={t('course-list:metroStations')} contentCollapsible>
                                {Object.keys(Metro).map((key) => (
                                    <label key={key} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Field component={Checkbox} name="metros" value={Metro[key]} type="checkbox" />
                                        <Typography color="textSecondary">{t(`enum:Metro_${Metro[key]}`)}</Typography>
                                    </label>
                                ))}
                            </CourseFilterFormSection>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid> */}

                        <Grid item xs={12}>
                            <CourseFilterFormSection title={t('course-list:price')}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Field
                                            component={TextField}
                                            type="number"
                                            name="price_min"
                                            size="small"
                                            inputProps={{
                                                min: 0,
                                                max: 299,
                                            }}
                                            InputProps={{
                                                endAdornment: (
                                                    <Typography variant="body2" fontWeight={500} ml={1}>
                                                        AZN
                                                    </Typography>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Field
                                            component={TextField}
                                            type="number"
                                            name="price_max"
                                            size="small"
                                            inputProps={{
                                                min: 1,
                                                max: 300,
                                            }}
                                            InputProps={{
                                                endAdornment: (
                                                    <Typography variant="body2" fontWeight={500} ml={1}>
                                                        AZN
                                                    </Typography>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Slider
                                            min={0}
                                            max={300}
                                            size="small"
                                            value={[values.price_min || 0, values.price_max || 0]}
                                            onChange={(_, values) => {
                                                setFieldValue('price_min', values[0]);
                                                setFieldValue('price_max', values[1]);
                                            }}
                                            valueLabelDisplay="auto"
                                            valueLabelFormat={(value) => `${value} AZN`}
                                            getAriaLabel={() => 'Price range'}
                                            getAriaValueText={(value) => `${value} AZN`}
                                        />
                                    </Grid>
                                </Grid>
                            </CourseFilterFormSection>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>

                        <Grow in={!isEqual(omit(values, ['page']), omit(initialCourseFilters, ['page']))} unmountOnExit>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={() =>
                                        resetForm({ values: { ...initialCourseFilters, page: filters.page } })
                                    }
                                >
                                    {t('course-list:clearFilters')}
                                </Button>
                            </Grid>
                        </Grow>
                    </Grid>
                </Collapse>
            )}
        </Formik>
    );
};

export const FilterChangeListener: React.FC<{ onValuesChange: (values: CourseFilters) => void }> = ({
    onValuesChange,
}) => {
    const { values } = useFormikContext<CourseFilters>();

    useEffect(() => {
        onValuesChange(values);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [values]);

    return null;
};

type CourseFilterFormSectionProps = {
    title: string;
    collapsible?: boolean;
    contentCollapsible?: boolean;
    contentCollapsedSize?: CollapseProps['collapsedSize'];
    TitleProps?: TypographyProps;
};

export const CourseFilterFormSection: React.FC<PropsWithChildren<CourseFilterFormSectionProps>> = ({
    title,
    collapsible = true,
    contentCollapsible = false,
    contentCollapsedSize = 210,
    TitleProps,
    children,
}) => {
    const [collapsed, setCollapsed] = useState(true);
    const [contentCollapsed, setContentCollapsed] = useState(true);

    const toggleCollapse = () => {
        if (!collapsible) return;
        setCollapsed((p) => !p);
    };

    const toggleContentCollapse = () => {
        if (!contentCollapsible) return;
        setContentCollapsed((p) => !p);
    };

    return (
        <Box>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{ cursor: collapsible ? 'pointer' : 'default' }}
                onClick={toggleCollapse}
            >
                <Typography fontWeight="500" {...TitleProps}>
                    {title}
                </Typography>

                {collapsible && (
                    <ChevronLeft
                        sx={{ transform: collapsed ? 'rotate(-90deg)' : 'rotate(90deg)', transition: '.3s' }}
                    />
                )}
            </Box>
            <Collapse in={!collapsed}>
                <Box mt={2}>
                    {contentCollapsible ? (
                        <>
                            <Collapse in={!contentCollapsed} collapsedSize={contentCollapsedSize}>
                                {children}
                            </Collapse>

                            <Button sx={{ mt: 1 }} fullWidth onClick={toggleContentCollapse}>
                                {contentCollapsed ? 'Daha çox' : 'Daha az'}
                            </Button>
                        </>
                    ) : (
                        children
                    )}
                </Box>
            </Collapse>
        </Box>
    );
};
