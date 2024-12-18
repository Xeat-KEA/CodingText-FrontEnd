import { Selection } from "@/app/_interfaces/interfaces";

export const CODE_SEARCH_FILTER_LIST: Selection[] = [
  { content: "제목", selection: "title" },
  { content: "문제 번호", selection: "id" },
];

export const CODE_SORT_BY: Selection[] = [
  { content: "최신순", selection: "createdAt" },
  { content: "정답률순", selection: "correctRate" },
];
