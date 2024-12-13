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
import Link from "next/link";
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

  const [result, setResult] = useState<Post[]>([]);
  const [totalArticleNum, setTotalArticleNum] = useState(0);

  // 페이지네이션
  const { page, setPage, setLastPage } = usePaginationStore();

  // 현재 블로그 아이디 조회
  useEffect(() => {
    const blogId = Number(params.id);
    if (blogId && blogId !== -1) {
      setCurrentBlogId(blogId);
    }
  }, [params.id, setCurrentBlogId]);

  const keyword = searchParams.get("keyword");

  const getBoardType = (boardId: number) => {
    if (pathname === `/blog/${currentBlogId}/category`) {
      return "ALL";
    }
    if (pathname.includes(`/blog/${currentBlogId}/code`)) {
      return params.codeId ? "CHILD" : "PARENT";
    }

    if (params.categoryId) {
      if (params.childCategoryId) {
        return "CHILD";
      }
      return "PARENT";
    }
    return "UNKNOWN";
  };

  // 블로그 게시글 목록 조회
  const fetchPostListData = async () => {
    // if (page === -1) return { data: [] };

    const boardType = getBoardType(
      Number(params.categoryId) || Number(params.codeId)
    );

    let endpoint = "";
    const keyword = searchParams.get("keyword");

    let queryParams: Record<string, any> = { page: page, size: 5 };

    if (keyword) {
      // 검색이 적용된 경우
      if (boardType === "ALL") {
        // 전체
        endpoint = `/blog-service/blog/board/search/${currentBlogId}`;
        queryParams.searchWord = keyword;
      } else if (boardType === "PARENT") {
        // 상위
        const categoryId =
          pathname === `/blog/${currentBlogId}/code`
            ? 1
            : Number(params.categoryId);
        endpoint = `/blog-service/blog/board/search/parentCategory/${currentBlogId}`;
        queryParams.searchWord = keyword;
        queryParams.parentCategoryId = categoryId;
      } else if (boardType === "CHILD") {
        // 하위
        const categoryId = params.childCategoryId || params.codeId;
        endpoint = `/blog-service/blog/board/search/childCategory/${currentBlogId}`;
        queryParams.searchWord = keyword;
        queryParams.childCategoryId = categoryId;
      }
    } else {
      // 검색이 없는 일반 조회인 경우
      if (boardType === "ALL") {
        // 전체
        endpoint = `/blog-service/blog/board/article/${currentBlogId}`;
      } else if (boardType === "PARENT") {
        // 상위
        const categoryId =
          pathname === `/blog/${currentBlogId}/code`
            ? 1
            : Number(params.categoryId);
        endpoint = `/blog-service/blog/board/article/parent/${categoryId}`;
        queryParams.blogId = currentBlogId !== -1 ? currentBlogId : null;
      } else if (boardType === "CHILD") {
        // 하위
        const categoryId = params.childCategoryId || params.codeId;
        endpoint = `/blog-service/blog/board/article/child/${categoryId}`;
        queryParams.blogId = currentBlogId !== -1 ? currentBlogId : null;
      }
    }

    const response = await api.get(endpoint, { params: queryParams });
    setResult(response.data.data.articleList);
    setCurrentBlogId(response.data.data.blogId || params.id);
    setTotalArticleNum(response.data.data.totalArticle);
    console.log(response);

    // 페이지 정보 초기화
    const lastPage = response.data.data.pageInfo.totalPageNum;

    if (page > lastPage) {
      setPage(lastPage);
    }
    setLastPage(lastPage - 1);

    return response.data.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["postList", page, currentBlogId, params, keyword],
    queryFn: fetchPostListData,
  });

  return (
    <div className="top-container">
      <div className="max-w-1000 min-h-screen flex flex-col gap-6 py-12">
        <SearchBar baseURL={pathname} />
        {/* 필터링 */}
        <div className="w-full h-[52px] flex justify-start items-center border-b border-border-2">
          <div className="text-black text-sm">
            검색 결과
            <span className="font-bold text-primary-1"> {totalArticleNum}</span>
            건
          </div>
        </div>
        <div className="flex flex-col divide-y divide-border-2">
          {result.length > 0 ? (
            result.map((el, index) => (
              <div
                key={index}
                className={`${index >= 2 && "border-t border-border-2"}`}>
                <PostCard post={el} />
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-base text-disabled">검색 결과가 없어요</p>
            </div>
          )}
        </div>
        <Pagination />
      </div>
    </div>
  );
}
