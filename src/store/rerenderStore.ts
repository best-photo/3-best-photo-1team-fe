// 임의로 리렌더링을 발생시키기 위한 스토어입니다.
// 이후 해당 스토어를 사용하지 않는 방향으로 리팩토링이 필요합니다.
import { create } from 'zustand';
interface RerenderStore {
  renderKey: number;
  setRenderKey: () => void;
}
export const useRerenderStore = create<RerenderStore>((set, get) => ({
  renderKey: 0,
  setRenderKey: () =>
    set(() => ({
      renderKey: get().renderKey + 1,
    })),
}));