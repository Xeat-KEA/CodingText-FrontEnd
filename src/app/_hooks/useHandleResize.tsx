import { useEffect, useState } from "react";

export const useHandleResize = () => {
  // 화면 크기 변경 시 state 변경
  const [windowSize, setWindowSize] = useState<number>(0);
  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };
    // 초기 화면값 설정
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};
