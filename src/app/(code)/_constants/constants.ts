import { MultiSelectionList } from "@/app/_interfaces/interfaces";

export const CODE_SEARCH_FILTER_LIST = ["제목", "문제 번호"];

export const CODE_FILTER_LIST: MultiSelectionList[] = [
  { content: "난이도", list: ["1단계", "2단계", "3단계", "4단계", "5단계"] },
  { content: "알고리즘", list: ["1단계", "2단계", "3단계", "4단계", "5단계"] },
  { content: "정렬", list: ["최신순", "난이도순", "참여자순"] },
];

export const DUMMY_PROFILE_DATA = {
  profileImg: "/profileImg1.png",
  rank: "Junior",
  nickname: "사용자123",
  solved: 123,
  registered: 12,
  score: 1234,
  ranking: 123,
};

export const DUMMY_CODE_LIST = [
  {
    id: 1,
    title: "1번 문제",
    difficulty: 1,
    participants: 123,
    rate: 89,
    createdAt: "2024-10-14T21:59:16.6362039",
  },
  {
    id: 2,
    title: "2번 문제",
    difficulty: 3,
    participants: 125,
    rate: 63,
    createdAt: "2024-10-14 18:41:32",
  },
  {
    id: 3,
    title: "3번 문제",
    difficulty: 2,
    participants: 117,
    rate: 83,
    createdAt: "2024-10-14 18:41:32",
  },
  {
    id: 4,
    title: "4번 문제",
    difficulty: 2,
    participants: 531,
    rate: 94,
    createdAt: "2024-10-14 18:41:32",
  },
  {
    id: 5,
    title: "5번 문제",
    difficulty: 1,
    participants: 742,
    rate: 72,
    createdAt: "2024-10-14 18:41:32",
  },
  {
    id: 6,
    title: "6번 문제",
    difficulty: 5,
    participants: 613,
    rate: 83,
    createdAt: "2024-10-14 18:41:32",
  },
  {
    id: 7,
    title: "7번 문제",
    difficulty: 4,
    participants: 742,
    rate: 62,
    createdAt: "2024-10-14 18:41:32",
  },
  {
    id: 8,
    title: "8번 문제",
    difficulty: 2,
    participants: 136,
    rate: 74,
    createdAt: "2024-10-14 18:41:32",
  },
  {
    id: 9,
    title: "9번 문제",
    difficulty: 3,
    participants: 284,
    rate: 62,
    createdAt: "2024-10-14 18:41:32",
  },
  {
    id: 10,
    title: "10번 문제",
    difficulty: 1,
    participants: 631,
    rate: 88,
    createdAt: "2024-10-14 18:41:32",
  },
  {
    id: 11,
    title: "11번 문제",
    difficulty: 4,
    participants: 84,
    rate: 38,
    createdAt: "2024-10-14 18:41:32",
  },
  {
    id: 12,
    title: "12번 문제",
    difficulty: 2,
    participants: 513,
    rate: 73,
    createdAt: "2024-10-14 18:41:32",
  },
  {
    id: 13,
    title: "13번 문제",
    difficulty: 5,
    participants: 164,
    rate: 87,
    createdAt: "2024-10-14 18:41:32",
  },
  {
    id: 14,
    title: "14번 문제",
    difficulty: 2,
    participants: 631,
    rate: 84,
    createdAt: "2024-10-14 18:41:32",
  },
  {
    id: 15,
    title: "15번 문제",
    difficulty: 1,
    participants: 174,
    rate: 94,
    createdAt: "2024-10-14 18:41:32",
  },
  {
    id: 16,
    title: "16번 문제",
    difficulty: 1,
    participants: 125,
    rate: 83,
    createdAt: "2024-10-14 18:41:32",
  },
  {
    id: 17,
    title: "17번 문제",
    difficulty: 4,
    participants: 174,
    rate: 73,
    createdAt: "2024-10-14 18:41:32",
  },
  {
    id: 18,
    title: "18번 문제",
    difficulty: 2,
    participants: 125,
    rate: 63,
    createdAt: "2024-10-14 18:41:32",
  },
  {
    id: 19,
    title: "19번 문제",
    difficulty: 1,
    participants: 846,
    rate: 84,
    createdAt: "2024-10-14 18:41:32",
  },
  {
    id: 20,
    title: "20번 문제",
    difficulty: 1,
    participants: 631,
    rate: 83,
    createdAt: "2024-10-14 18:41:32",
  },
];

export const DUMMY_CODE_HISTORY = [
  {
    id: 1,
    title: "1번 문제",
    difficulty: 1,
    participants: 123,
    rate: 89,
    hasSolved: true,
    createdAt: "2024-10-14T21:59:16.6362039",
  },
  {
    id: null,
    title: "2번 문제",
    difficulty: 3,
    participants: 125,
    rate: 63,
    hasSolved: true,
    createdAt: "2024-10-14 18:41:32",
  },
  {
    id: 3,
    title: "3번 문제",
    difficulty: 2,
    participants: 117,
    rate: 83,
    hasSolved: true,
    createdAt: "2024-10-14 18:41:32",
  },
  {
    id: 4,
    title: "4번 문제",
    difficulty: 2,
    participants: 531,
    rate: 94,
    hasSolved: false,
    createdAt: "2024-10-14 18:41:32",
  },
  {
    id: 5,
    title: "5번 문제",
    difficulty: 1,
    participants: 742,
    rate: 72,
    hasSolved: true,
    createdAt: "2024-10-14 18:41:32",
  },
  {
    id: 6,
    title: "6번 문제",
    difficulty: 5,
    participants: 613,
    rate: 83,
    hasSolved: false,
    createdAt: "2024-10-14 18:41:32",
  },
  {
    id: null,
    title: "7번 문제",
    difficulty: 4,
    participants: 742,
    rate: 62,
    hasSolved: true,
    createdAt: "2024-10-14 18:41:32",
  },
  {
    id: 8,
    title: "8번 문제",
    difficulty: 2,
    participants: 136,
    rate: 74,
    hasSolved: true,
    createdAt: "2024-10-14 18:41:32",
  },
  {
    id: 9,
    title: "9번 문제",
    difficulty: 3,
    participants: 284,
    rate: 62,
    hasSolved: true,
    createdAt: "2024-10-14 18:41:32",
  },
  {
    id: null,
    title: "10번 문제",
    difficulty: 1,
    participants: 631,
    rate: 88,
    hasSolved: true,
    createdAt: "2024-10-14 18:41:32",
  },
  {
    id: 11,
    title: "11번 문제",
    difficulty: 4,
    participants: 84,
    rate: 38,
    hasSolved: false,
    createdAt: "2024-10-14 18:41:32",
  },
  {
    id: 12,
    title: "12번 문제",
    difficulty: 2,
    participants: 513,
    rate: 73,
    hasSolved: false,
    createdAt: "2024-10-14 18:41:32",
  },
  {
    id: 13,
    title: "13번 문제",
    difficulty: 5,
    participants: 164,
    rate: 87,
    hasSolved: true,
    createdAt: "2024-10-14 18:41:32",
  },
  {
    id: 14,
    title: "14번 문제",
    difficulty: 2,
    participants: 631,
    rate: 84,
    hasSolved: true,
    createdAt: "2024-10-14 18:41:32",
  },
  {
    id: null,
    title: "15번 문제",
    difficulty: 1,
    participants: 174,
    rate: 94,
    hasSolved: true,
    createdAt: "2024-10-14 18:41:32",
  },
  {
    id: null,
    title: "16번 문제",
    difficulty: 1,
    participants: 125,
    rate: 83,
    hasSolved: false,
    createdAt: "2024-10-14 18:41:32",
  },
  {
    id: 17,
    title: "17번 문제",
    difficulty: 4,
    participants: 174,
    rate: 73,
    hasSolved: true,
    createdAt: "2024-10-14 18:41:32",
  },
  {
    id: 18,
    title: "18번 문제",
    difficulty: 2,
    participants: 125,
    rate: 63,
    hasSolved: true,
    createdAt: "2024-10-14 18:41:32",
  },
  {
    id: 19,
    title: "19번 문제",
    difficulty: 1,
    participants: 846,
    rate: 84,
    hasSolved: false,
    createdAt: "2024-10-14 18:41:32",
  },
  {
    id: null,
    title: "20번 문제",
    difficulty: 1,
    participants: 631,
    rate: 83,
    hasSolved: true,
    createdAt: "2024-10-14 18:41:32",
  },
];