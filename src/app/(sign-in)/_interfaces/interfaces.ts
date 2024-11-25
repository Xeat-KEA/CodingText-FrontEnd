export interface SignUpForm {
  nickName: string;
  codeLanguage: string;
  useSocialProfile: boolean;
  basicProfileUrl: string;
}

export interface PolicyContainerProps {
  title: string;
  content: string;
}

export interface SignInTitleProps {
  title: string;
  content?: string;
  hasBackBtn?: boolean;
}

export interface SignInBtnProps {
  image: string;
  service: string;
  redirectionURL: string;
}

export interface SignUpResult {
  userId: string;
  role: string;
  jwtToken: {
    accessToken: string;
    refreshToken: string;
  };
}
