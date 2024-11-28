"use client";

import BlogListContainer from "@/app/(blog)/_components/BlogListContainer";
import { useCheckToken } from "@/app/_hooks/useCheckToken";

// 블로그 전체 게시글 목록 페이지

export default function BlogAllListPage() {
  // 로그인 여부 확인
  const { } = useCheckToken(true);

  return (
    <BlogListContainer />
  )
}
