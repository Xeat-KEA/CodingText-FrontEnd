"use client";

import SignInTitle from "../_components/SignInTitle";
import { SOCIAL_LOGIN_BUTTON_LIST } from "../_constants/constants";
import Link from "next/link";
import Image from "next/image";

export default function SignInPage() {
  return (
    <div className="sign-in-container">
      <SignInTitle title="로그인" />
      {/* 소셜 로그인 버튼 */}
      <div className="flex flex-col items-center gap-4">
        {SOCIAL_LOGIN_BUTTON_LIST.map((el, index) => (
          <Link key={el.service} href={el.redirectionURL}>
            <Image
              src={el.image}
              width={300}
              height={45}
              alt={el.service}
              style={{ width: 300, height: 45 }}
              priority
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
