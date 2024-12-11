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
  reportUserId: number; // 신고자 아이디
  repoortUserName: string; // 신고자 이름
  reportedBlogId: number; // 신고된 블로그 아이디
  reportedBlogName: string; // 신고된 블로그 이름
  reportedPostId?: number; // 신고된 게시글 아이디
  reportedPostTitle?: string; // 신고된 게시글 제목
  reportedDate: string;
  reportedCommentId?: number; // 신고된 댓글
  reportedCommentUserID?: number; // 신고된 댓글 작성자 ID
  reportedCommentUserName?: string // 신고된 댓글 작성자 이름
  reportedCommentContent: string // 신고된 댓글 내용
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

export interface Testcase {
  input: string;
  output: string;
}

export interface CodeDetail {
  nickName?: string;
  code: Code;
  testcases: Testcase[];
}

export interface EditCodeDetail {
  codeId: number;
  title: string;
  content: string;
  difficulty: string;
  algorithm: string;
  testcases: Testcase[];
}

export interface ManageCodeProps {
  code?: Code;
  testcases?: Testcase[];
  onAdd?: (newData: CodeDetail) => void;
  onEdit?: (newData: EditCodeDetail) => void;
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

export interface Notice {
  announceId: number;
  title: string;
  content: string;
  createdDate: string;
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
