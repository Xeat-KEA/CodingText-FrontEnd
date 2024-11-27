"use client";

import api from "@/app/_api/config";
import PostCard from "@/app/_components/PostCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { PostsResponse } from "../_interfaces/interfaces";
import { motion } from "framer-motion";
import LoadingAnimation from "@/app/_components/LoadingAnimation";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { POSTS_LIST } from "../_constants/constants";
import { useCheckToken } from "@/app/_hooks/useCheckToken";

export default function CodePostPage() {
  const {} = useCheckToken();

  const fetchCodes = async ({
    pageParam,
  }: {
    pageParam?: number;
  }): Promise<PostsResponse> => {
    const response = await api.get("/blog-service/blog/board/code/recent", {
      params: { page: pageParam, size: 5 },
      headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}` },
    });

    return response.data.data;
  };

  // 무한스크롤 데이터 가져오기
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["codes"],
      queryFn: fetchCodes,
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        if (
          lastPage.pageInfo.totalPageNum === lastPage.pageInfo.currentPageNum
        ) {
          return undefined;
        } else {
          return lastPage.pageInfo.currentPageNum;
        }
      },
      // 데이터 평탄화
      select: (data) => data.pages.flatMap((page) => page.articleList),
    });

  // 무한스크롤 트리거
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div className="top-container">
      <div className="max-w-1000 pt-16">
        <div className="flex flex-col py-8 gap-4">
          {/* 게시글 목록 제목 / 설명 */}
          <div className="main-text-container">
            <div className="main-title-container">
              <span className="main-title">{POSTS_LIST[2].title}</span>
            </div>
            <span className="main-sub-title">{POSTS_LIST[2].content}</span>
          </div>
          <div className="flex flex-col divide-y divide-border-2">
            {!isLoading ? (
              <>
                {data?.map((el) => (
                  <PostCard key={el.articleId} post={el} />
                ))}
              </>
            ) : (
              <>{/* 스켈레톤 UI 적용 예정 */}</>
            )}
          </div>
          {!isLoading && hasNextPage && (
            // 노출 시 다음 데이터 fetch
            <div ref={ref} className="w-full h-10 flex-center">
              <LoadingAnimation />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
