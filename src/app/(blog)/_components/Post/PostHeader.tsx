// 게시물 헤더 컴포넌트

import { useCalculateDate } from "@/app/_hooks/useCalculateDate";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useBlogStore, usePostStore } from "@/app/stores";
import ProfileImgContainer from "@/app/_components/ProfileImgContainer";

export default function PostHeader() {
  const { currentBlogId } = useBlogStore();
  const { currentPost, isCodingPost } = usePostStore();
  const pathname = usePathname();
  const router = useRouter();
  const isAdminPage = pathname.includes("/admin/report/");

  return (
    <div className="flex flex-col w-full h-[90px] justify-center gap-2">
      {/* 하위 게시판(admin은 사용자 프로필), 조회수, 날짜 */}
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-2">
          {isAdminPage && currentPost?.profileUrl && (
            // userId로 넘기는 걸로 수정
            <div
              className="profile-image w-120 h-120 relative"
              onClick={() => router.push(`/admin/user/${currentBlogId}`)}>
              <ProfileImgContainer
                width={24}
                height={24}
                src={currentPost.profileUrl}
              />
            </div>
          )}
          <p className="text-sm text-body font-regular">
            {isAdminPage ? currentPost.userName : <>{currentPost.childName}</>}
          </p>
        </div>
        <div className="flex items-center gap-2 h-4">
          <p className="text-xs text-body font-regular">
            조회수 {currentPost?.viewCount}
          </p>
          <div className="bg-border-2 w-[1px] h-[10px]"></div>
          <p className="text-xs text-body font-regular">
            {" "}
            {useCalculateDate(currentPost?.createdDate || "")}
          </p>
        </div>
      </div>

      {/* 제목 */}
      <div className="flex w-full text-xl font-semibold">
        <p className="text-black line-clamp-2">
          {isCodingPost && (
            <span className="text-primary-1">#{currentPost?.codeId} </span>
          )}
          {currentPost?.title}
        </p>
      </div>
    </div>
  );
}
