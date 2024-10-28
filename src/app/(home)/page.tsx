"use client";

import MainBanner from "./_components/MainBanner";
import SubBanner from "./_components/SubBanner";
import Footer from "./_components/Footer";
import BannerCards from "./_components/BannerCards";
import { useEffect, useState } from "react";
import { usePaginationStore, useTabStore } from "../stores";
import MainBoard from "./_components/MainBoard";
import TopBar from "../_components/TopBar/TopBar";
import { useCheckToken } from "../_hooks/useCheckToken";
import api from "../_api/config";
import { PostResult } from "../(search)/_interfaces/interfaces";

export default function Home() {
  // 로그인 여부 파악
  const { token, isLoaded } = useCheckToken();

  const { tab } = useTabStore();
  const { setPage, setLastPage } = usePaginationStore();

  // 탭 변경 Handling
  useEffect(() => {
    // 탭 변경 시 post 필요

    setPage(1);
    setLastPage(30);
  }, [tab]);

  const [result, setResult] = useState<PostResult[]>([]);
  // 프로토타입 API 게시글 목록 GET
  useEffect(() => {
    api.get("/article-list").then((res) => {
      // 날짜 내림차순
      const sortedData = res.data.data.sort((a: PostResult, b: PostResult) =>
        a.createAt > b.createAt ? -1 : 1
      );
      setResult(sortedData.slice(0, 5));
    });
  }, []);

  return (
    <>
      <TopBar />
      <div className="relative flex flex-col w-full pt-16">
        {/* 메인 배너 */}
        <MainBanner />
        {/* 비로그인 : 홍보 배너 / 로그인 : 최신 게시글 */}
        {isLoaded && token ? (
          <MainBoard title="최신 게시글" hasTab postList={result} />
        ) : (
          <BannerCards />
        )}
        {/* 서브 배너 */}
        <SubBanner />
        {/* 인기 게시글 */}
        <MainBoard title="이번 주 인기 게시글 Top 5" postList={result} />
      </div>
      <Footer />
    </>
  );
}
