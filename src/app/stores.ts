import { create } from "zustand";
import {
  BlogStore,
  CodingTestStore,
  PaginationStore,
  SearchFilterStore,
  TabStore,
  TiptapStore,
} from "./_interfaces/interfaces";

// 코딩테스트 관련 전역변수
export const useCodingTestStore = create<CodingTestStore>((set) => ({
  // 코딩 관련 전역변수
  // 언어 설정
  language: undefined,
  setLanguage: (newLanguage) => set({ language: newLanguage }),
  // 정답 제출 여부
  hasSolved: false,
  setHasSolved: (isCorrect) => set({ hasSolved: isCorrect }),
  // 글 쓰기 여부
  isPosting: false,
  setIsPosting: (state) => set({ isPosting: state }),
  // 코드
  value: "",
  setValue: (code) => set({ value: code }),
  // 메모장
  memo: "",
  setMemo: (string) => set({ memo: string }),
}));

// 탭바 메뉴 관련 전역변수
export const useTabStore = create<TabStore>((set) => ({
  tab: "", // 현재 선택된 탭
  setTab: (newTab) => set({ tab: newTab }),
}));

// Tiptap Editor 내용 저장 전역변수
export const useTiptapStore = create<TiptapStore>((set) => ({
  content: "",
  setContent: (string) => set({ content: string }),
}));

// 페이지 정보 저장 전역변수
export const usePaginationStore = create<PaginationStore>((set) => ({
  page: 1,
  setPage: (newPage) => set({ page: newPage }),
  lastPage: 0,
  setLastPage: (page) => set({ lastPage: page }),
}));

// 검색 필터 저장 전역변수
export const useSearchFilterStore = create<SearchFilterStore>((set) => ({
  filter: "",
  setFilter: (selected) => set({ filter: selected }),
}));

// 블로그 정보 저장 전역변수
export const useBlogStore = create<BlogStore>((set) => ({
  blogId: 1,
  setBlogId: (id) => set({ blogId: id }),
  categoryId: 0,
  setCategoryId: (id) => set({categoryId: id}),
  subCategoryId: 0,
  setSubCategoryId: (id) => set({subCategoryId: id}),
  isOwnBlog: false,
  setIsOwnBlog: (state) => set({ isOwnBlog: state }),
  profile: {
    userId: 0,
    nickName: 'Anonymous',
    rank: 'sophomore',
    profileMessage: 'No introduction provided.',
    FollowerCount: 3,
    profileImage: "/profileImg2.png",
    blogProfile: "",
  },
  setProfile: (profile) => set({ profile }),

  params: null, // 초기값 설정
  setParams: (params) => set({ params }), // params 설정 함수

  // sidebar-board 관련
  boardCategories: [],
  setBoardCategories: (categoriesOrFn) =>
    set((state) => ({
      boardCategories:
        typeof categoriesOrFn === "function"
          ? categoriesOrFn(state.boardCategories)
          : categoriesOrFn,
    })),
  activeCategories: [],
  setActiveCategories: (categoriesOrFn) =>
    set((state) => ({
      activeCategories:
        typeof categoriesOrFn === "function"
          ? categoriesOrFn(state.activeCategories)
          : categoriesOrFn,
    })),
  isAddingCategory: false,
  setIsAddingCategory: (state) => set({ isAddingCategory: state }),
  isAddingSubCategory: {},
  setIsAddingSubCategory: (parentId, isAdding) =>
    set((state) => ({
      isAddingSubCategory: {
        ...state.isAddingSubCategory,
        [parentId]: isAdding,
      },
    })),    
}));
