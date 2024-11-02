"use client";

import CodeCard from "../../_components/CodeCard";
import { useEffect, useState } from "react";
import { usePaginationStore } from "@/app/stores";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import api from "@/app/_api/config";
import { Code } from "../../_interfaces/interfaces";
import CodeListTopBar from "../../_components/CodeListTopBar";

export default function CodeListPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // 기본 query parameters 설정
  useEffect(() => {
    const currentParams = new URLSearchParams(searchParams.toString());
    let updated = false;

    if (!currentParams.get("order")) {
      currentParams.set("order", "최신순");
      updated = true;
    }

    // 기본값이 설정된 경우에만 URL을 업데이트
    if (updated) {
      router.replace(`${pathname}?${currentParams.toString()}`);
    }
  }, [searchParams, router, pathname]);
  // 코드 필터 변화 감지 후 문제 리스트 다시 GET 하는 과정 필요

  // 프로토타입 API 문제목록 GET
  const [data, setData] = useState<Code[]>([]);
  useEffect(() => {
    api.get("/code-list").then((res) => {
      const result: Code[] = res.data.data.map((el: Code) => ({
        ...el,
        participants: el.codeId * 100,
        rate: el.codeId * 10,
      }));
      setData(result);
    });
  }, []);

  // 페이지네이션
  const { page, setPage, setLastPage } = usePaginationStore();
  // 첫 페이지 초기화
  useEffect(() => {
    setPage(1);
    setLastPage(Math.ceil(data.length / 10));
  }, [data]);
  // Page 변화 감지 후 문제 리스트 다시 GET 하는 과정 필요

  return (
    <div className="w-full flex flex-col">
      {/* 문제 리스트 상단바 */}
      <CodeListTopBar />
      {/* 문제 */}
      <div className="w-full flex flex-col divide-y divide-border-1">
        {data.slice((page - 1) * 10, page * 10).map((el) => (
          <CodeCard
            key={el.codeId}
            codeId={el.codeId}
            title={el.title}
            difficulty={el.difficulty}
            participants={el.participants}
            rate={el.rate}
          />
        ))}
      </div>
    </div>
  );
}
