"use client";

import { usePaginationStore } from "@/app/stores";
import HistoryTopBar from "../../_components/HistoryTopBar";
import { useEffect, useState } from "react";
import HistoryCard from "../../_components/HistoryCard";
import { useCheckToken } from "@/app/_hooks/useCheckToken";
import api from "@/app/_api/config";
import { History } from "../../_interfaces/interfaces";

export default function CodeHistoryPage() {
  // 로그인 여부 확인
  const {} = useCheckToken(true);

  const [data, setData] = useState<History[]>([]);

  // 페이지네이션
  const { page, setPage, setLastPage } = usePaginationStore();
  // 첫 페이지 초기화
  useEffect(() => {
    setPage(1);
    setLastPage(Math.ceil(data.length / 10));
  }, [data]);
  // Page 변화 감지 후 문제 리스트 다시 GET 하는 과정 필요

  // 프로토타입 API 코드 풀이 기록 GET
  useEffect(() => {
    api.get("history-list/1").then((res) => {
      const sortedResult: History[] = res.data.data.reverse();
      setData(sortedResult);
    });
  }, []);
  // 코드 필터 변화 감지 후 문제 리스트 다시 GET 하는 과정 필요

  return (
    <div className="w-full flex flex-col">
      {/* 문제 리스트 상단바 */}
      <HistoryTopBar />
      {/* 문제 */}
      <div className="w-full flex flex-col divide-y divide-border-1">
        {data.map((el) => (
          <HistoryCard
            key={el.historyId}
            historyId={el.historyId}
            createdAt={el.createdAt}
            title={el.title}
            isCorrect={el.isCorrect}
            registerStatus={el.registerStatus}
            isAI={el.isAI}
            codeId={el.codeId}
            userId={el.userId}
          />
        ))}
      </div>
    </div>
  );
}
