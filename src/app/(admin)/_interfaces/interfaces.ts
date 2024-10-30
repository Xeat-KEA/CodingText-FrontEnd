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
