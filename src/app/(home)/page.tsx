"use client";

import MainBanner from "./_components/MainBanner";
import { WEEKLY_TRENDING_POST_LIST } from "./_constants/constants";
import SubBanner from "./_components/SubBanner";
import Footer from "./_components/Footer";
import BannerCards from "./_components/BannerCards";
import { useEffect, useState } from "react";
import { useLogInStore, usePaginationStore, useTabStore } from "../stores";
import MainBoard from "./_components/MainBoard";
import TopBar from "../_components/TopBar/TopBar";

export default function Home() {
  // 로그인 여부 파악
  const { token, setToken, isLoaded, setIsLoaded } = useLogInStore();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
    setIsLoaded();
  }, []);

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
      <TopBar />
      <div className="relative flex flex-col w-full pt-16">
        {/* 메인 배너 */}
        <MainBanner />
        {/* 배너 카드 부분 */}
        {isLoaded && token ? (
          <MainBoard
            title="최신 게시글"
            hasTab
            postList={WEEKLY_TRENDING_POST_LIST}
          />
        ) : (
          <BannerCards />
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
