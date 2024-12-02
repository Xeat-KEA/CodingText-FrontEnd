"use client";

import { useCheckToken } from "@/app/_hooks/useCheckToken";
import BlogHomeContainer from "../../_components/BlogHomeContainer";

export default function BlogHomePage() {
  // 로그인 여부 확인
const { accessToken, isTokenSet } = useCheckToken();


  return(
    <BlogHomeContainer/>
  )
}
