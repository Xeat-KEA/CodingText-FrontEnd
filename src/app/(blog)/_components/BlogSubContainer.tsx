import { PostResult } from "@/app/(search)/_interfaces/interfaces";
import api from "@/app/_api/config";
import Pagination from "@/app/_components/Pagination";
import PostCard from "@/app/_components/PostCard";
import SearchBar from "@/app/_components/SearchBar";
import { TAB_BAR_ORDER_FILTER } from "@/app/_constants/constants";
import { usePaginationStore } from "@/app/stores";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BlogSubContainer() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState("ACCURACY");
  useEffect(() => {
    // filter 변경 시 다시 GET 하는 로직 필요
  }, [filter]);

  useEffect(() => {
    const keyword = searchParams.get("keyword");
    if (keyword !== null) {
      // keyword 변화 시 감지 후 다시 GET하는 로직 필요
      console.log(keyword);
    }
  }, [searchParams]);

  const [result, setResult] = useState<PostResult[]>([]);

  // 프로토타입 더미 데이터 GET
  useEffect(() => {
    api.get("/article-list").then((res) => {
      // 날짜 내림차순
      const sortedData = res.data.data.sort((a: PostResult, b: PostResult) =>
        a.createAt > b.createAt ? -1 : 1
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
  // Page 변화 감지 후 문제 리스트 다시 GET 하는 과정 필요

  return (
    <div className="top-container">
      <div className="max-w-1000 min-h-screen flex flex-col gap-6 py-12">
        <SearchBar baseURL={pathname} />
        {/* 필터링 */}
        <div className="w-full h-[52px] flex justify-end items-center border-b border-border-2">
          <div className="flex gap-3 items-center">
            {TAB_BAR_ORDER_FILTER.map((el) => (
              <button
                key={el.selection}
                onClick={() => setFilter(el.selection)}
                className={`text-xs ${
                  filter === el.selection
                    ? "text-primary-1 font-semibold"
                    : "text-disabled"
                }`}
              >
                {el.content}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col divide-y divide-border-2">
          {result.length !== 0 ? (
            result.slice((page - 1) * 10, page * 10).map((el, index) => (
              <div
                key={index}
                className={`${index >= 2 && "border-t border-border2"}`}
              >
                <PostCard
                  articleId={el.articleId}
                  profileImg={`/profileImg${(el.articleId % 6) + 1}.png`}
                  category={"1단계"} // 게시판 추가 후 수정 필요
                  createAt={el.createAt}
                  title={el.title}
                  content={el.content}
                  likes={el.likeCount}
                  comments={el.replyCount}
                  views={el.replyCount} // 조회수 추가 후 수정 필요
                  codeId={el.codeId}
                />
              </div>
            ))
          ) : (
            <div>{/* 스켈레톤 UI 구성 예정 */}</div>
          )}
        </div>
        <Pagination />
      </div>
    </div>
  );
}
