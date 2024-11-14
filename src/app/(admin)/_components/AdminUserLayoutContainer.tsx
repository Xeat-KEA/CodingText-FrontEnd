"use client";

import { useSetParams } from "@/app/_hooks/useSetParams";
import UserSearch from "./UserSearch";
import { useEffect } from "react";

export default function AdminUserLayoutContainer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const setParams = useSetParams();
    // 새로고침 시 검색 초기화
    useEffect(() => {
      setParams("keyword", "");
    }, []);
  
  return (
    <>
      <div className="w-full flex flex-col gap-8 px-6 overflow-y-auto">
        <div className="flex flex-col gap-8 pt-2 h-full">
          {/* 사용자 검색창 */}
          <UserSearch />
          {children}
        </div>
      </div>
    </>
  );
}
