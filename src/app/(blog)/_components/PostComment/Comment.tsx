import Image from "next/image";
import { CommentProps } from "../../_interfaces/interfaces";
import { useCalculateDate } from "@/app/_hooks/useCalculateDate";
import { ReplyIcon } from "../Icons";
import { usePathname, useRouter } from "next/navigation";
import IconBtn from "@/app/_components/IconBtn";
import ProfileImgContainer from "@/app/_components/ProfileImgContainer";
import { usePostStore, useTokenStore } from "@/app/stores";
import { motion } from "framer-motion";

export default function Comment({ comment }: { comment: CommentProps }) {
  const pathname = usePathname();
  const router = useRouter();
  const isAdminPage = pathname.includes("/admin/");
  const { accessToken, isTokenSet } = useTokenStore();
  const { reportPostId, reportReplyId, currentPost } = usePostStore();

  const buttonVariants = {
    rest: { scale: 1 },
    clicked: { scale: 0.95, transition: { type: "spring", stiffness: 300 } },
  };

  return (
    <div className={`${comment.mentionedUserName ? "pl-12" : ""}`}>
      <div className="flex flex-col w-full gap-4 py-4 border-b border-border-2 ">
        <div className="flex w-full justify-between items-center">
          <div
            className="flex gap-2 items-center cursor-pointer"
            onClick={() => {
              if (isAdminPage) {
                router.push(`/admin/user/${comment.userId}`);
              } else {
                router.push(`/blog/${comment.blogId}`);
              }
            }}>
            {/* 프로필 이미지 */}
            {comment.profileUrl && (
              <div className="profile-image w-120 h-120 relative">
                <ProfileImgContainer
                  width={24}
                  height={24}
                  src={comment.profileUrl}
                />
              </div>
            )}
            <p className="text-xs text-body font-semibold hover:underline">
              {comment.userName}
            </p>
          </div>
          <p className="text-xs text-body font-body">
            {useCalculateDate(comment.createdDate)}
          </p>
        </div>

        <div
          className={`text-sm font-regular ${
            isAdminPage &&
            reportReplyId !== -1 &&
            reportPostId === currentPost.articleId &&
            reportReplyId === comment.replyId
              ? "text-red"
              : "text-body"
          }
          `}>
          {comment.mentionedUserName && (
            <p className="text-sm text-primary-1 font-semibold">
              @{comment.mentionedUserName}
            </p>
          )}
          {comment.isEditing ? (
            <textarea
              value={comment.editedContent}
              onChange={(e) => comment.onUpdateComment(e.target.value)}
              className="w-full bg-bg-1 pl-4 p-2 rounded-lg text-sm text-body font-regular resize-none"
            />
          ) : (
            comment.content
          )}
        </div>

        {isAdminPage ? (
          <div className="flex w-full h-5 justify-end items-center">
            <IconBtn
              type="delete"
              content="삭제"
              onClick={() => comment.onDelete(comment.replyId)}
            />
          </div>
        ) : comment.isEditing ? (
          <div className="flex w-full h-5 justify-between items-center">
            <button
              className="text-xs text-body font-semibold"
              onClick={comment.onCancelEdit}>
              취소
            </button>
            <button
              className="text-xs text-primary-1 font-semibold"
              onClick={() => comment.confirmEdit(comment.editedContent)}>
              수정 완료
            </button>
          </div>
        ) : (
          <div className="flex w-full h-5 justify-between items-center">
            {accessToken && (
              <motion.button
                className="flex items-center gap-1"
                onClick={() =>
                  comment.onReplyClick(comment.replyId, comment.blogId)
                }
                variants={buttonVariants}
                initial="rest"
                whileTap="clicked">
                <ReplyIcon />
                <p className="text-black text-xs font-semibold ">답글</p>
              </motion.button>
            )}
            {accessToken ? (
              comment.isOwnComment ? (
                <div className="flex gap-4">
                  <IconBtn
                    type="edit"
                    content="수정"
                    onClick={() => comment.onEdit(comment.replyId)}
                  />
                  <IconBtn
                    type="delete"
                    content="삭제"
                    onClick={() => comment.onDelete(comment.replyId)}
                  />
                </div>
              ) : (
                <IconBtn
                  type="report"
                  content="신고"
                  onClick={() => comment.onReport(comment.replyId)}
                />
              )
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
