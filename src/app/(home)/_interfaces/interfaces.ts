import { Code } from "@/app/(code)/_interfaces/interfaces";
import { Post } from "@/app/_interfaces/interfaces";

export interface MainPostCardProps {
  post: Post;
  ranking?: 1 | 2 | 3;
}

export interface MainPostListProps {
  title: string;
  subTitle?: string;
  url?: string;
  sliderList: Post[];
  hasRanking?: boolean;
}

export interface MainCodeListProps {
  title: string;
  subTitle?: string;
  url: string;
  sliderList: Code[];
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

interface PageInfo {
  totalPageNum: number;
  currentPageNum: number;
}

export interface PostsResponse {
  pageInfo: PageInfo;
  articleList: Post[];
}
