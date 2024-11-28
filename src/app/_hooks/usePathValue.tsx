import { useEffect, useState } from "react";

export const usePathValue = (): string | null => {
  const [previousURL, setPreviousURL] = useState<string | null>(null);

  useEffect(() => {
    const storage = globalThis.sessionStorage;
    if (!storage) return;

    const currentURL = globalThis.location.pathname;

    if (currentURL !== "/blind") {
      const prevURL = storage.getItem("CURRENT_URL");
      storage.setItem("PREVIOUS_URL", prevURL ?? "");
      storage.setItem("CURRENT_URL", currentURL);
<<<<<<< HEAD
      
=======
      console.log("a", currentURL);
      console.log(prevURL);

>>>>>>> origin/develop
      setPreviousURL(prevURL);
    } else {
      // /blind 경로일 때는 이전 URL을 유지
      setPreviousURL(storage.getItem("PREVIOUS_URL"));
    }
  }, []);

  return previousURL;
};
