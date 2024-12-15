import PostCard from "@/app/_components/PostCard";
import { useEffect, useState } from "react";
import { PostResult } from "../_interfaces/interfaces";
import api from "@/app/_api/config";
import { usePaginationStore } from "@/app/stores";
import { Post } from "@/app/_interfaces/interfaces";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Pagination from "@/app/_components/Pagination";

export default function PostResults() {
  const [result, setResult] = useState<Post[]>([]);

  // 페이지네이션
  const { page, setPage, setLastPage } = usePaginationStore();

  // searchParams에서 query 파라미터 가져오기
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const tab = searchParams.get("tab") || "BLOG";
  const category = (searchParams.get("category") || "ALL").toLowerCase();
  const sort =
    searchParams.get("order") === "ACCURACY"
      ? "score"
      : searchParams.get("order") === "RECENT"
      ? "latest"
      : "latest";

  // 게시글 목록 조회
  const fetchPostList = async () => {
    if (page === -1) return { data: [] };

    try {
      const res = await api.get("/blog-service/blog/article/search", {
        params: {
          query: keyword,
          page: page,
          type: category,
          sort: sort,
        },
      });

      // 날짜 내림차순
      const resultData = res.data.data.content;
      setResult(resultData);

      // 페이지 정보 초기화
      const lastPage = res.data.data.totalPages;
      if (page > lastPage) {
        setPage(lastPage);
      }
      setLastPage(lastPage - 1);

      return resultData;
    } catch (error) {
      console.error("게시글 목록을 가져오는 중 오류가 발생했습니다:", error);
      return [];
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["postList", page, keyword, category, tab, sort],
    queryFn: fetchPostList,
  });

  return (
    <div className="flex flex-col gap-6">
      {result && result.length !== 0 ? (
        <div className="relative grid grid-cols-2 max-md:grid-cols-1 gap-x-[96px]">
          {result && result.length !== 0
            ? result.map((el, index) => (
                <div
                  key={index}
                  className={`${index >= 2 && "border-t border-border-2"} ${
                    index >= 1 && "max-md:border-t border-border-2"
                  }`}
                >
                  <PostCard key={el.articleId} post={el} />
                </div>
              ))
            : null}
          {/* 가운데 구분선 */}
          <div className="max-md:hidden w-[1px] h-[calc(100%-48px)] bg-border-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
      ) : null}
      {result && result.length === 0 && (
        <div className="text-center py-12">
          <p className="text-base text-disabled">검색 결과가 없어요</p>
        </div>
      )}
      {result && result.length !== 0 && <Pagination />}
    </div>
  );
}
