export interface BlogCardProps {
  userId: number;
  profileImg: string;
  nickname: string;
  status: string;
}

export interface PostResult {
  articleId: number;
  blogId: number;
  childName: string;
  content: string;
  createdDate: string;
  isBlind: boolean;
  isSecret: boolean;
  likeCount: number;
  replyCount: number;
  title: string;
  viewCount: number;

  codeId?: number | null;
}

export interface BlogResult {
  id: number;
  nickname: string;
  profileMessage: string;
  profileUrl: string;
}
