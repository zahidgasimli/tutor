import i18n from 'i18n';
import { create, StateCreator } from 'zustand';

export type ConfirmType = 'default' | 'success' | 'error';
export type ConfirmState = {
    state: {
        open: boolean;
        type: ConfirmType;
        title: string;
        description: string;
        onConfirm?: () => void;
    };
    open: (params: Partial<Omit<ConfirmState['state'], 'open'>>) => void;
    close: () => void;
};

export const DEFAULT_CONFIRM_STATE: ConfirmState['state'] = {
    open: false,
    title: i18n.t('confirm-dialog:title'),
    description: i18n.t('confirm-dialog:description'),
    type: 'default',
};

export type SetFunction = Parameters<StateCreator<ConfirmState>>['0'];

const closeConfirmDialog = (set: SetFunction) => {
    set((state) => ({ state: { ...state.state, open: false } }));
};

export const useConfirmStore = create<ConfirmState>()((set) => ({
    state: DEFAULT_CONFIRM_STATE,
    open: ({
        title = DEFAULT_CONFIRM_STATE.title,
        description = DEFAULT_CONFIRM_STATE.description,
        type = DEFAULT_CONFIRM_STATE.type,
        onConfirm,
    }: Partial<Omit<ConfirmState['state'], 'open'>>) =>
        set((state) => ({
            state: {
                ...state.state,
                open: true,
                title,
                description,
                type,
                onConfirm: () => {
                    closeConfirmDialog(set);
                    onConfirm?.();
                },
            },
        })),
    close: () => closeConfirmDialog(set),
}));
