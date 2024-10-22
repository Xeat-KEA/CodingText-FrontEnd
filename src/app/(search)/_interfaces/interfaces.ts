export interface BlogCardProps {
  id: number;
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
