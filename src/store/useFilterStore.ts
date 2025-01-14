import { create } from 'zustand';

export interface FilterOption {
  value: string;
  query: string;
}

export interface FilterCategory {
  value: string;
  queryString: string;
}

export type Options = Record<string, FilterOption[]>;

interface FilterStoreState {
  modalOpen: boolean;
  setModalOpen: (modalOpen: boolean) => void;
  categories: FilterCategory[];
  options: Options;
  setCategories: (categories: FilterCategory[]) => void;
  setOptions: (options: Options) => void;
  selectedCategory: FilterCategory;
  selectedOption: FilterOption;
  setSelectedCategory: (category: FilterCategory) => void;
  setSelectedOption: (option: FilterOption) => void;
  reset: () => void;
  updateQueryParams: () => string;
  onSubmitFilter: () => void;
  onSubmitCallback: (query: string) => void;
  setOnSubmitCallback: (callback: (query: string) => void) => void;
}

export const useFilterStore = create<FilterStoreState>((set, get) => ({
  modalOpen: false,
  setModalOpen: (modalOpen) =>
    set(() => ({
      modalOpen,
    })),
  categories: [],
  options: {},
  setCategories: (categories) =>
    set(() => ({
      categories,
      selectedCategory: categories?.[0] || '',
      modalOpen: false,
    })),
  setOptions: (options) =>
    set(() => ({
      options,
      selectedOption: { value: '', query: '' },
    })),
  selectedCategory: { value: '', queryString: '' },
  selectedOption: { value: '', query: '' },
  setSelectedCategory: (category) =>
    set(() => ({
      selectedCategory: category,
      selectedOption: { value: '', query: '' },
    })),
  setSelectedOption: (newOption) =>
    set((state) => ({
      selectedOption:
        newOption.query !== state.selectedOption.query
          ? newOption
          : { value: '', query: '' },
    })),
  reset: () =>
    set(() => ({
      selectedOption: { value: '', query: '' },
    })),
  updateQueryParams: () => {
    const state = get();
    const params = new URLSearchParams();
    const query = state.selectedOption.query;
    params.set(state.selectedCategory.queryString, query);

    if (query.length) return params.toString();
    return '';
  },
  onSubmitFilter: () => {
    const state = get();
    const query = state.updateQueryParams();
    if (typeof state.onSubmitCallback === 'function') {
      state.onSubmitCallback(query);
    }
  },
  onSubmitCallback: () => {},
  setOnSubmitCallback: (callback) =>
    set(() => ({
      onSubmitCallback: callback,
    })),
}));
