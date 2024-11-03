"use client";

import UserDetailInfo from "@/app/(admin)/_components/UserDetailInfo";
import UserListCard from "@/app/(admin)/_components/UserListCard";
import UserListTopBar from "@/app/(admin)/_components/UserListTopBar";
import UserSearch from "@/app/(admin)/_components/UserSearch";
import Pagination from "@/app/_components/Pagination";
import SaveOrCancelBtn from "@/app/_components/SaveOrCancelBtn";
import { useSetParams } from "@/app/_hooks/useSetParams";
import { useEffect, useState } from "react";

export default function UserManagementPage() {
  const [selectedId, setSelectedId] = useState(-1);
  const onCancel = () => {
    setSelectedId(-1);
  };

  const setParams = useSetParams();
  // 새로고침 시 검색 초기화
  useEffect(() => {
    setParams("keyword", "");
  }, []);

  return (
    <div className="flex flex-col gap-8 pt-2 h-full">
      {/* 사용자 검색창 */}
      <UserSearch />
      {/* 검색 결과 */}
      <div className="grow h-full">
        <div
          className={`${selectedId === -1 ? "flex" : "hidden"} flex-col gap-6`}
        >
          <div className="flex flex-col">
            <UserListTopBar />
            <UserListCard
              userId={1}
              nickname="Xeat"
              email="xeatcodingtext@gachon.ac.kr"
              rank="Junior"
              signedUpAt="2024-10-22"
              onClick={() => setSelectedId(1)}
            />
          </div>
          <Pagination />
        </div>
        {/* 사용자 상세 정보 및 초기화 페이지 */}
        {selectedId !== -1 && (
          <div className="flex flex-col gap-8 py-8 border-t border-border-2">
            <UserDetailInfo userId={1} />
            <SaveOrCancelBtn
              saveBtn="변경 사항 저장"
              onCancel={onCancel}
            />
          </div>
        )}
      </div>
    </div>
  );
}
