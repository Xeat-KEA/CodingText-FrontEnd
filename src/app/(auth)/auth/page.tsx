"use client";

import { LogoIcon } from "@/app/_components/Icons";
import LoadingSpinner from "@/app/_components/LoadingSpinner";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function AuthSignUpPage() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const signedIn = searchParams.get("signedIn") === "true" ? true : false;
  useEffect(() => {
    if (signedIn && token) {
      localStorage.setItem("accessToken", token);
      router.push("/");
    } else if (!signedIn && token) {
      localStorage.setItem("tempToken", token);
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
