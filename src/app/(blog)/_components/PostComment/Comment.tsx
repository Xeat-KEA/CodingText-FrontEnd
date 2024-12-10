import Image from "next/image";
import { CommentProps } from "../../_interfaces/interfaces";
import { useCalculateDate } from "@/app/_hooks/useCalculateDate";
import { ReplyIcon } from "../Icons";
import { usePathname } from "next/navigation";
import IconBtn from "@/app/_components/IconBtn";
import ProfileImgContainer from "@/app/_components/ProfileImgContainer";

const Comment: React.FC<CommentProps> = ({
  replyId,
  blogId,
  userName,
  profileUrl,
  mentionedUserName,
  content,
  createdDate,
  isOwnComment,
  onReplyClick,
  onEdit,
  isEditing,
  onCancelEdit,
  editedContent,
  onUpdateComment,
  confirmEdit,
  onDelete,
  onReport,
}) => {
  const pathname = usePathname();
  const isAdminPage = pathname.includes("/admin/report/");

  return (
    <div className={`${mentionedUserName ? "pl-12" : ""}`}>
      <div className="flex flex-col w-full gap-4 py-4 border-b border-border-2">
        <div className="flex w-full justify-between items-center">
          <div className="flex gap-2 items-center">
            {/* 프로필 이미지 */}
            {profileUrl && (
              <div className="profile-image w-120 h-120 relative">
                <ProfileImgContainer width={24} height={24} src={profileUrl} />
              </div>
            )}
            <p className="text-xs text-body font-semibold">{userName}</p>
          </div>
          <p className="text-xs text-body font-body">
            {useCalculateDate(createdDate)}
          </p>
        </div>

        <div className="text-sm text-body font-regular">
          {mentionedUserName && (
            <p className="text-sm text-primary-1 font-semibold">
              @{mentionedUserName}
            </p>
          )}
          {isEditing ? (
            <textarea
              value={editedContent}
              onChange={(e) => onUpdateComment(e.target.value)}
              className="w-full bg-bg-1 pl-4 p-2 rounded-lg text-sm text-body font-regular resize-none"
            />
          ) : (
            content
          )}
        </div>

        {isAdminPage ? (
          <div className="flex w-full h-5 justify-end items-center">
            <IconBtn
              type="delete"
              content="삭제"
              onClick={() => onDelete(replyId)}
            />
          </div>
        ) : isEditing ? (
          <div className="flex w-full h-5 justify-between items-center">
            <button
              className="text-xs text-body font-semibold"
              onClick={onCancelEdit}>
              취소
            </button>
            <button
              className="text-xs text-primary-1 font-semibold"
              onClick={() => confirmEdit(editedContent)}>
              수정 완료
            </button>
          </div>
        ) : (
          <div className="flex w-full h-5 justify-between items-center">
            <button
              className="flex items-center gap-1"
              onClick={() => onReplyClick(replyId, blogId)}>
              <ReplyIcon />
              <p className="text-black text-xs font-semibold ">답글</p>
            </button>
            {isOwnComment ? (
              <div className="flex gap-4">
                <IconBtn
                  type="edit"
                  content="수정"
                  onClick={() => onEdit(replyId)}
                />
                <IconBtn
                  type="delete"
                  content="삭제"
                  onClick={() => onDelete(replyId)}
                />
              </div>
            ) : (
              <IconBtn
                type="report"
                content="신고"
                onClick={() => onReport(replyId)}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
