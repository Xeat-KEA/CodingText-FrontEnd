import { MultiSelectionList, Selection } from "@/app/_interfaces/interfaces";

export const CODE_SEARCH_FILTER_LIST: Selection[] = [
  { content: "제목", selection: "TITLE" },
  { content: "문제 번호", selection: "CODE_NUM" },
];

export const CODE_FILTER_LIST: MultiSelectionList[] = [
  { content: "난이도", list: ["1단계", "2단계", "3단계", "4단계", "5단계"] },
  { content: "알고리즘", list: ["1단계", "2단계", "3단계", "4단계", "5단계"] },
  { content: "정렬", list: ["최신순", "난이도순", "참여자순"] },
];
