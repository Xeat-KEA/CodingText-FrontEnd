"use client";

import TopBar from "../_components/TopBar";
import MainBanner from "./_components/MainBanner";
import { WEEKLY_TRENDING_POST_LIST } from "./_constants/constants";
import SubBanner from "./_components/SubBanner";
import Footer from "./_components/Footer";
import BannerCards from "./_components/BannerCards";
import { useEffect, useState } from "react";
import { usePaginationStore, useTabStore } from "../stores";
import MainBoard from "./_components/MainBoard";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const { tab } = useTabStore();
  const { setPage, setLastPage } = usePaginationStore();

  // 탭 변경 Handling
  useEffect(() => {
    // 탭 변경 시 post 필요

    setPage(1);
    setLastPage(30);
  }, [tab]);

  return (
    <>
      <TopBar isLoggedIn hasNewNotice />
      <div className="relative flex flex-col w-full pt-16">
        {/* 메인 배너 */}
        <MainBanner />
        {/* 배너 카드 부분 */}
        {!isLoggedIn ? (
          <BannerCards />
        ) : (
          <MainBoard
            title="최신 게시글"
            hasTab
            postList={WEEKLY_TRENDING_POST_LIST}
          />
        )}
        {/* 서브 배너 */}
        <SubBanner />
        {/* 인기 게시글 */}
        <MainBoard
          title="이번 주 인기 게시글 Top 5"
          postList={WEEKLY_TRENDING_POST_LIST}
        />
      </div>
      <Footer />
    </>
  );
}
