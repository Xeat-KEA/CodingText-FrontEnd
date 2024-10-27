"use client";

import SignInTitle from "../_components/SignInTitle";
import SignUpFormContainer from "../_components/SignUpFormContainer";

export default function SignUpPage() {
  return (
    <div className="sign-in-container">
      <SignInTitle
        title="회원가입"
        content={"거의 다 끝났어요!\n당신의 정보를 입력해주세요"}
        hasBackBtn
      />
      {/* 회원가입 정보 기입 Form */}
      <SignUpFormContainer />
    </div>
  );
}
