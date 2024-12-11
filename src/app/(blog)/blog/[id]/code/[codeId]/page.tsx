"use client";

import BlogListContainer from "@/app/(blog)/_components/BlogListContainer";
import { useCheckToken } from "@/app/_hooks/useCheckToken";

// 코딩테스트 하위 목록 페이지

export default function CodeListPage() {
  // 로그인 여부 확인
  const {} = useCheckToken();

  return (
    <BlogListContainer />
  )
}