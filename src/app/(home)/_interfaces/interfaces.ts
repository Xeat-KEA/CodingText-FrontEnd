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
