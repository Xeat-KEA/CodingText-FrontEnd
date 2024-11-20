import {
  CodeCompileIcon,
  CodeSubmitIcon,
  OthersSolvingIcon,
  PostCodeIcon,
} from "../_components/Icons";
import { CompileResult } from "../_interface/interfaces";

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

export const dummy: CompileResult[] = [
  { isCorrect: true, runtime: 6, input: "a", output: "b", result: "b" },
  { isCorrect: false, runtime: 8, input: "ab", output: "bc", result: "bb" },
  {
    isCorrect: true,
    runtime: 15,
    input: "aaaa",
    output: "bbbb",
    result: "bbbb",
  },
];

export const dummyerror =
  'Exception in thread "main" java.lang.NumberFormatException: For input string: "(){}[]"\n\tat java.base/java.lang.NumberFormatException.forInputString(NumberFormatException.java:67)\n\tat java.base/java.lang.Integer.parseInt(Integer.java:654)\n\tat java.base/java.lang.Integer.parseInt(Integer.java:786)\n\tat M6bdb6c2ac8fb4d38a8359aa6d70bab65.main(M6bdb6c2ac8fb4d38a8359aa6d70bab65.java:11)\n';
