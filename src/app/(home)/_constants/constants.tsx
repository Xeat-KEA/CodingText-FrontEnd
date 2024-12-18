import {
  MainAIIcon,
  MainCodeIcon,
  MainCommunityIcon,
  MainNoticeIcon,
} from "../_components/Icons";
import { MainMenuBtnProps } from "../_interfaces/interfaces";

export const MAIN_MENU_LIST: MainMenuBtnProps[] = [
  { icon: <MainCodeIcon />, title: "코딩 테스트", url: "/code/list" },
  { icon: <MainAIIcon />, title: "AI 문제 생성", url: "" },
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
  { title: "새롭게 추가된 문제를 확인해보세요", url: "/code/list" },
  { title: "공지사항", url: "/notice" },
  {
    title: "내 문제 풀이 기록",
    url: "/code/history",
  },
];

export const BANNER_IMG_LIST = [
  {
    lgImg: "/banner/lgBanner1.png",
    smImg: "/banner/smBanner1.png",
    url: "",
  },
  {
    lgImg: "/banner/lgBanner2.png",
    smImg: "/banner/smBanner2.png",
    url: "",
  },
];
