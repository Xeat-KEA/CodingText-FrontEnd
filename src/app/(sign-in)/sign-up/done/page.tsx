"use client";

import Link from "next/link";
import SignInTitle from "../../_components/SignInTitle";

export default function DonePage() {
  return (
    <div className="sign-in-container">
      <SignInTitle
        title="환영합니다"
        content={"회원가입이 완료되었어요!\n즉시 서비스를 이용할 수 있어요"}
      />
      <Link href="/" className="btn-primary" scroll={false}>
        메인 페이지로
      </Link>
    </div>
  );
}
