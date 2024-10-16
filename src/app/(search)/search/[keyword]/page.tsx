"use client";

import SearchBar from "@/app/_components/SearchBar";
import TopBar from "@/app/_components/TopBar";
import { usePaginationStore } from "@/app/stores";
import { useEffect } from "react";
import Pagination from "@/app/_components/Pagination";
import PostResults from "../../_components/PostResults";
import BlogResults from "../../_components/BlogResults";
import { SEARCH_TAB_MENU_LIST } from "../../_constants/constants";
import SearchTabBar from "../../_components/SearchTabBar";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { setPage, setLastPage } = usePaginationStore();
  useEffect(() => {
    setPage(1);
    setLastPage(36);
  }, []);

  // 기본 query parameters 설정
  useEffect(() => {
    const currentParams = new URLSearchParams(searchParams.toString());
    let updated = false;

    if (!currentParams.get("tab")) {
      currentParams.set("tab", "POST");
      updated = true;
    }
    if (!currentParams.get("category")) {
      currentParams.set("category", "ALL");
      updated = true;
    }
    if (!currentParams.get("order")) {
      currentParams.set("order", "ACCURACY");
      updated = true;
    }

    // 기본값이 설정된 경우에만 URL을 업데이트
    if (updated) {
      router.replace(`${pathname}?${currentParams.toString()}`);
    }
  }, [searchParams, router, pathname]);

  return (
    <>
      <TopBar />
      <div className="w-full flex justify-center pt-16">
        <div className="max-w-1200 flex p-12">
          <div className="flex flex-col w-full gap-6">
            <SearchBar />
            <SearchTabBar menuList={SEARCH_TAB_MENU_LIST} />
            {/* 검색 결과 목록 */}
            {searchParams.get("tab") === "POST" ? (
              <PostResults />
            ) : (
              searchParams.get("tab") === "BLOG" && <BlogResults />
            )}
            <Pagination />
          </div>
        </div>
      </div>
    </>
  );
}