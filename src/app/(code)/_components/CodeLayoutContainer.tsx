"use client";

import SearchBar from "@/app/_components/SearchBar";
import ProfileCard from "./ProfileCard";
import CodeFilter from "./CodeFilter";
import { usePathname } from "next/navigation";
import { useTokenStore } from "@/app/stores";
import api from "@/app/_api/config";
import { useQuery } from "@tanstack/react-query";
import { Statistics } from "@/app/_interfaces/interfaces";

export default function CodeLayoutContainer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  // 로그인 여부 확인 (풀이 기록 페이지에서만 로그인으로 이동)
  const { accessToken, isTokenSet } = useTokenStore();

  // 사용자 분석 정보 API 호출
  const fetchStatistics = async () => {
    const response = await api.get("/user-service/users/statistics", {
      headers: { Authorization: accessToken },
    });
    return response.data;
  };
  const { data: statistics } = useQuery<Statistics>({
    queryKey: ["statistics", isTokenSet],
    queryFn: fetchStatistics,
    enabled: !!accessToken,
  });

  return (
    <>
      <div className="top-container pt-16">
        <div className="max-w-1200 flex py-8 max-lg:flex-col-reverse">
          <div className="w-full lg:border-r max-lg:border-t border-border-1 max-lg:pt-6">
            {/* 문제 목록 부분 */}
            <div className="w-full lg:pr-6 flex flex-col gap-6">
              {/* 문제 검색바 (검색 필터링 DropDown이 가려지지 않게 z-index 설정) */}
              <div className="z-10">
                {/* pathname을 키 값으로 설정하여 페이지 변화 시 SearchBar 초기화 */}
                <SearchBar key={pathname} hasFilter baseURL={pathname} />
              </div>
              {/* 코드 필터링 */}
              <div className="flex gap-4">
                <CodeFilter hasOrder={pathname.startsWith("/code/list")} />
              </div>
              {/* 문제 리스트 */}
              {children}
            </div>
          </div>
          {/* 회원 정보 부분 */}
          <div className="shrink-0 lg:pl-6 max-lg:pb-6 relative">
            <ProfileCard statistics={statistics} />
          </div>
        </div>
      </div>
    </>
  );
}
