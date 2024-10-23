export interface BlogCardProps {
  userId: number;
  profileImg: string;
  nickname: string;
  status: string;
}

export interface PostResult {
  articleId: number;
  title: string;
  content: string;
  likeCount: number;
  replyCount: number;
  createAt: string;
  nickName: string;
  codeId: number | null;
}

export interface BlogResult {
  userId: number;
  nickName: string;
  profileMessage: string;
}
