import { Selection } from "../_interfaces/interfaces";
import { Notice } from "../_interfaces/interfaces";

// 탑바 메뉴
export const TOP_BAR_MENU = [
  { content: "코딩 테스트", url: "/code/list" },
  { content: "풀이 기록", url: "/code/history" },
  { content: "내 블로그", url: "/blog" },
];

// 프로필 메뉴
export const PROFILE_MENU = [
  { content: "내 정보 수정", url: "/edit/profile" },
  { content: "로그아웃" },
];

// 프로그래밍 언어 목록
export const PROGRAMMING_LANGUAGES: Selection[] = [
  { content: "Java", selection: "java" },
  { content: "Python", selection: "python" },
  { content: "JavaScript", selection: "javascript" },
  { content: "C++", selection: "c_plus_plus" },
  { content: "C", selection: "c" },
];

// 기본 프로필 사진 경로 목록
export const PROFILE_IMG_LIST = [
  "/profileImg1.png",
  "/profileImg2.png",
  "/profileImg3.png",
  "/profileImg4.png",
  "/profileImg5.png",
  "/profileImg6.png",
];

// 탭바 게시글 필터링
export const TAB_BAR_POST_FILTER: Selection[] = [
  { content: "• 전체", selection: "ALL" },
  { content: "• 일반 게시글만", selection: "NORMAL" },
  { content: "• 코딩 테스트 게시글만", selection: "CODE" },
];

// 탭바 순서 필터링
export const TAB_BAR_ORDER_FILTER: Selection[] = [
  { content: "• 정확도순", selection: "ACCURACY" },
  { content: "• 최신순", selection: "RECENT" },
];

// 난이도 목록
export const DIFFICULTY_LIST: Selection[] = [
  { content: "1단계", selection: "LEVEL1" },
  { content: "2단계", selection: "LEVEL2" },
  { content: "3단계", selection: "LEVEL3" },
  { content: "4단계", selection: "LEVEL4" },
  { content: "5단계", selection: "LEVEL5" },
];

// 알고리즘 목록
export const ALGORITHM_LIST: Selection[] = [
  { content: "다이나믹 프로그래밍", selection: "DP" },
  { content: "그래프", selection: "GRAPH" },
  { content: "탐욕법", selection: "GREEDY" },
  { content: "힙", selection: "HEAP" },
  { content: "해쉬", selection: "HASH" },
  { content: "스택", selection: "STACK" },
];

export const Notice_Dummy_Data: Notice[] = [
  {
    noticeId: 1,
    noticeTitle: "공지사항 1",
    noticeContent: "7LKr67KI7Ke4IOqzteyngOyCrO2VreyeheuLiOuLpC4=",
    noticedAt: "2024.10.30",
  },
  {
    noticeId: 2,
    noticeTitle: "공지사항 2 제목 공지사항 2 공지사항 2 공지사항 2",
    noticeContent: "65GQ67KI7Ke4IOqzteyngOyCrO2VreyeheuLiOuLpC4=",
    noticedAt: "2024.09.03",
  },
  {
    noticeId: 3,
    noticeTitle: "공지사항 3",
    noticeContent:
      "PGgxPuyEuOuyiOynuCDqs7Xsp4Dsgqztla3snoXri4jri6QuPC9oMT48cD7qs7Xsp4Dsgqztla0g64K07Jqp7J20IOyXrOq4sOyXkCDstpTqsIDrkKAg7JiI7KCV7J6F64uI64ukLjwvcD48cD7tlYTsmpTtlZwg6rK97JqwIOuNlCDrp47snYAg7KCV67O066W8IO2ZleyduO2VmOyEuOyalC48L3A+",
    noticedAt: "2024.07.11",
  },
];
