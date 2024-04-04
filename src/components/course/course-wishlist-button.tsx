import { Favorite, FavoriteBorderOutlined } from '@mui/icons-material';
import { IconButton, IconButtonProps, darken, styled } from '@mui/material';
import { isAxiosError } from 'axios';
import { Spinner } from 'components/spinner';
import { useNotifications } from 'context/NotificationsContext';
import { useAuthStore } from 'context/auth/store';
import { useConfirmStore } from 'context/confirm/store';
import useWishlistCourse from 'mutations/use-wishlist-course';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { extractErrorMessageFromAxiosError } from 'utils/error-helper';

export type CourseWishlistButtonProps = { is_in_wishlist?: boolean; course_id: number };

export const CourseWishlistButton: React.FC<IconButtonProps & CourseWishlistButtonProps> = ({
    is_in_wishlist,
    course_id,
    ...props
}) => {
    const { t } = useTranslation('confirm-dialog');
    const { pathname } = useLocation();
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const { notify } = useNotifications();
    const getConfirmation = useConfirmStore((state) => state.open);
    const navigate = useNavigate();

    const [isWishlisted, setIsWishlisted] = useState(!!is_in_wishlist);

    const { mutateAsync: wishlistCourse, isLoading: wishlistingCourse } = useWishlistCourse();

    const handleWishlistClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!isLoggedIn) {
            getConfirmation({
                title: t('courseWishlistTitle'),
                description: t('courseWishlistDescription'),
                onConfirm: () => navigate('/auth/sign-in', { state: { redirectPath: pathname } }),
            });
        } else {
            try {
                const response = await wishlistCourse(course_id);
                setIsWishlisted((p) => !p);
                notify({ type: 'success', message: response.data.message });
            } catch (error) {
                if (isAxiosError(error)) {
                    notify({ type: 'error', message: extractErrorMessageFromAxiosError(error) });
                }
            }
        }
    };

    return (
        <StyledIconButton
            aria-label="course favortie button"
            onClick={handleWishlistClick}
            disabled={wishlistingCourse}
            {...props}
        >
            {wishlistingCourse ? (
                <Spinner size={20} />
            ) : isWishlisted ? (
                <Favorite sx={{ color: 'warning.light' }} />
            ) : (
                <FavoriteBorderOutlined sx={{ color: 'warning.light' }} />
            )}
        </StyledIconButton>
    );
};

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    transition: '.3s',
    '&:hover': {
        backgroundColor: darken(theme.palette.background.paper, 0.05),
    },
}));
