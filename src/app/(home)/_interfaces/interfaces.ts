import { IPostCard } from "@/app/_interfaces/interfaces";

export interface IBannerCard {
  content: string;
  bubble: JSX.Element;
  index: number;
}

export interface IMainBoard {
  title: string;
  hasTab?: boolean;
  postList: IPostCard[];
}
