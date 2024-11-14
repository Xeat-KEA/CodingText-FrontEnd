"use client";

import BlogSubContainer from "@/app/(blog)/_components/BlogSubContainer";
import { useCheckToken } from "@/app/_hooks/useCheckToken";

export default function BlogSubPage() {
  // 로그인 여부 확인
  const {} = useCheckToken(true);

  return <BlogSubContainer />;
}
