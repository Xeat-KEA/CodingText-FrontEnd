import DOMPurify from "isomorphic-dompurify";
import Link from "next/link";
import api from "@/app/_api/config";
import { BpEditIcon } from "./Icons";
import { useBlogStore } from "@/app/stores";
import { useBase64 } from "@/app/_hooks/useBase64";
import { useQuery } from "@tanstack/react-query";

export default function BlogInfo() {
  // 전역 변수
  const { currentBlogId, isOwnBlog, profile, blogContent } = useBlogStore();
  const setBlogContent = useBlogStore((profile) => profile.setBlogContent);

  // 블로그 소개글 조회
  const fetchBlogInfoData = async () => {
    const response = await api.get(`/blog-service/blog/home/mainContent`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
      },
    });
    if (response.data.data.blogId === currentBlogId) {
      setBlogContent(response.data.data);
    }
    return response.data.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["blogContent", currentBlogId],
    queryFn: fetchBlogInfoData,
    // placeholderData: blogContent,
    enabled: currentBlogId !== -1,
  });

  // 소개글 디코딩
  const blogIntro = useBase64("decode", blogContent.mainContent);

  return (
    <>
      {profile && blogIntro && (
        <>
          {/* 블로그 소개글 */}
          <div className="w-226 h-auto border border-border2 rounded-xl mb-6 p-4">
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
      )}
    </>
  );
}
