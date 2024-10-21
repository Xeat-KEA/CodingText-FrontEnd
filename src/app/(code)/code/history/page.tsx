"use client";

import { usePaginationStore } from "@/app/stores";
import HistoryTopBar from "../../_components/HistoryTopBar";
import { useEffect } from "react";
import { DUMMY_CODE_HISTORY } from "../../_constants/constants";
import HistoryCard from "../../_components/HistoryCard";
import { useCheckToken } from "@/app/_hooks/useCheckToken";

export default function CodeHistoryPage() {
  // 로그인 여부 확인
  const {} = useCheckToken(true);

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
      <HistoryTopBar />
      {/* 문제 */}
      <div className="w-full flex flex-col divide-y divide-border-1">
        {DUMMY_CODE_HISTORY.map((el, index) => {
          return (
            <HistoryCard
              key={index}
              id={el.id}
              title={el.title}
              difficulty={el.difficulty}
              participants={el.participants}
              rate={el.rate}
              hasSolved={el.hasSolved}
              createdAt={el.createdAt}
            />
          );
        })}
      </div>
    </div>
  );
}
