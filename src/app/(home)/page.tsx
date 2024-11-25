"use client";

import Footer from "./_components/Footer";
import { useCheckToken } from "../_hooks/useCheckToken";
import MainBanner from "./_components/MainBanner";
import {
  dummycodes,
  dummyhistories,
  dummynotice,
  dummyuserdata,
  POSTS_LIST,
} from "./_constants/constants";
import MainMenu from "./_components/MainMenu";
import MainNotices from "./_components/MainNotices";
import MainHistories from "./_components/MainHistories";
import MainProfileCard from "./_components/MainProfileCard";
import api from "../_api/config";
import { useQuery } from "@tanstack/react-query";
import MainPostList from "./_components/MainPosts";
import MainCodeList from "./_components/MainCodes";

export default function Home() {
  // 로그인 여부 파악
  const { accessToken } = useCheckToken();

  // 인기 게시글 API 호출
  const fetchTrendingPosts = async () => {
    const response = await api.get("/blog-service/blog/board/all/like", {
      headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}` },
    });
    return response.data;
  };
  const { data: trendings } = useQuery({
    queryKey: ["trendingPosts"],
    queryFn: fetchTrendingPosts,
  });

  // 일반 게시글 API 호출
  const fetchGeneralPosts = async () => {
    const response = await api.get("/blog-service/blog/board/article/recent", {
      headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}` },
    });
    return response.data;
  };
  const { data: recentPost } = useQuery({
    queryKey: ["generalPosts"],
    queryFn: fetchGeneralPosts,
  });

  // 코딩 테스트 게시글 API 호출
  const fetchCodePosts = async () => {
    const response = await api.get("/blog-service/blog/board/code/recent", {
      headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}` },
    });
    return response.data;
  };
  const { data: codePost } = useQuery({
    queryKey: ["codePosts"],
    queryFn: fetchCodePosts,
  });
  console.log(trendings, recentPost, codePost);

  return (
    <>
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
          <MainPostList
            title={POSTS_LIST[0].title}
            subTitle={POSTS_LIST[0].content}
            sliderList={trendings?.data.slice(0, 3)}
            hasRanking
          />
          {/* 최신 게시글 */}
          <MainPostList
            title={POSTS_LIST[1].title}
            subTitle={POSTS_LIST[1].content}
            url={POSTS_LIST[1].url}
            sliderList={recentPost?.data.responseDtoList}
          />
          {/* 코딩 테스트 게시글 */}
          <MainPostList
            title={POSTS_LIST[2].title}
            subTitle={POSTS_LIST[2].content}
            url={POSTS_LIST[2].url}
            sliderList={codePost?.data.codeArticleList}
          />
          {/* 최신 코드 목록 */}
          <MainCodeList
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
