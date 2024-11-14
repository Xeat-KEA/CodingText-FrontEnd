import { useEffect, useState } from "react";
import {
  BlogPost,
  CommentForm,
  CompleteArticle,
} from "@/app/(blog)/_interfaces/interfaces";
import {
  loggedInUserId,
  REPORT_REASONS,
} from "@/app/(blog)/_constants/constants";
import CommentInput from "@/app/(blog)/_components/PostComment/CommentInput";
import Comment from "@/app/(blog)/_components/PostComment/Comment";
import Dialog from "@/app/_components/Dialog";
import { DialogCheckIcon, DialogReportIcon } from "@/app/_components/Icons";
import DropDown from "@/app/_components/DropDown";
import { useParams, usePathname } from "next/navigation";
import {
  Comment_Dummy_Data,
  Post_Dummy_Data,
  Report_Dummy_Data,
} from "@/app/(admin)/_constants/constants";

// 추후에 게시글 정보 전달 (또는 추가)

export default function CommentContainer() {
  const params = useParams();

  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);

  const [comments, setComments] = useState<CommentForm[]>([]);
  const [replyParentId, setReplyParentId] = useState<number | null>(null);
  const [mentionId, setMentionId] = useState<number | null>(null);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState<number | null>(null);

  const [commentToReport, setCommentToReport] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [customInput, setCustomInput] = useState("");
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [isReportConfirmDialogOpen, setIsReportConfirmDialogOpen] =
    useState(false);

  const pathname = usePathname();
  const isAdminPage = pathname.includes("/admin/report/");

  useEffect(() => {
    const reportPost = Report_Dummy_Data.find(
      (report) => report.reportId === Number(params.id)
    );
    const currentPostId = Post_Dummy_Data.find(
      (post) =>
        post.blogId === reportPost?.reportedBlogId &&
        post.postId === reportPost.reportedPostId
    )?.postId;
    const commentsList = Comment_Dummy_Data.filter(
      (comment) => comment.postId === currentPostId
    );
    setComments(commentsList);
  }, [params.id]);

  // 답글 버튼 클릭
  const onClickReply = (commentId: number | null, userId: number | null) => {
    setReplyParentId(commentId);
    setMentionId(userId);
  };

  // 답글 취소 버튼 클릭
  const onClickCancel = () => {
    setReplyParentId(null);
    setMentionId(null);
  };
  // 댓글 작성 제출
  const submitComment = (data: { comment: string }) => {
    const newComment: CommentForm = {
      replyId: comments.length + 1,
      postId: currentPost?.postId || 0,
      userId: loggedInUserId,
      mentionId: mentionId,
      parentReplyId: replyParentId,
      content: data.comment,
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
    };
    setComments((prevComments) => {
      return [...(prevComments || []), newComment];
    });
    setReplyParentId(null);
    setMentionId(null);
  };

  // 답글 삭제
  const onClickDelete = (replyId: number) => {
    setCommentToDelete(replyId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteComment = () => {
    if (commentToDelete === null) return;
    setComments((prevComments) =>
      prevComments.filter(
        (comment) =>
          comment.replyId !== commentToDelete &&
          comment.parentReplyId !== commentToDelete // 댓글과 연결된 답글도 함께 필터링
      )
    );

    setIsDeleteDialogOpen(false);
    setCommentToDelete(null);
  };

  // 답글 신고
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

  const confirmReportComment = () => {
    if (commentToReport === null) return;
    setIsReportDialogOpen(false);
    setIsReportConfirmDialogOpen(true);
    setCommentToReport(null);
    setSelectedOption(null);
  };

  return (
    <div className="flex flex-col w-full gap-4">
      <p className="text-black text-lg">댓글 {comments.length}개</p>

      {/* 댓글 입력 */}
      {!isAdminPage && (
        <CommentInput
          target={replyParentId ? "reply" : "comment"}
          onSubmit={submitComment}
          mentionId={mentionId}
          onCancel={onClickCancel}
        />
      )}

      {comments
        .filter((comment) => !comment.parentReplyId)
        .map((comment) => (
          <div key={comment.replyId}>
            <Comment
              replyId={comment.replyId}
              userId={comment.userId}
              content={comment.content}
              createdAt={comment.createdAt}
              mentionId={comment.mentionId || null}
              isOwnComment={comment.userId === loggedInUserId}
              onDelete={() => onClickDelete(comment.replyId)}
              onReport={() => onClickReportComment(comment.replyId)}
              onReplyClick={() => onClickReply(comment.replyId, comment.userId)}
            />
            {comments
              .filter((reply) => reply.parentReplyId === comment.replyId)
              .map((reply) => (
                <Comment
                  key={reply.replyId}
                  replyId={reply.replyId}
                  userId={reply.userId}
                  content={reply.content}
                  createdAt={reply.createdAt}
                  mentionId={reply.mentionId || null}
                  isOwnComment={reply.userId === loggedInUserId}
                  onDelete={() => onClickDelete(reply.replyId)}
                  onReport={() => onClickReportComment(reply.replyId)}
                  onReplyClick={() =>
                    onClickReply(reply.parentReplyId, reply.userId)
                  }
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
