export interface SignInForm {
  username: string;
  password: string;
}

export interface SignUpForm {
  email: string;
  password: string;
  verify: string;
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

export interface NoticeFormContainerProps {
  onSubmit: (notice: string) => void;
  isDone: boolean;
}
