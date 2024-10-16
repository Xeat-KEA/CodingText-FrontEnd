"use client";

import SearchBar from "@/app/_components/SearchBar";
import {
  CODE_SEARCH_FILTER_LIST,
  DUMMY_PROFILE_DATA,
} from "../_constants/constants";
import Pagination from "@/app/_components/Pagination";
import ProfileCard from "./ProfileCard";
import CodeFilter from "./CodeFilter";

export default function CodeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="top-container pt-16">
        <div className="max-w-1200 flex py-12">
          {/* 문제 목록 부분 */}
          <div className="w-full pl-12 pr-3 flex flex-col gap-6 border-r border-border-2">
            {/* 문제 검색바 (검색 필터링 Dropdown이 가려지지 않게 z-index 설정) */}
            <div className="z-10">
              <SearchBar searchFilterList={CODE_SEARCH_FILTER_LIST} />
            </div>
            {/* 코드 필터링 */}
            <CodeFilter />
            {/* 문제 리스트 */}
            {children}
            <Pagination />
          </div>
          {/* 회원 정보 부분 */}
          <div className="w-[300px] shrink-0 pl-3 pr-12 relative">
            <ProfileCard userData={DUMMY_PROFILE_DATA} />
          </div>
        </div>
      </div>
    </>
  );
}
