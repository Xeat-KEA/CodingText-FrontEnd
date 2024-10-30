"use client";

import SearchBar from "@/app/_components/SearchBar";
import Pagination from "@/app/_components/Pagination";
import ProfileCard from "./ProfileCard";
import CodeFilter from "./CodeFilter";
import { usePathname } from "next/navigation";
import { useCheckToken } from "@/app/_hooks/useCheckToken";
import { useEffect, useState } from "react";
import api from "@/app/_api/config";
import { ProfileData } from "@/app/_interfaces/interfaces";

export default function CodeLayoutContainer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  // 로그인 여부 확인 (풀이 기록 페이지에서만 로그인으로 이동)
  const { token } = useCheckToken(pathname === "/code/history");

  // 프로토타입 API 사용자 정보 GET
  const [data, setData] = useState<ProfileData>();
  useEffect(() => {
    api.get("/my-page/1").then((res) => {
      const result: ProfileData = {
        ...res.data.data,
        // 이미지 받아 오게 되면 수정 필요
        profileImg: "/profileImg1.png",
      };
      setData(result);
    });
  }, []);

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
            <div className="flex gap-4">
              <CodeFilter hasOrder={pathname.startsWith("/code/list")} />
            </div>
            {/* 문제 리스트 */}
            {children}
            <Pagination />
          </div>
          {/* 회원 정보 부분 */}
          <div className="w-[300px] shrink-0 pl-6 relative">
            <ProfileCard
              userData={
                token
                  ? {
                      profileImg: data?.profileImg!,
                      rank: "Junior",
                      nickname: data?.nickName!,
                      solved: 10,
                      registered: 2,
                      score: 1200,
                      ranking: 60,
                    }
                  : undefined
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}
