"use client";

import EditPostContainer from "@/app/(blog)/_components/EditPostContainer";
import { useCheckToken } from "@/app/_hooks/useCheckToken";

export default function EditPostPage() {
  // 로그인 여부 확인
  const {} = useCheckToken(true);

  return <EditPostContainer />;
}
