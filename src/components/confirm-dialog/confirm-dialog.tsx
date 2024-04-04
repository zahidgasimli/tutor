import {
    Box,
    Button,
    ButtonProps,
    Dialog,
    DialogActions,
    DialogContent,
    Typography,
    TypographyProps,
} from '@mui/material';
import { ConfirmType, useConfirmStore } from 'context/confirm/store';
import { useTranslation } from 'react-i18next';

export const ConfirmDialog = () => {
    const { t } = useTranslation();
    const { title, description, type, onConfirm, open } = useConfirmStore((state) => state.state);
    const closeDialog = useConfirmStore((state) => state.close);

    const titlePalette: { [key in ConfirmType]: TypographyProps['color'] } = {
        default: 'inherit',
        success: 'success',
        error: 'error',
    };

    const confirmButtonPalette: { [key in ConfirmType]: ButtonProps['color'] } = {
        default: 'primary',
        success: 'success',
        error: 'error',
    };

    const cancelButtonPalette: { [key in ConfirmType]: ButtonProps['color'] } = {
        default: 'inherit',
        success: 'inherit',
        error: 'primary',
    };

    const confirmButtonVariant: { [key in ConfirmType]: ButtonProps['variant'] } = {
        default: 'contained',
        success: 'contained',
        error: 'contained',
    };

    const cancelButtonVariant: { [key in ConfirmType]: ButtonProps['variant'] } = {
        default: 'outlined',
        success: 'outlined',
        error: 'outlined',
    };

    return (
        <Dialog maxWidth="sm" fullWidth open={open} onClose={closeDialog}>
            <DialogContent>
                <Box pt={{ xs: 2, sm: 3 }} pb={{ xs: 1, sm: 3 }}>
                    <Typography variant="h5" fontWeight={700} color={titlePalette[type]} textAlign="center">
                        {title}
                    </Typography>
                    <Typography textAlign="center" color="textSecondary" mt={4}>
                        {description}
                    </Typography>
                </Box>
            </DialogContent>
            <DialogActions sx={{ pb: 4, px: 6 }}>
                <Button
                    fullWidth
                    onClick={closeDialog}
                    variant={cancelButtonVariant[type]}
                    color={cancelButtonPalette[type]}
                    autoFocus
                    sx={{ mr: 1 }}
                >
                    {t('confirm-dialog:no')}
                </Button>
                <Button
                    fullWidth
                    onClick={onConfirm}
                    variant={confirmButtonVariant[type]}
                    color={confirmButtonPalette[type]}
                >
                    {t('confirm-dialog:yes')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
