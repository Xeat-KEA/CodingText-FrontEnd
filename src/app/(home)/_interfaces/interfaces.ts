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
  difficulty: 1 | 2 | 3 | 4 | 5;
  title: string;
  algorithm: string;
  rate: number;
  participants: number;
}

export interface MainCodesProps {
  title: string;
  subTitle?: string;
  url?: string;
  sliderList: MainCode[];
}
