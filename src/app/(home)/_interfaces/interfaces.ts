import { PostResult } from "@/app/(search)/_interfaces/interfaces";

export interface BannerCardProps {
  content: string;
  bubble: JSX.Element;
  index: number;
}

export interface MainBoardProps {
  title: string;
  hasTab?: boolean;
  postList: PostResult[];
}

export interface MainPost {
  postId: number;
  profileImg: string;
  username: string;
  userId: number;
  codeNum?: number;
  title: string;
  content: string;
  likeCounts: number;
  commentCounts: number;
  views: number;
  createdAt?: string;
  ranking?: 1 | 2 | 3;
}

export interface MainPostsProps {
  title: string;
  subTitle?: string;
  url?: string;
  sliderList: MainPost[];
}

export interface MainCode {
  codeNum: number;
  difficulty: "LEVEL1" | "LEVEL2" | "LEVEL3" | "LEVEL4" | "LEVEL5";
  title: string;
  algorithm: string;
  rate: number;
  participants: number;
}

export interface MainCodesProps {
  title: string;
  subTitle?: string;
  url: string;
  sliderList: MainCode[];
}

export interface MainMenuBtnProps {
  icon: JSX.Element;
  title: string;
  url: string;
}

export interface MainNotice {
  noticeId: number;
  title: string;
  createdAt: string;
}

export interface MainNoticesProps {
  title: string;
  url: string;
  sliderList: MainNotice[];
}

export interface MainHistory {
  codeNum: number | "ai";
  title: string;
  hasSolved: boolean;
  createdAt: string;
}

export interface MainHistoriesProps {
  title: string;
  url: string;
  sliderList: MainHistory[];
}
