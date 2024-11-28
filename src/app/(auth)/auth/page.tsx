"use client";

import { LogoIcon } from "@/app/_components/Icons";
import LoadingSpinner from "@/app/_components/LoadingSpinner";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function AuthSignUpPage() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const access = searchParams.get("access");
  const refresh = searchParams.get("refresh");
  const userId = searchParams.get("userId");
  const signedIn = searchParams.get("signedIn") === "true" ? true : false;
  useEffect(() => {
    if (signedIn && access && refresh && userId) {
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      localStorage.setItem("userId", userId);
      router.push("/");
    } else if (!signedIn && access) {
      localStorage.setItem("tempToken", access);
      router.push("/sign-up");
    }
  }, []);
  return (
    <div className="top-container">
      <div className="max-w-400 min-h-screen flex flex-col items-center justify-between py-20">
        <LogoIcon />
        <LoadingSpinner />
      </div>
    </div>
  );
}
