import { ContainerProps } from '@mui/material';
import { create, StateCreator } from 'zustand';

export type LayoutState = {
    headerWidth: ContainerProps['maxWidth'];
    changeHeaderWidth: (width: ContainerProps['maxWidth']) => void;
    resetHeaderWidth: () => void;
    footerShown: boolean;
    hideFooter: () => void;
};

export type SetFunction = Parameters<StateCreator<LayoutState>>['0'];

export const DEFAULT_HEADER_WIDTH: ContainerProps['maxWidth'] = 'lg';

export const useLayoutStore = create<LayoutState>()((set) => ({
    headerWidth: DEFAULT_HEADER_WIDTH,
    changeHeaderWidth: (width) => set({ headerWidth: width }),
    resetHeaderWidth: () => set({ headerWidth: DEFAULT_HEADER_WIDTH }),
    footerShown: true,
    hideFooter: () => set({ footerShown: false }),
}));
