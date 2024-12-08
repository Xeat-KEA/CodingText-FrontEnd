import { useEffect } from "react";
import { useTokenStore } from "../stores";

export const useCheckToken = (url?: string) => {
  const { accessToken, setAccessToken, isTokenSet, setIsTokenSet } =
    useTokenStore();

  useEffect(() => {
    if (typeof window !== undefined) {
      const storedToken = localStorage.getItem("accessToken");
      if (storedToken) {
        setAccessToken(storedToken);
      } else if (!storedToken && url) {
        window.location.href = url;
      }
      setIsTokenSet(true);
    }

    // localStorage 변경 이벤트 감지
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "accessToken") {
        setAccessToken(event.newValue || ""); // 업데이트된 토큰 저장
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [setAccessToken, setIsTokenSet]);

  return { accessToken, isTokenSet };
};
