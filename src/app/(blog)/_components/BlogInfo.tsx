import DOMPurify from "isomorphic-dompurify";
import Link from "next/link";
import api from "@/app/_api/config";
import { BpEditIcon } from "./Icons";
import { useBlogStore } from "@/app/stores";
import { useBase64 } from "@/app/_hooks/useBase64";
import { useQuery } from "@tanstack/react-query";
import { useCheckToken } from "@/app/_hooks/useCheckToken";

export default function BlogInfo() {
  // 로그인 여부 확인
  const { accessToken, isTokenSet } = useCheckToken();

  // 전역 변수
  const { currentBlogId, isOwnBlog, profile, blogContent } = useBlogStore();
  // const setBlogContent = useBlogStore((profile) => profile.setBlogContent);


  // 소개글 디코딩
  const blogIntro = profile.mainContent 
  ? useBase64("decode", profile.mainContent) 
  : profile.mainContent;

  return (
    <>
      {/* 블로그 소개글 */}
      <div className="w-226 h-[400px] border border-border2 rounded-xl mb-6 p-4">
        {profile && blogIntro && (
          <div
            className="prose"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(String(blogIntro)),
            }}
          />
        )}
      </div>
      {/* 블로그 정보 수정 버튼 */}
      {isOwnBlog && (
        <Link
          // 경로 수정 필요
          href="/edit/blog"
          className="inline-flex items-center w-auto h-5 gap-1 ml-2">
          <BpEditIcon />
          <p className="text-primary-1 text-xs font-semibold">
            블로그 정보 수정
          </p>
        </Link>
      )}
    </>
  );
}
