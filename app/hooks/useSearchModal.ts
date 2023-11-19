import { create } from 'zustand';
interface SearchModalStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const useSearchModal = create<SearchModalStore>(
  (set: (arg0: { isOpen: boolean }) => any) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
  })
);

export default useSearchModal;
