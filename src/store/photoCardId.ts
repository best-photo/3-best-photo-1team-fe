import { create } from 'zustand';

interface PhotoCardStore {
  selectedPhotoCardId: string | null;
  setSelectedPhotoCardId: (id: string | null) => void;
}

const usePhotoCardStore = create<PhotoCardStore>((set) => ({
  selectedPhotoCardId: null,
  setSelectedPhotoCardId: (id) => set({ selectedPhotoCardId: id }),
}));

export default usePhotoCardStore;
