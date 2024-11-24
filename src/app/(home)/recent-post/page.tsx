"use client";

import api from "@/app/_api/config";
import PostCard from "@/app/_components/PostCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { PostsResponse } from "../_interfaces/interfaces";

export default function RecentPostPage() {
  const fetchRecents = async ({
    pageParam,
  }: {
    pageParam?: number;
  }): Promise<PostsResponse> => {
    const response = await api.get("/blog-service/blog/board/article/recent", {
      params: { page: pageParam, size: 5 },
      headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}` },
    });

    return response.data.data;
  };

  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: ["recents"],
    queryFn: fetchRecents,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      console.log(lastPage);
      if (lastPage.pageInfo.totalPageNum === lastPage.pageInfo.currentPageNum) {
        return undefined;
      } else {
        return lastPage.pageInfo.currentPageNum;
      }
    },
    select: (data) => data.pages.flatMap((page) => page.responseDtoList),
  });

  return (
    <div className="top-container">
      <div className="max-w-1000 pt-16">
        <div className="flex flex-col py-8 gap-4">
          {/* 게시글 목록 제목 / 설명 */}
          <div className="main-text-container">
            <div className="main-title-container">
              <span className="main-title">최신 게시글</span>
            </div>
            <span className="main-sub-title">
              요즘 개발자의 관심사를 알아보세요
            </span>
          </div>
          <div className="flex flex-col divide-y divide-border-2">
            {data?.map((el) => (
              <PostCard key={el.articleId} post={el} />
            ))}
          </div>
          <button onClick={() => fetchNextPage()}>다음 페이지 로딩</button>
        </div>
      </div>
    </div>
  );
}
