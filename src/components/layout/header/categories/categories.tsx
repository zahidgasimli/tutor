import CategoryIcon from '@mui/icons-material/Category';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Box, BoxProps, darken, Divider, lighten, Popover, SxProps, Theme, Typography } from '@mui/material';
import { Link } from 'components/link';
import { Spinner } from 'components/spinner';
import useCategories, { Category } from 'queries/use-categories';
import { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createSx } from 'theme';

const makeSx = createSx(() => ({
    anchor: {
        p: 2,
        display: 'flex',
        alignItems: 'center',
        color: 'text.secondary',
        cursor: 'pointer',
        transition: '.3s',
        '&:hover, &:active, &:focus': {
            color: 'primary.main',
        },
    },
    categoryItem: {
        p: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        transition: '.3s',
    },
    subcategoryItem: {
        '&:hover': {
            bgcolor: (theme) => {
                const colorTransform = theme.dark ? lighten : darken;
                return colorTransform(theme.palette.background.paper, 0.1);
            },
            color: 'primary.main',
        },
    },
    popover: {
        pointerEvents: 'none',
    },
    popoverPaper: {
        pointerEvents: 'auto',
        maxWidth: 250,
        width: '100%',
        transition: '.3s border-radius, .3s transform, .3s opacity !important',
    },
    subcategoryPopoverPaper: {
        borderTopLeftRadius: 0,
    },
}));

export const Categories: React.FC<BoxProps & { onCategoryClick?: () => void; verticalDivider?: boolean }> = ({
    sx: externalSX,
    onCategoryClick,
    verticalDivider,
    ...props
}) => {
    const { t } = useTranslation('header');
    const sx = makeSx();
    const popoverAnchor = useRef(null);
    const { data: categoryData, isLoading } = useCategories();

    const categories = categoryData?.data || [];

    const [openedPopover, setOpenedPopover] = useState(false);
    const [activeCategoryIndex, setActiveCategoryIndex] = useState<number | null>(null);

    const popoverEnter = useCallback(() => setOpenedPopover(true), []);
    const popoverLeave = useCallback(() => {
        setOpenedPopover(false);
        setActiveCategoryIndex(null);
    }, []);

    return (
        <Box>
            <Box
                ref={popoverAnchor}
                sx={[sx.anchor, externalSX] as SxProps<Theme>}
                onMouseEnter={popoverEnter}
                onMouseLeave={popoverLeave}
                {...props}
            >
                <CategoryIcon fontSize="small" />
                {verticalDivider && <Divider orientation="vertical" flexItem sx={{ mr: 1, ml: 2 }} />}
                <Typography ml={1} fontWeight={500} variant="body2">
                    {t('categories')}
                </Typography>
            </Box>
            <Popover
                sx={sx.popover}
                open={openedPopover}
                anchorEl={popoverAnchor.current}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                PaperProps={{
                    onMouseEnter: popoverEnter,
                    onMouseLeave: popoverLeave,
                    sx: {
                        ...sx.popoverPaper,
                        borderTopRightRadius: (theme) => (activeCategoryIndex === 0 ? 0 : theme.shape.borderRadius),
                        borderBottomRightRadius: (theme) =>
                            activeCategoryIndex !== null && activeCategoryIndex >= 0 ? 0 : theme.shape.borderRadius,
                    } as SxProps<Theme>,
                }}
                disableScrollLock
            >
                {isLoading ? (
                    <Box height={104}>
                        <Spinner />
                    </Box>
                ) : (
                    categories.map((category, index) => (
                        <CategoryItem
                            key={category.id}
                            category={category}
                            onSubcategoriesOpened={() => setActiveCategoryIndex(index)}
                            onCategoryClick={onCategoryClick}
                        />
                    ))
                )}
            </Popover>
        </Box>
    );
};

export type CategoryItemProps = {
    category: Category;
    onSubcategoriesOpened: () => void;
    onCategoryClick?: () => void;
};

export const CategoryItem: React.FC<CategoryItemProps> = ({ category, onSubcategoriesOpened, onCategoryClick }) => {
    const sx = makeSx();
    const popoverAnchor = useRef(null);

    const [openedPopover, setOpenedPopover] = useState(false);

    const popoverEnter = useCallback(() => {
        setOpenedPopover(true);
        onSubcategoriesOpened();
    }, []);
    const popoverLeave = useCallback(() => setOpenedPopover(false), []);

    return (
        <div>
            <Link
                key={category.id}
                to={`/courses?subjects=${category.sub_categories.map((subcategory) => subcategory.id).join('%2C')}`}
                onClick={onCategoryClick}
            >
                <Box
                    ref={popoverAnchor}
                    onMouseEnter={popoverEnter}
                    onMouseLeave={popoverLeave}
                    p={2}
                    sx={{
                        ...sx.categoryItem,
                        bgcolor: openedPopover
                            ? (theme) => {
                                  const colorTransform = theme.dark ? lighten : darken;
                                  return colorTransform(theme.palette.background.paper, 0.1);
                              }
                            : 'transparent',
                        color: openedPopover ? 'primary.main' : 'text.secondary',
                    }}
                >
                    <Typography variant="body2" fontWeight={500}>
                        {category.name}
                    </Typography>
                    <KeyboardArrowRightIcon
                        fontSize="small"
                        sx={{ transform: openedPopover ? 'rotate(90deg)' : 'none', transition: '.3s' }}
                    />
                </Box>
            </Link>
            <Popover
                sx={sx.popover}
                open={openedPopover}
                anchorEl={popoverAnchor.current}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                PaperProps={{
                    onMouseEnter: popoverEnter,
                    onMouseLeave: popoverLeave,
                    sx: { ...sx.popoverPaper, ...sx.subcategoryPopoverPaper } as SxProps<Theme>,
                }}
                disableScrollLock
            >
                {category.sub_categories.map((subCategory) => (
                    <Link key={subCategory.id} to={`/courses?subjects=${subCategory.id}`} onClick={onCategoryClick}>
                        <Typography
                            variant="body2"
                            fontWeight={500}
                            sx={{ ...sx.categoryItem, ...sx.subcategoryItem } as SxProps<Theme>}
                        >
                            {subCategory.name}
                        </Typography>
                    </Link>
                ))}
            </Popover>
        </div>
    );
};
