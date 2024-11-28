"use client";

import BlogListContainer from "@/app/(blog)/_components/BlogListContainer";
import { useCheckToken } from "@/app/_hooks/useCheckToken";

// 상/하위 일반 게시판 목록 페이지

export default function BlogListPage() {
  // 로그인 여부 확인
  const { } = useCheckToken(true);

  return (
    <BlogListContainer />
  )
}
