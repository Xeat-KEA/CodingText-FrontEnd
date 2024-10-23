import { Category, Selection } from "@/app/_interfaces/interfaces";

export let loggedInUserId = 1; // 임시 로그인된 사용자 ID

export const REPORT_REASONS: Selection[] = [
  { content: "스팸 및 광고", selection: "spam" },
  { content: "부적절한 내용", selection: "inappropriate" },
  { content: "개인 정보 침해", selection: "privacy" },
  { content: "허위 사실 유포", selection: "false-info" },
  { content: "직접 입력", selection: "" },
];

// 게시판 목록 (본인)
export const Board_Categories: Category[] = [
  {
    id: 0,
    title: "전체",
  },
  {
    id: 1,
    title: "코딩테스트 풀이",
    subCategories: [
      { id: 0, title: "전체" },
      { id: 1, title: "1단계" },
      { id: 2, title: "2단계" },
      { id: 3, title: "3단계" },
      { id: 4, title: "4단계" },
      { id: 5, title: "5단계" },
    ],
  },
];

// 게시판 목록 (개별)
export const User_Specific_Categories: Category[] = [
  {
    id: 2,
    title: "배운점 정리",
    blogId: 1,
    subCategories: [
      { id: 0, title: "전체" },
      { id: 1, title: "자유" },
      { id: 2, title: "동아리" },
      { id: 3, title: "스터디 그룹" },
    ],
  },
];
