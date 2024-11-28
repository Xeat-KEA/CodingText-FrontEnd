import { useEffect } from "react";
import { useTokenStore } from "../stores";

export const useCheckToken = () => {
  const { accessToken, setAccessToken, isTokenSet, setIsTokenSet } =
    useTokenStore();

  useEffect(() => {
    if (typeof window !== undefined) {
      const storedToken = localStorage.getItem("accessToken");
      if (storedToken) {
        setAccessToken(storedToken);
      }
      setIsTokenSet(true);
    }
  }, []);

  return { accessToken, isTokenSet };
};
