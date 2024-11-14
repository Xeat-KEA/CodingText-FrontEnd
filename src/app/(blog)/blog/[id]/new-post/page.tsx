"use client";

import NewPostContainer from "@/app/(blog)/_components/NewPostContainer";
import { useCheckToken } from "@/app/_hooks/useCheckToken";

export default function NewPostPage() {
  // 로그인 여부 확인
  const {} = useCheckToken(true);

  return <NewPostContainer />;
}
