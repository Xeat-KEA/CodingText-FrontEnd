"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DonePage() {
  return (
    <div className="sign-in-container">
      <div className="flex flex-col gap-4 items-center">
        <span className="sign-in-title">환영합니다</span>
        <span className="sign-in-content">
          {"회원가입이 완료되었어요!\n즉시 서비스를 이용할 수 있어요"}
        </span>
      </div>
      <Link href="/" className="btn-primary">
        메인 페이지로
      </Link>
    </div>
  );
}
