import DOMPurify from "isomorphic-dompurify";
import Link from "next/link";
import { BpEditIcon } from "./Icons";
import { blog_Introduction_Data } from "../_constants/constants";
import { useBlogStore } from "@/app/stores";

export default function BlogInfo() {
  // 전역 변수
  const { isOwnBlog } = useBlogStore();

  return (
    <>
      {/* 블로그 소개글 */}
      <div className="w-226 h-[442px] border border-border2 rounded-xl mb-6 p-4">
        <div
          className="prose"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(String(blog_Introduction_Data)),
          }}
        />
      </div>
      {/* 블로그 정보 수정 버튼 */}
      {isOwnBlog && (
        <Link
          href="/edit/blog"
          className="inline-flex items-center w-auto h-5 gap-1 ml-2"
        >
          <BpEditIcon />
          <p className="text-primary text-xs font-semibold">블로그 정보 수정</p>
        </Link>
      )}
    </>
  );
}
