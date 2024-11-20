import { KeyboardEvent, useEffect } from "react";
import { useWindowSizeStore } from "./stores";

// input 내에서 Enter가 눌렸을 경우 Submit이 일어나는 것 방지
export const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "Enter") {
    e.preventDefault();
  }
};

// 화면 크기 변화 시 windowSize 변경
export const handleWindowResize = () => {
  // 화면 크기 변경 시 state 변경
  const { setWindowSize } = useWindowSizeStore();
  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };
    // 초기값 설정
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
};
