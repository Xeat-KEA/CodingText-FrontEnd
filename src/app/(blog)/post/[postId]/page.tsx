"use client";

import { useCheckToken } from "@/app/_hooks/useCheckToken";
import PostContainer from "@/app/(blog)/_components/PostContainer";

export default function PostPage() {
  // 로그인 여부 확인
  const { accessToken, isTokenSet } = useCheckToken();

  return <PostContainer />;
}
