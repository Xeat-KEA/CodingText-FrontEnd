import PostCard from "@/app/_components/PostCard";
import { useEffect, useState } from "react";
import { PostResult } from "../_interfaces/interfaces";
import api from "@/app/_api/config";
import { usePaginationStore } from "@/app/stores";
import { Post } from "@/app/_interfaces/interfaces";

export default function PostResults() {
  const [result, setResult] = useState<Post[]>([]);

  // 프로토타입 더미 데이터 GET
  useEffect(() => {
    api.get("/article-list").then((res) => {
      // 날짜 내림차순
      const sortedData = res.data.data.sort((a: Post, b: Post) =>
        a.createdDate > b.createdDate ? -1 : 1
      );
      setResult(sortedData);
    });
  }, []);

  // 페이지네이션
  const { page, setPage, setLastPage } = usePaginationStore();
  // 첫 페이지 초기화
  useEffect(() => {
    setPage(1);
    setLastPage(Math.ceil(result.length / 10));
  }, [result]);

  return (
    <div className="relative grid grid-cols-2 gap-x-[96px]">
      {result.length !== 0 ? (
        result.slice((page - 1) * 10, page * 10).map((el, index) => (
          <div
            key={index}
            className={`${index >= 2 && "border-t border-border2"}`}>
            <PostCard key={el.articleId} post={el} />
          </div>
        ))
      ) : (
        <div>{/* 스켈레톤 UI 구성 예정 */}</div>
      )}
      {/* 가운데 구분선 */}
      <div className="w-[1px] h-[calc(100%-48px)] bg-border-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
}
