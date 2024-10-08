"use client";

import TopBar from "../_components/TopBar";
import BannerCard from "./_components/BannerCard";
import MainBanner from "./_components/MainBanner";
import {
  BANNER_CARD_LIST,
  WEEKLY_TRENDING_POST_LIST,
} from "./_constants/constants";
import SubBanner from "./_components/SubBanner";
import { CommentCountIcon, LikeCountIcon } from "../_components/Icons";
import PostCard from "../_components/PostCard";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <>
      <TopBar isLoggedIn hasNewNotice />
      <div className="relative flex flex-col w-full pt-16">
        {/* 메인 배너 */}
        <MainBanner />
        {/* 배너 카드 부분 */}
        <div className="w-full bg-bg-1 py-16 flex justify-center">
          <div className="w-full flex flex-col items-center">
            {BANNER_CARD_LIST.map((el, index) => (
              <BannerCard
                key={index}
                content={el.content}
                bubble={el.bubble}
                index={index}
              />
            ))}
          </div>
        </div>
        {/* 서브 배너 */}
        <SubBanner />
        {/* 인기 게시글 */}
        <div className="w-full flex justify-center">
          <div className="max-w-1200 py-[120px] flex flex-col gap-12">
            <span className="text-2xl text-black font-semibold">
              이번 주 인기 게시글 Top 5
            </span>
            <div className="w-full border border-border-2 px-16 py-6 rounded-2xl divide-y divide-border-2">
              {WEEKLY_TRENDING_POST_LIST.map((el, index) => (
                <PostCard
                  key={index}
                  profileImg={el.profileImg}
                  nickname={el.nickname}
                  createAt={el.createAt}
                  title={el.title}
                  content={el.content}
                  thumbnail={el.thumbnail}
                  likes={el.likes}
                  comments={el.comments}
                  views={el.views}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
