export interface SignInForm {
  username: string;
  password: string;
}

export interface SignUpForm {
  email: string;
  password: string;
  verify: string;
}

export interface Report{
  reportId: number;
  reportUserId: number;
  reportedBlogId: number;
  reportedPostId: number;
  reportedAt: string;
  reportedCommentId?: number; // 댓글 신고
  reportedCommentUserID?: number; // 댓글 작성자 ID
  reportReason: string; // 카테고리별 선택 신고 사유
  directReason?: string; // 직접 입력
}
