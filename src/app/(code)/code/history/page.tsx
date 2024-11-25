"use client";

import { usePaginationStore } from "@/app/stores";
import HistoryTopBar from "../../_components/HistoryTopBar";
import { useEffect, useState } from "react";
import HistoryCard from "../../_components/HistoryCard";
import { useCheckToken } from "@/app/_hooks/useCheckToken";
import api from "@/app/_api/config";
import { History } from "../../_interfaces/interfaces";
import { useQuery } from "@tanstack/react-query";

export default function CodeHistoryPage() {
  // 로그인 여부 확인
  const {} = useCheckToken(true);

  // 페이지네이션
  const { page, setPage, setLastPage } = usePaginationStore();
  // 첫 페이지 초기화

  const fetchHistoryList = async () => {
    const response = await api.get("/code-bank-service/code/history/user", {
      headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}` },
    });
    return response.data;
  };
  const { data } = useQuery({
    queryKey: ["historyList"],
    queryFn: fetchHistoryList,
  });

  console.log(data);

  return (
    <div className="w-full flex flex-col">
      {/* 문제 리스트 상단바 */}
      <HistoryTopBar />
      {/* 문제 */}
      <div className="w-full flex flex-col divide-y divide-border-1">
        {/* {data.map((el) => (
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
        ))} */}
      </div>
    </div>
  );
}
