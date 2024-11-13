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
  { content: "JavaScript", selection: "js" },
  { content: "C++", selection: "c++" },
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
  { content: "1단계", selection: "1" },
  { content: "2단계", selection: "2" },
  { content: "3단계", selection: "3" },
  { content: "4단계", selection: "4" },
  { content: "5단계", selection: "5" },
];

// 알고리즘 목록
export const ALGORITHM_LIST: Selection[] = [
  { content: "입출력", selection: "입출력" },
  { content: "함수", selection: "함수" },
  { content: "재귀함수", selection: "재귀함수" },
  { content: "1차원 리스트", selection: "1차원 리스트" },
  { content: "스트링", selection: "스트링" },
  { content: "2차원 리스트", selection: "2차원 리스트" },
  { content: "스택/큐/DFS/BFS", selection: "스택/큐/DFS/BFS" },
  { content: "비트연산과 부분집합", selection: "비트연산과 부분집합" },
  { content: "정렬", selection: "정렬" },
  { content: "순열/조합/백트래킹", selection: "순열/조합/백트래킹" },
  { content: "트리/힙", selection: "트리/힙" },
  { content: "MST/다익스트라", selection: "MST/다익스트라" },
];
