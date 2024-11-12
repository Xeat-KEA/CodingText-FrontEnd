import Image from "next/image";
import { useBlogStore } from "@/app/stores";
import { CommentProps } from "../../_interfaces/interfaces";
import { useCalculateDate } from "@/app/_hooks/useCalculateDate";
import { ReplyIcon} from "../Icons";
import api from "@/app/_api/config";
import { useEffect, useState } from "react";
import { BlogProfile } from "@/app/_interfaces/interfaces";
import { Comment_Dummy_Data, Profile_Dummy_Data } from "@/app/(admin)/_constants/constants";
import { usePathname } from "next/navigation";
import IconBtn from "@/app/_components/IconBtn";

const Comment: React.FC<CommentProps> = ({
  replyId,
  userId,
  mentionId,
  content,
  createdAt,
  isOwnComment,
  onReplyClick,
  onDelete,
  onReport,
}) => {
  const pathname = usePathname();
  const isAdminPage = pathname.includes("/admin/report/");

  const [profileData, setProfileData] = useState<BlogProfile[]>([]);

  useEffect(() => {
    // api.get(`/user-list`).then((res) => {
    //   const userData = res.data.data
    //   setProfileData(userData);
    // })

    setProfileData(Profile_Dummy_Data)

  }, [])

  // 댓글 작성자의 프로필
  const userProfile = profileData.find((profile) => profile.userId === userId);

  // // 언급된 사용자의 프로필
  const mentionProfile = profileData.find(
    (profile) => profile.userId === mentionId
  );

  return (
    <div className={`${mentionId ? "pl-12" : ""}`}>
      <div className="flex flex-col w-full gap-4 py-4 border-b border-border-2">
        <div className="flex w-full justify-between items-center">
          <div className="flex gap-2 items-center">
            {/* 프로필 이미지 */}
            {/* 수정 필요 - 댓글 작성자와 언급된 자 프로필*/}
            {userProfile?.profileImg && (
              <div className="profile-image w-120 h-120 relative">
                <Image
                  src={userProfile.profileImg}
                  alt={`${userProfile?.nickName}의 프로필 이미지`}
                  width={24}
                  height={24}
                  className="rounded-full"
                  priority
                />
              </div>
            )}
            <p className="text-xs text-body font-semibold">
              {userProfile?.nickName}
            </p>
          </div>
          <p className="text-xs text-body font-body">
            {useCalculateDate(createdAt)}
          </p>
        </div>

        <div className="text-sm text-body font-regular">
          {mentionProfile && (
            <p className="text-sm text-primary font-semibold">
              @{mentionProfile.nickName}
            </p>
          )}
          {content}
        </div>

        {isAdminPage
          ? (
            <div className="flex w-full h-5 justify-end items-center">
              <IconBtn
                type="delete"
                content="삭제"
                onClick={() => onDelete(replyId)}
              />
            </div>
          )
          : (
            <div className="flex w-full h-5 justify-between items-center">
              <button
                className="flex items-center gap-1"
                onClick={() => onReplyClick(replyId, userId)}
              >
                <ReplyIcon />
                <p className="text-black text-xs font-semibold ">답글</p>
              </button>
              {isOwnComment ? (
                <IconBtn
                  type="delete"
                  content="삭제"
                  onClick={() => onDelete(replyId)}
                />
              ) : (
                <IconBtn
                  type="report"
                  content="신고"
                  onClick={() => onReport(replyId)}
                />
              )}
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Comment;