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

export interface UserListCardProps {
  userId: number;
  nickname: string;
  email: string;
  rank: string;
  signedUpAt: string;
  onClick: () => void;
}

export interface AdminListCardProps {
  email: string;
  role: string;
}

export interface AdminRequestCardProps {
  email: string;
}

export interface ManageCodeProps {
  codeId?: number;
}

export interface RegisterCardProps {
  createdAt: string;
  nickName: string;
  title: string;
  content: string;
  testcase: string;
}

export interface RegisterStore {
  isRegistering: boolean;
  setIsRegistering: (state: boolean) => void;
}

export interface NoticeForm {
  isAll: boolean;
  receiver: string[];
  content: string;
}

export interface ManageReceiverProps {
  isAll: boolean;
  onAllClick: () => void;
  onDelete: (nickName: string) => void;
  onAddUser: (nickName: string) => void;
  receivers: string[];
}

export interface SearchUserBarProps {
  onAddUser: (nickName: string) => void;
  isDisabled?: boolean;
}

export interface PushFormContainerProps {
  onSubmit: (push: string) => void;
  isDone: boolean;
}
