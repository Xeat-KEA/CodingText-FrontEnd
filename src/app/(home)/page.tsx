"use client";

import Footer from "./_components/Footer";
import TopBar from "../_components/TopBar/TopBar";
import { useCheckToken } from "../_hooks/useCheckToken";
import MainBanner from "./_components/MainBanner";
import {
  dummycodingpost,
  dummycommunity,
  dummytrending,
} from "./_constants/constants";
import MainPosts from "./_components/MainPosts";

export default function Home() {
  // 로그인 여부 파악
  const { token, isLoaded } = useCheckToken();

  return (
    <>
      <TopBar />
      <div className="relative flex flex-col w-full items-center pt-16">
        <MainBanner />
        <div className="max-w-1200 p-12 flex flex-col gap-16">
          {/* 이번 주 인기 게시글 슬라이더 */}
          <MainPosts
            title={dummytrending.title}
            subTitle={dummytrending.subTitle}
            sliderList={dummytrending.sliderList}
          />
          {/* 커뮤니티 */}
          <MainPosts
            title={dummycommunity.title}
            subTitle={dummycommunity.subTitle}
            url={dummycommunity.url}
            sliderList={dummycommunity.sliderList}
          />
          {/* 코딩 테스트 게시글 */}
          <MainPosts
            title={dummycodingpost.title}
            subTitle={dummycodingpost.subTitle}
            url={dummycommunity.url}
            sliderList={dummycodingpost.sliderList}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
