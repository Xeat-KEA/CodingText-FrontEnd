import { PostResult } from "@/app/(search)/_interfaces/interfaces";
import api from "@/app/_api/config";
import Pagination from "@/app/_components/Pagination";
import PostCard from "@/app/_components/PostCard";
import SearchBar from "@/app/_components/SearchBar";
import { TAB_BAR_ORDER_FILTER } from "@/app/_constants/constants";
import { usePathValue } from "@/app/_hooks/usePathValue";
import { Post } from "@/app/_interfaces/interfaces";
import {
  useBlogStore,
  useCategoryStore,
  usePaginationStore,
  useTokenStore,
} from "@/app/stores";
import { useQuery } from "@tanstack/react-query";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BlogListContainer() {
  usePathValue();
  const { accessToken, isTokenSet } = useTokenStore();

  const { currentBlogId, userBlogId } = useBlogStore();
  const { boardCategories } = useCategoryStore();
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

  const [result, setResult] = useState<Post[]>([]);

  const getBoardType = (boardId: number) => {
    if (pathname === `/blog/${currentBlogId}/category`) {
      return "ALL";
    }
    if (pathname.includes(`/blog/${currentBlogId}/code`)) {
      return params.codeId ? "CHILD" : "PARENT";
    }
    const isParentBoard = boardCategories.some(
      (category) => category.id === boardId
    );
    if (isParentBoard) return "PARENT";

    const isChildBoard = boardCategories.some((category) =>
      category.childCategories?.some((child) => child.id === boardId)
    );
    if (isChildBoard) return "CHILD";

    return "UNKNOWN";
  };

  // 블로그 게시글 목록 조회
  const fetchPostListData = async () => {
    const boardType = getBoardType(
      Number(params.categoryId) || Number(params.codeId)
    );

    let endpoint = "";
    let queryParams: Record<string, any> = { page: 0, size: 5 };

    if (boardType === "ALL") {
      endpoint = `/blog-service/blog/board/article/${currentBlogId}`;
    } else if (boardType === "PARENT") {
      const categoryId =
        pathname === `/blog/${currentBlogId}/code`
          ? 1
          : Number(params.categoryId);
      endpoint = `/blog-service/blog/board/article/parent/${categoryId}`;
      queryParams.blogId = currentBlogId;
    } else if (boardType === "CHILD") {
      const categoryId = params.categoryId || params.codeId;
      endpoint = `/blog-service/blog/board/article/child/${categoryId}`;
      queryParams.blogId = currentBlogId;
    }

    const response = await api.get(endpoint, { params: queryParams });
    
    // response에 blogId 정보 누락으로 인해 새로고침시 페이지 정보 안뜸 -> 추가 후 수정예정
    // setCurrentBlogId(response.data.data.blogId);
    setResult(response.data.data.articleList);
    console.log(response);
    return response.data.data.articleList;
  };
  const {
    data: postList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["postList", currentBlogId],
    queryFn: fetchPostListData,
    enabled: currentBlogId !== -1 && !!accessToken,
  });

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
                <PostCard post={el} />
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
