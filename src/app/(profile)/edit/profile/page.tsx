"use client";

import SignOutOrDeleteAccount from "../../_components/SignOut";
import { useCheckToken } from "@/app/_hooks/useCheckToken";
import EditProfileFormContainer from "../../_components/EditProfileFormContainer";

export default function EditProfilePage() {
  // 로그인 여부 확인
  const {} = useCheckToken();

  return (
    <>
      {/* 사용자 정보 변경 Form */}
      <EditProfileFormContainer />
      {/* 로그아웃 및 회원 탈퇴 */}
      <SignOutOrDeleteAccount />
    </>
  );
}
