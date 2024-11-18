import {
  CodeCompileIcon,
  CodeSubmitIcon,
  OthersSolvingIcon,
  PostCodeIcon,
} from "../_components/Icons";

// 코딩 페이지 탭 전환 바
export const CODING_TAB_BAR_MENU = ["컴파일러", "메모장"];

// 코딩 페이지 하단 버튼 목록
export const CODING_BUTTONS = [
  { content: "글 쓰기", icon: <PostCodeIcon />, url: "/" },
  {
    content: "다른 사람 풀이 보기",
    icon: <OthersSolvingIcon />,
    url: "/search?tab=POST&category=CODE&order=ACCURACY",
  },
  { content: "코드 실행", icon: <CodeCompileIcon />, url: "/" },
  { content: "코드 제출", icon: <CodeSubmitIcon />, url: "/" },
];

export const POSTING_TAB_BAR_MENU = ["코드 뷰어", "메모장"];
