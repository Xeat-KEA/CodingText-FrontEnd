import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import api from "@/app/_api/config";
import { BlogResult } from "../_interfaces/interfaces";
import { usePaginationStore } from "@/app/stores";

export default function BlogResults() {
  const [result, setResult] = useState<BlogResult[]>([]);

  // 프로토타입 더미 데이터 GET
  useEffect(() => {
    api.get("/user-list").then((res) => {
      // 날짜 내림차순
      const resultData = res.data.data;
      setResult(resultData);
    });
  }, []);

  // 페이지네이션
  const { page, setPage, setLastPage } = usePaginationStore();
  // 첫 페이지 초기화
  useEffect(() => {
    setPage(1);
    setLastPage(Math.ceil(result.length / 20));
  }, [result]);

  return (
    <div className="relative grid grid-cols-2 gap-x-[96px]">
      {result.length !== 0 ? (
        result.slice((page - 1) * 20, page * 20).map((el, index) => (
          <div
            key={index}
            className={`${index >= 2 && "border-t border-border2"}`}
          >
            <BlogCard
              userId={el.userId}
              nickname={el.nickName}
              profileImg={`/profileImg${(el.userId % 6) + 1}.png`}
              status={el.profileMessage}
            />
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
