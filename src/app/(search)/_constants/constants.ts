import { Selection } from "@/app/_interfaces/interfaces";

// 검색 필터링
export const SEARCH_FILTER_LIST: Selection[] = [
  { content: "제목", selection: "TITLE" },
  { content: "문제 번호", selection: "NUMBER" },
];

// 검색 결과 탭바 메뉴
export const SEARCH_TAB_MENU_LIST: Selection[] = [
  { content: "글", selection: "POST" },
  { content: "블로그", selection: "BLOG" },
];
