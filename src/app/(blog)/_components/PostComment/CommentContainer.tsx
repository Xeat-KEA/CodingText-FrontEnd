import { useEffect, useState } from "react";
import {
  BlogPost,
  CommentForm,
  CommentProps,
} from "@/app/(blog)/_interfaces/interfaces";
import { REPORT_REASONS } from "@/app/(blog)/_constants/constants";
import CommentInput from "@/app/(blog)/_components/PostComment/CommentInput";
import Comment from "@/app/(blog)/_components/PostComment/Comment";
import Dialog from "@/app/_components/Dialog";
import { DialogCheckIcon, DialogReportIcon } from "@/app/_components/Icons";
import DropDown from "@/app/_components/DropDown";
import { useParams, usePathname } from "next/navigation";
import { useBlogStore, usePostStore, useTokenStore } from "@/app/stores";
import api from "@/app/_api/config";
import { useQueryClient } from "@tanstack/react-query";

export default function CommentContainer() {
  const { accessToken, isTokenSet } = useTokenStore();
  const queryClient = useQueryClient();

  const params = useParams();
  const { currentPost } = usePostStore();
  const { currentBlogId, userBlogId } = useBlogStore();

  const [comments, setComments] = useState<CommentProps[]>([]);
  const [parentReplyId, setParentReplyId] = useState<number | undefined>();
  const [mentionId, setMentionId] = useState<number | undefined>();
  const [mentionedUserName, setMentionedUserName] = useState<string>();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState<number | null>(null);

  const [commentToEdit, setCommentToEdit] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState<string>("");

  const [commentToReport, setCommentToReport] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [customInput, setCustomInput] = useState("");
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [isReportConfirmDialogOpen, setIsReportConfirmDialogOpen] =
    useState(false);

  const pathname = usePathname();
  const isAdminPage = pathname.includes("/admin/report/");

  // 댓글 목록 초기화
  useEffect(() => {
    if (currentPost && currentPost.articleReplies) {
      setComments(currentPost.articleReplies);
    }
  }, [currentPost]);

  const onClickReply = (
    commentId: number,
    mentionId: number,
    userName: string
  ) => {
    setParentReplyId(commentId);
    setMentionId(mentionId);
    setMentionedUserName(userName);
  };

  const onClickReplyCancel = () => {
    setParentReplyId(undefined);
    setMentionedUserName("");
    setMentionId(undefined);
  };

  const submitComment = async (data: { comment: string }) => {
    const requestBody = {
      articleId: currentPost.articleId,
      parentReplyId: parentReplyId,
      mentionedUserBlogId: mentionId,
      content: data.comment,
    };
    try {
      if (accessToken) {
        const response = await api.post(
          "/blog-service/blog/board/article/reply",
          requestBody,
          {
            headers: { Authorization: accessToken },
          }
        );
      }
      queryClient.invalidateQueries({ queryKey: ["postContent"] });
    } catch (error) {
      console.error("댓글 작성 오류: ", error);
    }

    setParentReplyId(undefined);
    setMentionId(undefined);
    setMentionedUserName("");
  };

  const onClickEdit = (replyId: number, commentContent: string) => {
    setCommentToEdit(replyId);
    setEditedContent(commentContent);
  };
  const onClickCancelEdit = () => {
    setCommentToEdit(null);
    setEditedContent("");
  };
  const updateComment = (content: string) => {
    setEditedContent(content);
  };

  const confirmEditComment = async () => {
    if (commentToEdit === null) return;
    try {
      const response = await api.put(
        `/blog-service/blog/board/article/reply/${commentToEdit}`,
        { content: editedContent },
        {
          headers: { Authorization: accessToken },
        }
      );
      queryClient.invalidateQueries({ queryKey: ["postContent"] });
    } catch (error) {
      console.error("댓글 수정 실패:", error);
    }
    setCommentToEdit(null);
    setEditedContent("");
  };

  const onClickDelete = (replyId: number) => {
    setCommentToDelete(replyId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteComment = async () => {
    if (commentToDelete === null) return;
    try {
      const response = await api.delete(
        `/blog-service/blog/board/article/reply/${commentToDelete}`,
        {
          data: { replyId: commentToDelete },
          headers: { Authorization: accessToken },
        }
      );
      queryClient.invalidateQueries({ queryKey: ["postContent"] });
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
    }
    setIsDeleteDialogOpen(false);
    setCommentToDelete(null);
  };

  const onClickReportComment = (id: number) => {
    setCommentToReport(id);
    setIsReportDialogOpen(true);
  };

  const cancelReportComment = () => {
    setIsReportDialogOpen(false);
    setCommentToReport(null);
    setCustomInput("");
    setSelectedOption(null);
  };

  const confirmReportComment = async () => {
    if (commentToReport === null) return;
    try {
      const response = await api.post(
        `/blog-service/blog/reply/report/${commentToReport}`,
        {
          reportCategory: selectedOption,
          directCategory: customInput,
        },
        {
          headers: { Authorization: accessToken },
        }
      );
    } catch (error) {
      console.error("댓글 신고 실패: ", error);
    }

    setIsReportDialogOpen(false);
    setIsReportConfirmDialogOpen(true);
    setCommentToReport(null);
    setCustomInput("");
    setSelectedOption(null);
  };

  return (
    <div className="flex flex-col w-full gap-4">
      <p className="text-black text-lg">댓글 {currentPost.replyCount}개</p>

      {/* 댓글 입력 */}
      {!isAdminPage && (
        <CommentInput
          target={parentReplyId ? "reply" : "comment"}
          mentionId={mentionId}
          mentionedUserName={mentionedUserName}
          onSubmit={submitComment}
          onCancel={onClickReplyCancel}
        />
      )}

      {comments.map((comment) => (
        <div key={comment.replyId}>
          <Comment
            comment={{
              ...comment, // 기존 comment 속성
              isOwnComment: comment.blogId === userBlogId,
              onEdit: () => onClickEdit(comment.replyId, comment.content),
              isEditing: commentToEdit === comment.replyId,
              onCancelEdit: onClickCancelEdit,
              editedContent: editedContent,
              onUpdateComment: updateComment,
              confirmEdit: confirmEditComment,
              onDelete: () => onClickDelete(comment.replyId),
              onReport: () => onClickReportComment(comment.replyId),
              onReplyClick: () =>
                onClickReply(comment.replyId, comment.blogId, comment.userName),
            }}
          />
          {comment.childReplies?.map((reply) => (
            <Comment
              comment={{
                ...reply, // 기존 reply 속성
                isOwnComment: reply.blogId === userBlogId,
                onEdit: () => onClickEdit(reply.replyId, reply.content),
                isEditing: commentToEdit === reply.replyId,
                onCancelEdit: onClickCancelEdit,
                editedContent: editedContent,
                onUpdateComment: updateComment,
                confirmEdit: confirmEditComment,
                onDelete: () => onClickDelete(reply.replyId),
                onReport: () => onClickReportComment(reply.replyId),
                onReplyClick: () =>
                  onClickReply(
                    reply.parentReplyId ?? 0,
                    reply.blogId,
                    reply.userName
                  ),
              }}
              key={reply.replyId}
            />
          ))}
        </div>
      ))}

      {/* 삭제 다이얼로그 컴포넌트 */}
      {isDeleteDialogOpen && (
        <Dialog
          title="댓글을 삭제할까요?"
          content="삭제 후 복구할 수 없어요!"
          isWarning={isDeleteDialogOpen}
          backBtn="취소"
          onBackBtnClick={() => {
            setIsDeleteDialogOpen(false);
            setCommentToDelete(null);
          }}
          redBtn="삭제"
          onBtnClick={confirmDeleteComment}
        />
      )}
      {/* 신고 다이얼로그 컴포넌트 */}
      {isReportDialogOpen && (
        <Dialog
          icon={<DialogReportIcon />}
          title="이 댓글을 신고할까요?"
          backBtn="취소"
          onBackBtnClick={cancelReportComment}
          redBtn="신고"
          onBtnClick={confirmReportComment}>
          <DropDown
            isSmall={false}
            selection={selectedOption || ""}
            list={REPORT_REASONS}
            onSelectionClick={(selected) => setSelectedOption(selected.content)}
            placeholder="분류"
          />
          {selectedOption === "직접 입력" && (
            <div>
              <textarea
                value={customInput}
                onChange={(event) => setCustomInput(event.target.value)}
                placeholder="신고 사유를 적어주세요"
                className="w-full h-28 border pl-4 p-2 rounded-md text-base font-regular"
              />
            </div>
          )}
        </Dialog>
      )}

      {/* 신고 확인 다이얼로그 컴포넌트 */}
      {isReportConfirmDialogOpen && (
        <Dialog
          icon={<DialogCheckIcon />}
          title="감사합니다"
          content="신고가 정상적으로 접수되었어요"
          backBtn="확인"
          onBackBtnClick={() => setIsReportConfirmDialogOpen(false)}></Dialog>
      )}
    </div>
  );
}
