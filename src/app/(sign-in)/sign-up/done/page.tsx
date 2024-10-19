"use client";

import Link from "next/link";

export default function DonePage() {
  // 임시 토큰 발행 (사용자 id값 포함)
  const token = String(1);
  localStorage.setItem("token", token);

  return (
    <div className="sign-in-container">
      <div className="flex flex-col gap-4 items-center">
        <span className="sign-in-title">환영합니다</span>
        <span className="sign-in-content">
          {"회원가입이 완료되었어요!\n즉시 서비스를 이용할 수 있어요"}
        </span>
      </div>
      <Link href="/" className="btn-primary" scroll={false}>
        메인 페이지로
      </Link>
    </div>
  );
}
