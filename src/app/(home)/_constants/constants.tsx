import { ProfileCardProps } from "@/app/(code)/_interfaces/interfaces";
import {
  MainAIIcon,
  MainCodeIcon,
  MainCommunityIcon,
  MainNoticeIcon,
} from "../_components/Icons";
import {
  MainCodeListProps,
  MainHistoriesProps,
  MainMenuBtnProps,
  MainNoticesProps,
} from "../_interfaces/interfaces";

export const MAIN_MENU_LIST: MainMenuBtnProps[] = [
  { icon: <MainCodeIcon />, title: "코딩 테스트", url: "/code/list" },
  { icon: <MainAIIcon />, title: "AI 문제 생성", url: "/ai" },
  { icon: <MainCommunityIcon />, title: "최신 게시글", url: "/recent-post" },
  { icon: <MainNoticeIcon />, title: "공지사항", url: "/notice" },
];

export const POSTS_LIST = [
  {
    title: "이번 주 인기 게시글",
    content: "이번 주 인기 게시글을 확인해보세요",
  },
  {
    title: "최신 게시글",
    content: "요즘 개발자의 관심사를 알아보세요",
    url: "/recent-post",
  },
  {
    title: "코딩 테스트 게시글",
    content: "다른 사람들의 문제 풀이를 살펴보세요",
    url: "/code-post",
  },
  { title: "공지사항", url: "/notice" },
  {
    title: "내 문제 풀이 기록",
    url: "/code/history",
  },
];

export const dummycodes: MainCodeListProps = {
  title: "새롭게 추가된 문제를 확인해보세요",
  url: "/code/list",
  sliderList: [
    {
      codeNum: 1,
      title: "문제 1",
      algorithm: "입출력",
      difficulty: 1,
      rate: 92,
      participants: 1522,
    },
    {
      codeNum: 2,
      title: "문제 2",
      algorithm: "함수",
      difficulty: 3,
      rate: 88,
      participants: 1522,
    },
    {
      codeNum: 3,
      title: "문제 3 문제 3 문제 3 문제 3 문제 3",
      algorithm: "다익스트라 다익스트라 다익스트라 다익스트라",
      difficulty: 5,
      rate: 81,
      participants: 1522,
    },
    {
      codeNum: 4,
      title: "문제 4",
      algorithm: "입출력",
      difficulty: 2,
      rate: 90,
      participants: 1522,
    },
  ],
};

export const dummynotice: MainNoticesProps = {
  title: "공지사항",
  url: "/notice",
  sliderList: [
    { noticeId: 1, title: "공지사항 1", createdAt: "2024-11-08" },
    {
      noticeId: 2,
      title:
        "공지사항 2 공지사항 2 공지사항 2 공지사항 2 공지사항 2 공지사항 2 공지사항 2 공지사항 2 공지사항 2 공지사항 2 공지사항 2 공지사항 2",
      createdAt: "2024-11-07",
    },
    { noticeId: 3, title: "공지사항 3", createdAt: "2024-11-06" },
    { noticeId: 4, title: "공지사항 4", createdAt: "2024-11-05" },
    { noticeId: 5, title: "공지사항 5", createdAt: "2024-11-04" },
  ],
};

export const dummyhistories: MainHistoriesProps = {
  title: "내 문제 풀이 기록",
  url: "/code/history",
  sliderList: [
    { codeNum: 1, title: "문제 1", hasSolved: true, createdAt: "2024-11-08" },
    { codeNum: 2, title: "문제 2", hasSolved: false, createdAt: "2024-11-08" },
    {
      codeNum: "ai",
      title: "문제 3 (AI) 문제 3 (AI) 문제 3 (AI) 문제 3 (AI)",
      hasSolved: true,
      createdAt: "2024-11-08",
    },
    { codeNum: 4, title: "문제 4", hasSolved: true, createdAt: "2024-11-08" },
    { codeNum: 5, title: "문제 5", hasSolved: true, createdAt: "2024-11-08" },
  ],
};

export const dummyuserdata: ProfileCardProps = {
  userData: {
    profileImg: "/profileImg4.png",
    rank: "Junior",
    nickname: "사용자명",
    ranking: 112,
    registered: 15,
    score: 5166,
    solved: 85,
  },
};
