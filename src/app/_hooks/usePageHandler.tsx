import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

export const usePageHandler = () => {
  // 새로고침, 페이지 닫기
  const handleBeforeUnload = useCallback((e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = true;
  }, []);

  // 뒤로가기 handle
  const handlePopState = useCallback(() => {
    history.pushState(null, "", "");
  }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [handleBeforeUnload]);
};
