"use client";

import SearchBar from "@/app/_components/SearchBar";
import { DUMMY_PROFILE_DATA } from "../_constants/constants";
import Pagination from "@/app/_components/Pagination";
import ProfileCard from "./ProfileCard";
import CodeFilter from "./CodeFilter";
import { usePathname } from "next/navigation";
import { useCheckToken } from "@/app/_hooks/useCheckToken";

export default function CodeLayoutContainer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  // 로그인 여부 확인 (풀이 기록 페이지에서만 로그인으로 이동)
  const { token } = useCheckToken(pathname === "/code/history");
  return (
    <>
      <div className="top-container pt-16">
        <div className="max-w-1200 flex py-12">
          {/* 문제 목록 부분 */}
          <div className="w-full pr-6 flex flex-col gap-6 border-r border-border-2">
            {/* 문제 검색바 (검색 필터링 DropDown이 가려지지 않게 z-index 설정) */}
            <div className="z-10">
              {/* pathname을 키 값으로 설정하여 페이지 변화 시 SearchBar 초기화 */}
              <SearchBar key={pathname} hasFilter baseURL={pathname} />
            </div>
            {/* 코드 필터링 */}
            <CodeFilter />
            {/* 문제 리스트 */}
            {children}
            <Pagination />
          </div>
          {/* 회원 정보 부분 */}
          <div className="w-[300px] shrink-0 pl-6 relative">
            <ProfileCard userData={token ? DUMMY_PROFILE_DATA : undefined} />
          </div>
        </div>
      </div>
    </>
  );
}
