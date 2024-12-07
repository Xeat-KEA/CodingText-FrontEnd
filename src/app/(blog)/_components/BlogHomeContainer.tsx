import BlogProfile from "./BlogProfile";
import BlogInfo from "./BlogInfo";
import { useQuery } from "@tanstack/react-query";
import api from "@/app/_api/config";
import { useBlogStore, useTokenStore } from "@/app/stores";
import { useEffect } from "react";
import { useParams } from "next/navigation";

export default function BlogHomeContainer() {
  // 로그인 여부 확인
  const { accessToken, isTokenSet } = useTokenStore();
  const params = useParams();

  const { userBlogId, currentBlogId, isOwnBlog, profile } = useBlogStore();

  const setCurrentBlogId = useBlogStore((state) => state.setCurrentBlogId);
  const setProfile = useBlogStore((profile) => profile.setProfile);

  // 현재 블로그 아이디 조회
  useEffect(() => {
    const blogId = Number(params?.id || -1); // 기본값 처리
    if (blogId !== -1) {
      setCurrentBlogId(blogId);
    }
  }, [params.id, setCurrentBlogId]);

  // 블로그 홈 정보 조회
  const fetchBlogProfileData = async () => {
    if (!accessToken) return null;
    try {
      const response = await api.get(
        `/blog-service/blog/home/${currentBlogId}`,
        {
          headers: { Authorization: accessToken },
        }
      );
      setProfile(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("블로그 프로필 조회 실패:", error);
      return null;
    }
  };

  const { data: blogInfo, isLoading } = useQuery({
    queryKey: ["blogInfo", isTokenSet, currentBlogId],
    queryFn: fetchBlogProfileData,
    enabled: currentBlogId !== -1 && !!accessToken,
  });

  return (
    <>
      {!isLoading && (
        <div className="top-container">
          <div className="max-w-1000 min-h-screen">
            {/* 블로그 프로필 정보 */}
            <BlogProfile />

            {/* 구분선 */}
            <hr className="division my-6" />

            {/* 블로그 소개 정보 */}
            <BlogInfo />
          </div>
        </div>
      )}
    </>
  );
}
