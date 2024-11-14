"use client";

import UserDetailInfo from "@/app/(admin)/_components/UserDetailInfo";
import SaveOrCancelBtn from "@/app/_components/SaveOrCancelBtn";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserManagementDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const [selectedId, setSelectedId] = useState(-1);

  useEffect(() => {
    if (id) {
      setSelectedId(Number(id));
    }
  }, [id]);

  const onCancel = () => {
    setSelectedId(-1);
    router.back();
  };

  return (
    <>
      {/* 사용자 상세 정보 및 초기화 페이지 */}
      {selectedId !== -1 && (
        <div className="flex flex-col gap-8 py-8 border-t border-border-2">
          <UserDetailInfo userId={1} />
          <SaveOrCancelBtn saveBtn="변경 사항 저장" onCancel={onCancel} />
        </div>
      )}
    </>
  );
}
