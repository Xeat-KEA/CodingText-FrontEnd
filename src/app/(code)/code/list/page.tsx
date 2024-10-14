"use client";

import { DUMMY_CODE_LIST } from "../../_constants/constants";
import ListTopBar from "../../_components/ListTopBar";
import CodeCard from "../../_components/CodeCard";
import { useEffect } from "react";
import { usePaginationStore } from "@/app/stores";

export default function CodeListPage() {
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
