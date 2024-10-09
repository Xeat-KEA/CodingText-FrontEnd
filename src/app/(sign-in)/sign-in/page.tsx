"use client";

import { useRouter } from "next/navigation";
import { AppleIcon, GoogleIcon, KakaoIcon } from "../_components/Icons";

export default function SignInPage() {
  const router = useRouter();
  return (
    <div className="sign-in-container">
      <span className="sign-in-title self-center">로그인</span>
      <div className="flex flex-col gap-4">
        <button
          onClick={() => router.push("/sign-up")}
          className="sm-btn-default flex justify-center items-center gap-4"
        >
          <GoogleIcon />
          <span>Google 계정으로 로그인</span>
        </button>
        <button className="sm-btn-default flex justify-center items-center gap-4">
          <AppleIcon />
          <span>Apple 계정으로 로그인</span>
        </button>
        <button className="sm-btn-default flex justify-center items-center gap-4">
          <KakaoIcon />
          <span>카카오 계정으로 로그인</span>
        </button>
      </div>
    </div>
  );
}
