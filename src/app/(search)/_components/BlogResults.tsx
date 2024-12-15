import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import api from "@/app/_api/config";
import { BlogResult } from "../_interfaces/interfaces";
import { usePaginationStore } from "@/app/stores";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import Pagination from "@/app/_components/Pagination";

export default function BlogResults() {
  const [result, setResult] = useState<BlogResult[]>([]);

  // 페이지네이션
  const { page, setPage, setLastPage } = usePaginationStore();

  // searchParams에서 query 파라미터 가져오기
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const tab = searchParams.get("tab") || "BLOG";

  // 블로그 목록 조회
  const fetchBlogList = async () => {
    if (page === -1) return { data: [] };

    try {
      const res = await api.get("/blog-service/blog/search", {
        params: {
          query: keyword,
          page: page,
        },
      });

      // 날짜 내림차순
      const resultData = res.data.data.content;

      // 결과 상태 업데이트
      setResult(resultData);

      // 페이지 정보 초기화
      const lastPage = res.data.data.totalPages;
      if (page > lastPage) {
        setPage(lastPage);
      }
      setLastPage(lastPage - 1);

      return resultData;
    } catch (error) {
      console.error("블로그 목록을 가져오는 중 오류가 발생했습니다:", error);
      return [];
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["blogList", page, keyword, tab],
    queryFn: fetchBlogList,
  });

  return (
    <div className="flex flex-col gap-6">
      {result && result.length !== 0 ? (
        <div className="relative grid grid-cols-2 gap-x-[96px]">
          {result.map((el, index) => (
            <div
              key={index}
              className={`${index >= 2 && "border-t border-border-2"}`}
            >
              <BlogCard
                userId={el.id}
                nickname={el.nickname}
                profileImg={el.profileUrl}
                status={el.profileMessage}
              />
            </div>
          ))}
          {/* 가운데 구분선 */}
          <div className="w-[1px] h-[calc(100%-48px)] bg-border-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
      ) : null}

      {/* 검색 결과가 없을 때 */}
      {result && result.length === 0 && (
        <div className="text-center py-12">
          <p className="text-base text-disabled">검색 결과가 없어요</p>
        </div>
      )}

      <Pagination />
    </div>
  );
}
