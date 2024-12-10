import DOMPurify from "isomorphic-dompurify";
import Link from "next/link";
import { BpEditIcon } from "./Icons";
import { useBlogStore } from "@/app/stores";
import { useBase64 } from "@/app/_hooks/useBase64";
import { profileProps } from "@/app/_interfaces/interfaces";

export default function BlogInfo({ profile }: profileProps) {
  // 전역 변수
  const { currentBlogId, isOwnBlog } = useBlogStore();

  // 소개글 디코딩
  const blogIntro = profile?.mainContent
    ? useBase64("decode", profile.mainContent)
    : "";

  return (
    <>
      {/* 블로그 소개글 */}
      <div className="w-226 min-h-[400px] border border-border2 rounded-xl mb-6 p-4">
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
