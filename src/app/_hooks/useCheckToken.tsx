import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useCheckToken = (guard?: boolean) => {
  const [token, setToken] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
    if (guard) {
      if (!storedToken) {
        router.push("/sign-in");
      }
    }
    setIsLoaded(true);
  }, []);

  return { token, isLoaded };
};
