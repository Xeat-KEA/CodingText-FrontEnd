import Image from "next/image";
import { useBlogStore } from "@/app/stores";
import { CommentProps } from "../../_interfaces/interfaces";
import { Blog_Profile_Data } from "../../_constants/constants";
import { useCalculateDate } from "@/app/_hooks/useCalculateDate";
import { BpReportIcon, ReplyIcon, SmDeleteIcon } from "../Icons";

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
  // 전역 변수
  const {} = useBlogStore();

  // 댓글 작성자의 프로필
  const userProfile = Blog_Profile_Data.find(
    (profile) => profile.profileId === userId
  );

  // 언급된 사용자의 프로필
  const mentionProfile = Blog_Profile_Data.find(
    (profile) => profile.profileId === mentionId
  );

  return (
    <div className={`${mentionId ? "pl-12" : ""}`}>
      <div className="flex flex-col w-full gap-4 py-4 border-b border-border-2">
        <div className="flex w-full justify-between items-center">
          <div className="flex gap-2 items-center">
            {/* 프로필 이미지 */}
            {userProfile?.profileImage && (
              <div className="profile-image w-120 h-120 relative">
                <Image
                  src={userProfile?.profileImage}
                  alt={`${userProfile?.name}의 프로필 이미지`}
                  width={24}
                  height={24}
                  className="rounded-full"
                  priority
                />
              </div>
            )}
            <p className="text-xs text-body font-semibold">
              {userProfile?.name}
            </p>
          </div>
          <p className="text-xs text-body font-body">
            {useCalculateDate(createdAt)}
          </p>
        </div>

        <div className="text-sm text-body font-regular">
          {mentionProfile && (
            <p className="text-sm text-primary font-semibold">
              @{mentionProfile.name}
            </p>
          )}
          {content}
        </div>
        <div className="flex w-full h-5 justify-between items-center">
          <button
            className="flex items-center gap-1"
            onClick={() => onReplyClick(replyId, userId)}
          >
            <ReplyIcon />
            <p className="text-black text-xs font-semibold ">답글</p>
          </button>
          {isOwnComment ? (
            <button
              className="flex items-center gap-1"
              onClick={() => onDelete(replyId)}
            >
              <SmDeleteIcon />
              <p className="text-red text-xs font-semibold ">삭제</p>
            </button>
          ) : (
            <button
              className="flex items-center gap-1"
              onClick={() => onReport(replyId)}
            >
              <BpReportIcon />
              <p className="text-red text-xs font-semibold ">신고</p>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
