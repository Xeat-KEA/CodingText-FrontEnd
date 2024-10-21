import { PostCardProps } from "@/app/_interfaces/interfaces";

export interface BannerCardProps {
  content: string;
  bubble: JSX.Element;
  index: number;
}

export interface MainBoardProps {
  title: string;
  hasTab?: boolean;
  postList: PostCardProps[];
}
