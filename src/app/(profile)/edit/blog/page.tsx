"use client";

import { useCheckToken } from "@/app/_hooks/useCheckToken";
import EditBlogInfo from "../../_components/EditBlogInfo";

export default function EditBlogPage() {
  // 로그인 여부 확인
  const {} = useCheckToken();

  return <EditBlogInfo />;
}
