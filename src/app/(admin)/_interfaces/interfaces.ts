import { Code } from "@/app/(code)/_interfaces/interfaces";

export interface SignInForm {
  email: string;
  password: string;
}

export interface SignUpForm {
  email: string;
  password: string;
  verify: string;
}

export interface Report {
  reportId: number;
  reportUserId: number;
  reportedBlogId: number;
  reportedPostId?: number;
  reportedAt: string;
  reportedCommentId?: number; // 댓글 신고
  reportedCommentUserID?: number; // 댓글 작성자 ID
  reportReason: string; // 카테고리별 선택 신고 사유
  directReason?: string; // 직접 입력
}

export interface AdminUserInfo {
  email: string;
  nickName: string;
  registerDate: string;
  tier: string;
  userId: string;
}

export interface AdminUserDetail {
  blogId: number;
  blogIntro: string;
  email: string;
  nickName: string;
  profileMessage: string;
  profileUrl: string;
  userId: string;
}

export interface UserListCardProps {
  userInfo: AdminUserInfo;
  onClick: () => void;
}

export interface ManageCodeProps {
  codeId?: number;
}

export interface TestCase {
  input: string;
  output: string;
}

export interface RegisterCardProps {
  code: Code;
  testcases: TestCase[];
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

export interface Admin {
  id: number;
  email: string;
  adminRole?: "ROOT" | "GENERAL" | "NONE";
}

export interface AdminResponseDialogsProps {
  isError: boolean;
  isDone: boolean;
  onError: () => void;
  onDone: () => void;
}
