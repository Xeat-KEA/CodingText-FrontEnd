import DOMPurify from "isomorphic-dompurify";
import Link from "next/link";
import { BpEditIcon } from "./Icons";
import { useBlogStore } from "@/app/stores";
import { useBase64 } from "@/app/_hooks/useBase64";

export default function BlogInfo() {
  // 전역 변수
  const { isOwnBlog, profile } = useBlogStore();

  // 소개글 디코딩
  const blogIntro =  useBase64("decode", profile.blogProfile);

  return (
    <>
      {profile && blogIntro && (
        <>
          {/* 블로그 소개글 */}
          <div className="w-226 h-[442px] border border-border2 rounded-xl mb-6 p-4">
            <div
              className="prose"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(String(blogIntro)),
              }}
            />
          </div>
          {/* 블로그 정보 수정 버튼 */}
          {isOwnBlog && (
            <Link
              href="/"
              className="inline-flex items-center w-auto h-5 gap-1 ml-2"
            >
              <BpEditIcon />
              <p className="text-primary text-xs font-semibold">
                블로그 정보 수정
              </p>
            </Link>
          )}
        </>
      )}
    </>
  );
}
