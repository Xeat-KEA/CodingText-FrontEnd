"use client";

import AdminCodeCard from "@/app/(admin)/_components/AdminCodeCard";
import CodeCard from "@/app/(code)/_components/CodeCard";
import CodeFilter from "@/app/(code)/_components/CodeFilter";
import CodeListTopBar from "@/app/(code)/_components/CodeListTopBar";
import { Code } from "@/app/(code)/_interfaces/interfaces";
import api from "@/app/_api/config";
import Pagination from "@/app/_components/Pagination";
import SearchBar from "@/app/_components/SearchBar";
import { usePaginationStore } from "@/app/stores";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function AdminCodePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // 기본 query parameters 설정
  useEffect(() => {
    const currentParams = new URLSearchParams(searchParams.toString());
    let updated = false;

    if (!currentParams.get("order")) {
      currentParams.set("order", "createdAt");
      updated = true;
    }

    // 기본값이 설정된 경우에만 URL을 업데이트
    if (updated) {
      router.replace(`${pathname}?${currentParams.toString()}`);
    }
  }, [searchParams, router, pathname]);

  const algorithms = searchParams.get("algorithms") || "";
  const difficulties = searchParams.get("difficulties") || "";
  const order = searchParams.get("order") || "createdAt";
  const keyword = searchParams.get("keyword") || "";
  const searchBy = searchParams.get("filter") || "title";

  // 코드 리스트 불러오기
  const { page, setPage, setLastPage } = usePaginationStore();
  const fetchCodeList = async () => {
    const response = await api.get("/code-bank-service/code/lists", {
      headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}` },
      params: {
        algorithms,
        difficulties,
        searchBy: searchBy,
        searchText: searchBy === "title" ? keyword : Number(keyword),
        sortBy: order,
        page,
        size: 10,
      },
    });
    // 페이지 정보 초기화
    const lastPage = response.data.totalPages - 1;
    if (page > lastPage) {
      setPage(lastPage);
    }
    setLastPage(lastPage);
    return response.data.content;
  };
  const { data } = useQuery<Code[]>({
    queryKey: ["codeList", algorithms, difficulties, order, page, keyword],
    queryFn: fetchCodeList,
  });

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
          {data?.map((el) => (
            <AdminCodeCard key={el.codeId} code={el} />
          ))}
        </div>
      </div>
      <Pagination />
    </div>
  );
}
