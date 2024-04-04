import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Collapse, Typography, Checkbox as MUICheckbox } from '@mui/material';
import { Field, useFormikContext } from 'formik';
import { Checkbox } from 'formik-mui';
import { Category } from 'queries/use-categories';
import { CourseFilters } from 'queries/use-courses';
import { useState } from 'react';

export const CourseCategoryField: React.FC<{ categories: Category[] }> = ({ categories }) => {
    return (
        <div>
            {categories.map((category) => (
                <CourseCategoryFieldItem key={category.id} category={category} />
            ))}
        </div>
    );
};

export const CourseCategoryFieldItem: React.FC<{ category: Category }> = ({ category }) => {
    const { values, setFieldValue } = useFormikContext<CourseFilters>();
    const [collapsed, setCollapsed] = useState(true);

    const subCategoryIds = category.sub_categories.map((sc) => sc.id.toString());

    const isAllChecked = subCategoryIds.every((sc) => values.subjects?.includes(sc));

    const onCheckAllChange = () => {
        if (!isAllChecked) {
            setFieldValue('subjects', [values.subjects?.filter((s) => !subCategoryIds.includes(s)), ...subCategoryIds]);
        } else {
            setFieldValue('subjects', [values.subjects?.filter((s) => !subCategoryIds.includes(s))]);
        }
    };

    return (
        <Box mb={collapsed ? 0 : 2} key={category.id}>
            <Box display="flex" alignItems="center" style={{ display: 'flex', alignItems: 'center' }}>
                <MUICheckbox checked={isAllChecked} onChange={onCheckAllChange} />
                <Box
                    flex={1}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ cursor: 'pointer' }}
                    onClick={() => setCollapsed((p) => !p)}
                >
                    <Typography color="textSecondary">{category.name}</Typography>
                    <KeyboardArrowDownIcon
                        sx={{ transform: collapsed ? 'none' : 'rotate(180deg)', transition: '.3s' }}
                    />
                </Box>
            </Box>
            <Collapse in={!collapsed}>
                <Box pl={3}>
                    {category.sub_categories.map((subCategory) => (
                        <label key={subCategory.id} style={{ display: 'flex', alignItems: 'center' }}>
                            <Field
                                component={Checkbox}
                                name="subjects"
                                value={subCategory.id.toString()}
                                type="checkbox"
                            />
                            <Typography color="textSecondary">{subCategory.name}</Typography>
                        </label>
                    ))}
                </Box>
            </Collapse>
        </Box>
    );
};
