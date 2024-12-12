import { create } from "zustand";
import {
  BlogStore,
  CategoryStore,
  CodingTestStore,
  PaginationStore,
  PostStore,
  Rank,
  SearchFilterStore,
  TabStore,
  TiptapStore,
  TokenStore,
  WindowSizeStore,
} from "./_interfaces/interfaces";
import { RegisterStore } from "./(admin)/_interfaces/interfaces";

// 토큰 저장 전역변수
export const useTokenStore = create<TokenStore>((set) => ({
  accessToken: "",
  setAccessToken: (token) => set({ accessToken: token }),
  isTokenSet: false,
  setIsTokenSet: (state) => set({ isTokenSet: state }),
}));

// 코딩테스트 관련 전역변수
export const useCodingTestStore = create<CodingTestStore>((set) => ({
  // 코딩 관련 전역변수
  // 문제 제목
  title: "",
  setTitle: (newTitle) => set({ title: newTitle }),
  // 언어 설정
  language: { content: "", selection: "" },
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
  // 컴파일 실행 중 여부
  isRunning: false,
  setIsRunning: (state) => set({ isRunning: state }),
  // 컴파일 결과
  compiledResult: [],
  setCompiledResult: (result) => set({ compiledResult: result }),
  // 컴파일 에러 여부
  compileError: "",
  setCompileError: (error) => set({ compileError: error }),
  // 제출 결과
  submitResult: [],
  setSubmitResult: (result) => set({ submitResult: result }),
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
  page: 0,
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
  userBlogId: -1,
  setUserBlogId: (id) => set({ userBlogId: id }),
  currentBlogId: -1,
  setCurrentBlogId: (id) => set({ currentBlogId: id }),
  isOwnBlog: false,
  setIsOwnBlog: (state) => set({ isOwnBlog: state }),
  profile: {
    blogId: -1,
    followCheck: false,
    followCount: -1,
    profileMessage: "default",
    profileUrl: "",
    tier: "Sophomore",
    userName: "default",
    mainContent: "",
  },
  setProfile: (profile) => set({ profile }),
  blogContent: {
    blogId: -1,
    mainContent: "",
  },
  setBlogContent: (blogContent) => set({ blogContent }),
}));

// 게시판 관련 정보 저장 전역 변수
export const useCategoryStore = create<CategoryStore>((set) => ({
  categoryId: -1,
  setCategoryId: (id) => set({ categoryId: id }),
  childCategoryId: -1,
  setChildCategoryId: (id) => set({ childCategoryId: id }),

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
  isAddingChildCategory: {},
  setIsAddingChildCategory: (parentId, isAdding) =>
    set((state) => ({
      isAddingChildCategory: {
        ...state.isAddingChildCategory,
        [parentId]: isAdding,
      },
    })),
}));

// 게시글 관련 정보 저장 전역 변수
export const usePostStore = create<PostStore>((set) => ({
  currentPost: {
    articleId: -1,
    articleReplies: [],
    blogId: -1,
    checkRecommend: false, // ?
    childCategoryId: -1,
    childName: "",
    codeContent: "",
    codeId: -1,
    content: "",
    createdDate: "",
    isBlind: false,
    isSecret: false,
    likeCount: -1,
    profileUrl: "",
    replyCount: -1,
    title: "",
    userName: "",
    viewCount: -1,
    writtenCode: "",
  },
  setCurrentPost: (currentPost) => set({ currentPost }),
  isCodingPost: false,
  setIsCodinPost: (state) => set({ isCodingPost: state }),
}));

// 문제 등록 여부 저장 전역변수
export const useRegisterStore = create<RegisterStore>((set) => ({
  isRegistering: false,
  setIsRegistering: (state) => set({ isRegistering: state }),
}));

// 화면 크기 저장 전역변수
export const useWindowSizeStore = create<WindowSizeStore>((set) => ({
  windowSize: 0,
  setWindowSize: (number) => set({ windowSize: number }),
}));
