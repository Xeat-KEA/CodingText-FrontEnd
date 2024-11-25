"use client";

import Footer from "./_components/Footer";
import TopBar from "../_components/TopBar/TopBar";
import { useCheckToken } from "../_hooks/useCheckToken";
import MainBanner from "./_components/MainBanner";
import {
  dummycodes,
  dummycodingpost,
  dummycommunity,
  dummyhistories,
  dummynotice,
  dummytrending,
  dummyuserdata,
} from "./_constants/constants";
import MainPosts from "./_components/MainPosts";
import MainCodes from "./_components/MainCodes";
import MainMenu from "./_components/MainMenu";
import MainNotices from "./_components/MainNotices";
import MainHistories from "./_components/MainHistories";
import MainProfileCard from "./_components/MainProfileCard";

export default function Home() {
  // 로그인 여부 파악
  const { accessToken } = useCheckToken();

  return (
    <>
      <TopBar />
      <div className="relative flex flex-col w-full items-center pt-16">
        {/* 배너 */}
        <MainBanner />
        <div className="max-w-1200 p-16 flex flex-col items-center gap-16">
          {/* 비회원 : 메인 메뉴 / 회원 : 사용자 정보, 공지사항, 문제 풀이 기록 */}
          {!accessToken ? (
            <MainMenu />
          ) : (
            <div className="w-full flex flex-col gap-12">
              <div className="w-full flex max-lg:flex-col lg:flex-row-reverse gap-12 overflow-hidden">
                <MainProfileCard userData={dummyuserdata.userData} />
                <MainNotices
                  title={dummynotice.title}
                  url={dummynotice.url}
                  sliderList={dummynotice.sliderList}
                />
              </div>
              <MainHistories
                title={dummyhistories.title}
                url={dummyhistories.url}
                sliderList={dummyhistories.sliderList}
              />
            </div>
          )}
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
          {/* 최신 코드 목록 */}
          <MainCodes
            title={dummycodes.title}
            url={dummycodes.url}
            sliderList={dummycodes.sliderList}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
