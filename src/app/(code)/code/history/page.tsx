"use client";

import { usePaginationStore } from "@/app/stores";
import HistoryTopBar from "../../_components/HistoryTopBar";
import { useCheckToken } from "@/app/_hooks/useCheckToken";
import api from "@/app/_api/config";
import { useQuery } from "@tanstack/react-query";
import HistoryCard from "../../_components/HistoryCard";
import { History } from "../../_interfaces/interfaces";
import { useSearchParams } from "next/navigation";

export default function CodeHistoryPage() {
  // 로그인 여부 확인
  const { accessToken, isTokenSet } = useCheckToken();

  // 페이지네이션
  const { page, setPage, setLastPage } = usePaginationStore();

  const searchParams = useSearchParams();
  const algorithm = searchParams.get("algorithm") || "";
  const difficulty = searchParams.get("difficulty") || "";
  const keyword = searchParams.get("keyword") || "";
  const searchBy = searchParams.get("filter") || "title";

  const fetchHistoryList = async () => {
    if (accessToken) {
      const response = await api.get("/code-bank-service/code/history/user", {
        headers: { Authorization: accessToken },
        params: {
          algorithm,
          difficulty,
          searchBy: searchBy,
          searchText: searchBy === "title" ? keyword : Number(keyword),
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
    } else {
      return null;
    }
  };
  const { data } = useQuery({
    queryKey: ["historyList", isTokenSet, algorithm, difficulty, keyword, page],
    queryFn: fetchHistoryList,
    select: (data) => data.content,
  });

  return (
    <div className="w-full flex flex-col">
      {/* 문제 리스트 상단바 */}
      <HistoryTopBar />
      {/* 문제 */}
      <div className="w-full flex flex-col divide-y divide-border-1">
        {data?.map((el: History) => (
          <HistoryCard key={el.codeHistoryId} history={el} />
        ))}
      </div>
    </div>
  );
}
