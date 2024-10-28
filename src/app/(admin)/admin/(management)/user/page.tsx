"use client";

import SmSearchBar from "@/app/_components/SmSearchBar";

export default function UserManagementPage() {
  return (
    <div className="flex flex-col gap-8 pt-2">
      <div className="edit-container">
        <span className="edit-title">사용자 조회</span>
        <SmSearchBar
          baseURL="/admin/user"
          placeholder="닉네임 또는 이메일을 입력해주세요"
        />
      </div>
    </div>
  );
}
