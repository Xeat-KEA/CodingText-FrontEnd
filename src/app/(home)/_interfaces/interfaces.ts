import { Code, History } from "@/app/(code)/_interfaces/interfaces";
import {
  Notice,
  NoticeCardProps,
  PageInfo,
  Post,
} from "@/app/_interfaces/interfaces";

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
  sliderList: NoticeCardProps[];
}

export interface MainHistoriesProps {
  title: string;
  url: string;
  sliderList: History[];
}

export interface PostsResponse {
  pageInfo: PageInfo;
  articleList: Post[];
}
