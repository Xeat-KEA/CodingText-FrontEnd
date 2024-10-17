"use client";

import { DUMMY_CODE_LIST } from "../../_constants/constants";
import ListTopBar from "../../_components/ListTopBar";
import CodeCard from "../../_components/CodeCard";
import { useEffect } from "react";
import { usePaginationStore } from "@/app/stores";
import { useRouter } from "next/router";
import { usePathname, useSearchParams } from "next/navigation";

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

  const { setPage, setLastPage } = usePaginationStore();
  useEffect(() => {
    setPage(1);
    setLastPage(26);
  }, []);

  // Page 변화 감지 후 문제 리스트 다시 GET 하는 과정 필요

  // 코드 필터 변화 감지 후 문제 리스트 다시 GET 하는 과정 필요

  return (
    <div className="w-full flex flex-col">
      {/* 문제 리스트 상단바 */}
      <ListTopBar />
      {/* 문제 */}
      <div className="w-full flex flex-col divide-y divide-border-1">
        {DUMMY_CODE_LIST.map((el) => {
          return (
            <CodeCard
              key={el.id}
              id={el.id}
              title={el.title}
              difficulty={el.difficulty}
              participants={el.participants}
              rate={el.rate}
              createdAt={el.createdAt}
            />
          );
        })}
      </div>
    </div>
  );
}
