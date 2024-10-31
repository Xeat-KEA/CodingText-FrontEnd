"use client";

import AdminCodeCard from "@/app/(admin)/_components/AdminCodeCard";
import CodeFilter from "@/app/(code)/_components/CodeFilter";
import CodeListTopBar from "@/app/(code)/_components/CodeListTopBar";
import Pagination from "@/app/_components/Pagination";
import SearchBar from "@/app/_components/SearchBar";
import { ALGORITHM_LIST } from "@/app/_constants/constants";
import { useRegisterStore } from "@/app/stores";
import Link from "next/link";
import { useEffect } from "react";

const dummy = [
  { codeId: 1, title: "문제 1", difficulty: 1, algorithm: ALGORITHM_LIST[0] },
  { codeId: 2, title: "문제 2", difficulty: 2, algorithm: ALGORITHM_LIST[1] },
  { codeId: 3, title: "문제 3", difficulty: 3, algorithm: ALGORITHM_LIST[2] },
  { codeId: 4, title: "문제 4", difficulty: 4, algorithm: ALGORITHM_LIST[3] },
  { codeId: 5, title: "문제 5", difficulty: 5, algorithm: ALGORITHM_LIST[4] },
];

export default function AdminCodePage() {
  // 건의된 문제 생성 여부 state 설정
  const { setIsRegistering } = useRegisterStore();
  useEffect(() => {
    setIsRegistering(false);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <SearchBar baseURL="/admin/code" hasFilter />
      {/* 코드 필터링 드롭다운 */}
      <div className="flex gap-4 z-10">
        <CodeFilter hasOrder />
        <Link href="/admin/code/new-code" className="btn-primary w-full">
          새 문제 생성
        </Link>
      </div>
      {/* 문제 리스트 */}
      <div className="flex flex-col">
        <CodeListTopBar isAdmin />
        <div className="flex flex-col divide-y divide-border-2">
          {dummy.map((el, index) => (
            <AdminCodeCard key={index} codeId={el.codeId} title={el.title} />
          ))}
        </div>
      </div>
      <Pagination />
    </div>
  );
}
