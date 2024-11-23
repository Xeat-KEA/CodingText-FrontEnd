"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function AuthSignUpPage() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const signedIn = searchParams.get("signedIn") === "true" ? true : false;
  useEffect(() => {
    if (signedIn && token) {
      localStorage.setItem("token", token);
      router.push("/");
    } else if (!signedIn && token) {
      localStorage.setItem("token", token);
      router.push("/sign-up");
    }
  }, []);
  return <div></div>;
}
