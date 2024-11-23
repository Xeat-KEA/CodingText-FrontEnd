"use client";

import api from "@/app/_api/config";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function RecentPostPage() {
  return (
    <div className="top-container">
      <div className="max-w-1000 pt-16">
        <div className="flex flex-col py-8 gap-4">
          {/* 게시글 목록 제목 / 설명 */}
          <div className="main-text-container">
            <div className="main-title-container">
              <span className="main-title">최신 게시글</span>
            </div>
            <span className="main-sub-title">
              요즘 개발자의 관심사를 알아보세요
            </span>
          </div>
          <div className="flex flex-col divide-y divide-border-2">
            {/* {data.map((el, index) => (
              <PostCard
                articleId={el.articleId}
                comments={el.comments}
                content={el.content}
                createAt={el.createAt}
                likes={el.likes}
                title={el.title}
                views={el.views}
                codeId={null}
              />
            ))} */}
          </div>
          <button onClick={() => {}}>다음 페이지 로딩</button>
        </div>
      </div>
    </div>
  );
}
