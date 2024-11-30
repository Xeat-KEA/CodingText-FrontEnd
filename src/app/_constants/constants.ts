import { Selection } from "../_interfaces/interfaces";

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
  { content: "사칙연산", selection: "ARITHMETIC" },
  { content: "구현", selection: "IMPLEMENTATION" },
  { content: "조합론", selection: "COMBINATORICS" },
  { content: "기하학", selection: "GEOMETRY" },
  { content: "다이나믹 프로그래밍", selection: "DP" },
  { content: "위상 정렬", selection: "TOPOLOGICAL_SORT" },
  { content: "정규 표현식", selection: "REGEX" },
  { content: "정수론", selection: "NUMBER_THEORY" },
  { content: "이분 매칭", selection: "BIPARTITE_MATCHING" },
  { content: "완전 탐색", selection: "BRUTEFORCE" },
  { content: "자료 구조", selection: "DATA_STRUCTURES" },
  { content: "수학", selection: "MATH" },
  { content: "그래프", selection: "GRAPH" },
  { content: "그리디 알고리즘", selection: "GREEDY" },
  { content: "해시", selection: "HASH" },
  { content: "힙", selection: "HEAP" },
  { content: "스택", selection: "STACK" },
];
