"use client";

import Footer from "./_components/Footer";
import { useCheckToken } from "../_hooks/useCheckToken";
import MainBanner from "./_components/MainBanner";
import { dummycodes, POSTS_LIST } from "./_constants/constants";
import MainMenu from "./_components/MainMenu";
import api from "../_api/config";
import { useQuery } from "@tanstack/react-query";
import MainPostList from "./_components/MainPosts";
import MainCodeList from "./_components/MainCodes";

export default function Home() {
  // 로그인 여부 파악
  const { accessToken, isTokenSet } = useCheckToken();

  // 인기 게시글 API 호출
  const fetchTrendingPosts = async () => {
    if (accessToken) {
      const response = await api.get("/blog-service/blog/board/all/best", {
        headers: { Authorization: accessToken },
      });
      return response.data;
    }
    return null;
  };
  const { data: trendings } = useQuery({
    queryKey: ["trendingPosts", isTokenSet],
    queryFn: fetchTrendingPosts,
  });

  // 일반 게시글 API 호출
  const fetchGeneralPosts = async () => {
    if (accessToken) {
      const response = await api.get(
        "/blog-service/blog/board/article/recent",
        {
          headers: { Authorization: accessToken },
        }
      );
      return response.data;
    }
    return null;
  };
  const { data: recentPost } = useQuery({
    queryKey: ["generalPosts", isTokenSet],
    queryFn: fetchGeneralPosts,
  });

  // 코딩 테스트 게시글 API 호출
  const fetchCodePosts = async () => {
    if (accessToken) {
      const response = await api.get("/blog-service/blog/board/code/recent", {
        headers: { Authorization: accessToken },
      });
      return response.data;
    }
    return null;
  };
  const { data: codePost } = useQuery({
    queryKey: ["codePosts", isTokenSet],
    queryFn: fetchCodePosts,
  });

  // 코드 목록 API 호출
  const fetchCodes = async () => {
    if (accessToken) {
      const response = await api.get("/code-bank-service/code/lists", {
        headers: { Authorization: accessToken },
        params: { sortBy: "createdAt" },
      });

      return response.data;
    }
    return null;
  };
  const { data: codes } = useQuery({
    queryKey: ["codes", isTokenSet],
    queryFn: fetchCodes,
    select: (data) => data.content.slice(0, 4),
  });

  return (
    <>
      <div className="relative flex flex-col w-full items-center pt-16">
        {/* 배너 */}
        <MainBanner />
        <div className="max-w-1200 p-16 flex flex-col items-center gap-16">
          {/* 비회원 : 메인 메뉴 / 회원 : 사용자 정보, 공지사항, 문제 풀이 기록 */}
          <MainMenu />
          {/* 이번 주 인기 게시글 슬라이더 */}
          <MainPostList
            title={POSTS_LIST[0].title}
            subTitle={POSTS_LIST[0].content}
            sliderList={trendings?.data.articleList}
            hasRanking
          />
          {/* 최신 게시글 */}
          <MainPostList
            title={POSTS_LIST[1].title}
            subTitle={POSTS_LIST[1].content}
            url={POSTS_LIST[1].url}
            sliderList={recentPost?.data.articleList}
          />
          {/* 코딩 테스트 게시글 */}
          <MainPostList
            title={POSTS_LIST[2].title}
            subTitle={POSTS_LIST[2].content}
            url={POSTS_LIST[2].url}
            sliderList={codePost?.data.articleList}
          />
          {/* 최신 코드 목록 */}
          <MainCodeList
            title={POSTS_LIST[4].title}
            url={POSTS_LIST[4].url!}
            sliderList={dummycodes.sliderList}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
