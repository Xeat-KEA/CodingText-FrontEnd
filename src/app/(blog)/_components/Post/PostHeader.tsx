// 게시물 헤더 컴포넌트

import { useCalculateDate } from "@/app/_hooks/useCalculateDate";
import { PostProps } from "../../_interfaces/interfaces";
import { usePathname } from "next/navigation";
import { Profile_Dummy_Data } from "@/app/(admin)/_constants/constants";
import Image from "next/image";

const PostHeader: React.FC<PostProps> = ({
  currentPost,
  currentCategory,
  currentSubCategory,
}) => {
  const pathname = usePathname();
  const isAdminPage = pathname.includes("/admin/report/");

  const isCodingPost = Number(currentCategory?.id) === 1;
  // 일반 게시글과 코딩 게시글 정보가 분리되어 있기 때문에 아래와 같이 사용 (프로토타입을 위해 임시 변경)
  // const currentCodingPost = IsCoding_Data.find(post => post.postId === Number(currentPost?.postId));

  const reportedUser = Profile_Dummy_Data.find(
    (profile) => profile.userId === currentPost.blogId
  );

  return (
    <div className="flex flex-col w-full h-[90px] justify-center gap-2">
      {/* 하위 게시판(admin은 사용자 프로필), 조회수, 날짜 */}
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-2">
          {isAdminPage && reportedUser?.profileImg && (
            <div className="profile-image w-120 h-120 relative">
              <Image
                src={reportedUser?.profileImg}
                alt={`${reportedUser?.nickName}의 프로필 이미지`}
                width={24}
                height={24}
                className="rounded-full"
                priority
              />
            </div>
          )}
          <p className="text-sm text-body font-regular">
            {isAdminPage ? reportedUser?.nickName : currentSubCategory?.title}
          </p>
        </div>
        <div className="flex items-center gap-2 h-4">
          <p className="text-xs text-body font-regular">
            조회수 {currentPost?.viewCount}
          </p>
          <div className="bg-border-2 w-[1px] h-[10px]"></div>
          <p className="text-xs text-body font-regular">
            {" "}
            {useCalculateDate(currentPost?.createdAt || "")}
          </p>
        </div>
      </div>

      {/* 제목 */}
      <div className="flex w-full text-xl font-semibold">
        <p className="text-black line-clamp-2">
          {isCodingPost && (
            <span className="text-primary-1">#{currentPost.postId} </span>
          )}
          {currentPost?.title}
        </p>
      </div>
    </div>
  );
};

export default PostHeader;
