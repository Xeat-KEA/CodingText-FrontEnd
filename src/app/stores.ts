import { create } from "zustand";
import {
  ICodeFilterStore,
  ICodingTestStore,
  IPaginationStore,
  ISearchFilterStore,
  ITabStore,
  ITiptapStore,
} from "./_interfaces/interfaces";

// 코딩테스트 관련 전역변수
export const useCodingTestStore = create<ICodingTestStore>((set) => ({
  // 채팅 관련 전역변수
  // 정답 여부만 확인 토글
  checkAnswerOnly: false,
  setCheckAnswerOnly: () =>
    set((state) => ({ checkAnswerOnly: !state.checkAnswerOnly })),
  // 코드와 함께 질문 토글
  sendWithCode: false,
  setSendWithCode: () =>
    set((state) => ({ sendWithCode: !state.sendWithCode })),

  // 코딩 관련 전역변수
  // 언어 설정
  language: "",
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
export const useTabStore = create<ITabStore>((set) => ({
  tab: "", // 현재 선택된 탭
  setTab: (newTab) => set({ tab: newTab }),
}));

// Tiptap Editor 내용 저장 전역변수
export const useTiptapStore = create<ITiptapStore>((set) => ({
  content: "",
  setContent: (string) => set({ content: string }),
}));

// 페이지 정보 저장 전역변수
export const usePaginationStore = create<IPaginationStore>((set) => ({
  page: 1,
  setPage: (newPage) => set({ page: newPage }),
  lastPage: 0,
  setLastPage: (page) => set({ lastPage: page }),
}));

// 검색 필터 저장 전역변수
export const useSearchFilterStore = create<ISearchFilterStore>((set) => ({
  filter: "",
  setFilter: (selected) => set({ filter: selected }),
}));

// 코드 필터 전역변수
export const useCodeFilterStore = create<ICodeFilterStore>((set) => ({
  difficulty: [],
  setDifficulty: (newList) => set({ difficulty: newList }),
  algorithm: [],
  setAlgorithm: (newList) => set({ algorithm: newList }),
  order: "",
  setOrder: (selected) => set({ order: selected }),
}));
