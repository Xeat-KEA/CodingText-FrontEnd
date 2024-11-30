import { PostResult } from "@/app/(search)/_interfaces/interfaces";
import api from "@/app/_api/config";
import Pagination from "@/app/_components/Pagination";
import PostCard from "@/app/_components/PostCard";
import SearchBar from "@/app/_components/SearchBar";
import { TAB_BAR_ORDER_FILTER } from "@/app/_constants/constants";
import { useCheckToken } from "@/app/_hooks/useCheckToken";
import { usePathValue } from "@/app/_hooks/usePathValue";
import {
  useBlogStore,
  useCategoryStore,
  usePaginationStore,
} from "@/app/stores";
import { useQuery } from "@tanstack/react-query";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BlogListContainer() {
  const { accessToken, isTokenSet } = useCheckToken();

  usePathValue();

  const { currentBlogId, userBlogId } = useBlogStore();
  const { boardCategories } = useCategoryStore();
  // const setUserBlogId = useBlogStore((state) => state.setUserBlogId);
  const setCurrentBlogId = useBlogStore((state) => state.setCurrentBlogId);
  const params = useParams();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState("ACCURACY");

  // 현재 블로그 아이디 조회
  useEffect(() => {
    const blogId = Number(params.id);
    if (blogId && blogId !== -1) {
      setCurrentBlogId(blogId);
    }
  }, [params.id, setCurrentBlogId]);


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

  // 블로그 전체 게시글 목록 조회
  const fetchAllListData = async () => {
    const response = await api.get(
      `/blog-service/blog/board/article/${currentBlogId}`,
      {
        params: { page: 0, size: 5 },
      }
    );
    console.log(response.data.data);
    setResult(response.data.data.articleList);
    return response.data.data;
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["allPosts", userBlogId],
    queryFn: fetchAllListData,
    enabled:
      pathname === `/blog/${currentBlogId}/category` &&
      currentBlogId !== -1 &&
      !!accessToken,
  });

  // 게시글 목록 조회 API 수정 중
  // 특정 상위게시글 전체 목록 조회
  // const fetchParentList = async() => {
  //   const response = await api.get(
  //     `/blog-service/blog/board/childList/${}`,

  //   )
  // }

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
                }`}>
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
                className={`${index >= 2 && "border-t border-border2"}`}>
                <PostCard
                  // articleId={el.articleId}
                  // profileImg={`/profileImg${(el.articleId % 6) + 1}.png`}
                  // category={"1단계"} // 게시판 추가 후 수정 필요
                  // createAt={el.createdDate}
                  // title={el.title}
                  // content={el.content}
                  // likes={el.likeCount}
                  // comments={el.replyCount}
                  // views={el.replyCount} // 조회수 추가 후 수정 필요
                  // codeId={el.codeId}
                  post={el}
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
