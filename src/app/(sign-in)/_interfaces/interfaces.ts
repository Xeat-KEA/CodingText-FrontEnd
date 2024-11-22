export interface SignUpForm {
  nickname: string;
  lang: string;
  profileImg: string;
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
