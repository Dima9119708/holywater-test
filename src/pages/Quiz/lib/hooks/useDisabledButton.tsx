import { create } from 'zustand';

interface UseDisabledButton {
    isDisabled: boolean;
    setDisabled: (value: boolean) => void;
}

export const useButtonDisabled = create<UseDisabledButton>((set) => ({
    isDisabled: true,
    setDisabled: (value) => set({ isDisabled: value }),
}));
