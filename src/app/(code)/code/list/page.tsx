"use client";

import { useEffect, useState } from "react";
import { usePaginationStore } from "@/app/stores";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import api from "@/app/_api/config";
import CodeListTopBar from "../../_components/CodeListTopBar";
import { Code } from "../../_interfaces/interfaces";
import { useQuery } from "@tanstack/react-query";
import CodeCard from "../../_components/CodeCard";
import Pagination from "@/app/_components/Pagination";

export default function CodeListPage() {
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

  const algorithm = searchParams.get("algorithm") || "";
  const difficulty = searchParams.get("difficulty") || "";
  const order = searchParams.get("order") || "createdAt";
  const keyword = searchParams.get("keyword") || "";
  const searchBy = searchParams.get("filter") || "title";

  // 코드 리스트 불러오기
  const { page, setPage, setLastPage } = usePaginationStore();
  const fetchCodeList = async () => {
    const response = await api.get("/code-bank-service/code/lists", {
      headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}` },
      params: {
        algorithm,
        difficulty,
        searchBy: searchBy,
        searchText: searchBy === "title" ? keyword : Number(keyword),
        sortBy: order,
        page,
        size: 15,
      },
    });
    // 페이지 정보 초기화
    const lastPage = response.data.totalPages - 1;
    if (page > lastPage) {
      setPage(lastPage);
    }
    setLastPage(lastPage);
    return response.data;
  };
  const { data } = useQuery<{ content: Code[] }>({
    queryKey: ["codeList", algorithm, difficulty, order, page, keyword],
    queryFn: fetchCodeList,
  });

  return (
    <div className="w-full flex flex-col">
      {/* 문제 리스트 상단바 */}
      <CodeListTopBar />
      {/* 문제 */}
      <div className="w-full flex flex-col divide-y divide-border-1">
        {data?.content.map((el, index) => (
          <CodeCard
            key={index}
            codeId={el.codeId}
            title={el.title}
            difficulty={el.difficulty}
            algorithm={el.algorithm}
            content={el.content}
            correctRate={el.correctRate}
            registerStatus={el.registerStatus}
            createdAt={el.createdAt}
          />
        ))}
      </div>
    </div>
  );
}
