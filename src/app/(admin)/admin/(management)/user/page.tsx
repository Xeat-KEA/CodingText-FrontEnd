"use client";

import UserListCard from "@/app/(admin)/_components/UserListCard";
import UserListTopBar from "@/app/(admin)/_components/UserListTopBar";
import Pagination from "@/app/_components/Pagination";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserManagementPage() {
  const router = useRouter();

  const onClickUser = (id: number) => {
    router.push(`/admin/user/${id}`);
  };

  return (
    <>
      {/* 검색 결과 */}
      <div className="grow h-full">
        <div
          className={`flex flex-col gap-6`}>
          <div className="flex flex-col">
            <UserListTopBar />
            <UserListCard
              userId={1}
              nickname="Xeat"
              email="xeatcodingtext@gachon.ac.kr"
              rank="Junior"
              signedUpAt="2024-10-22"
              onClick={() => onClickUser(1)}
            />
          </div>
          <Pagination />
        </div>
      </div>
    </>
  );
}
