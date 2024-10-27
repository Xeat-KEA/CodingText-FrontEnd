"use client";

import SignInTitle from "../_components/SignInTitle";
import { SOCIAL_LOGIN_BUTTON_LIST } from "../_constants/constants";
import SignInBtn from "../_components/SignInBtn";

export default function SignInPage() {
  return (
    <div className="sign-in-container">
      <SignInTitle title="로그인" />
      {/* 소셜 로그인 버튼 */}
      <div className="flex flex-col gap-4">
        {SOCIAL_LOGIN_BUTTON_LIST.map((el, index) => (
          <SignInBtn
            key={index}
            icon={el.icon}
            service={el.service}
            redirectionURL={el.redirectionURL}
          />
        ))}
      </div>
    </div>
  );
}
