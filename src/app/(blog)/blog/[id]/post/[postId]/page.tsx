"use client"
import CommentInput from "@/app/(blog)/_components/PostComment/CommentInput";
import PostAction from "@/app/(blog)/_components/Post/PostAction";
import PostContent from "@/app/(blog)/_components/Post/PostContent";
import PostHeader from "@/app/(blog)/_components/Post/PostHeader";
import { Blog_Post_Data } from "@/app/(blog)/_constants/constants";
import BackBtn from "@/app/_components/BackBtn";
import { useBlogStore } from "@/app/stores";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { loggedInUserId } from "@/app/(blog)/_constants/constants";
import { Comment_Data } from "@/app/(blog)/_constants/constants";
import Comment from "@/app/(blog)/_components/PostComment/Comment";
import { IComment } from "@/app/(blog)/_interfaces/interfaces";
import Dialog from "@/app/_components/Dialog";
import { DialogCheckIcon, DialogReportIcon } from "@/app/_components/Icons";
import DropDown from "@/app/_components/Dropdown";

export default function PostPage() {
    //  전역변수
    const {
        params,
        boardCategories,
    } = useBlogStore();
    const router = useRouter();

    // 현재 게시글 정보
    const currentPost = Blog_Post_Data.find(post =>
        post.postId === Number(params?.postId) &&
        post.blogId === Number(params?.id)
    );

    // 현재 게시물의 상/하위 게시판 정보 -> 전역 저장
    const currentCategory = boardCategories.find(category => category.id === Number(currentPost?.categoryId));
    const currentSubCategory = currentCategory?.subCategories?.find(sub => sub.id === Number(currentPost?.subCategoryId));
    const setCategoryId = useBlogStore((state) => state.setCategoryId);
    const setSubCategoryId = useBlogStore((state) => state.setSubCategoryId);

    const [comments, setComments] = useState<IComment[]>(Comment_Data || []);
    const [replyParentId, setReplyParentId] = useState<number | null>(null);
    const [mentionId, setMentionId] = useState<number | null>(null);

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState<number | null>(null);

    const [commentToReport, setCommentToReport] = useState<number | null>(null);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [customInput, setCustomInput] = useState("");
    const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
    const [isReportConfirmDialogOpen, setIsReportConfirmDialogOpen] = useState(false);


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
        const newComment: IComment = {
            replyId: comments.length + 1,
            postId: currentPost?.postId || 0,
            userId: loggedInUserId,
            mentionId: mentionId,
            parentReplyId: replyParentId,
            content: data.comment,
            createdAt: new Date().toISOString(),
            modifiedAt: new Date().toISOString(),
        }
        setComments((prevComments) => {
            return [...(prevComments || []), newComment];
        }); setReplyParentId(null);
        setMentionId(null);
    };

    // 답글 삭제
    const onClickDelete = (replyId: number) => {
        setCommentToDelete(replyId);
        setIsDeleteDialogOpen(true);
    }

    const confirmDeleteComment = () => {
        if (commentToDelete === null) return;
        setComments((prevComments) =>
            prevComments.filter(comment => comment.replyId !== commentToDelete)
        );
        setIsDeleteDialogOpen(false);
        setCommentToDelete(null);
    }

    // 답글 신고
    const onClickReportComment = (id: number) => {
        setCommentToReport(id);
        setIsReportDialogOpen(true);
    }

    const cancelReportComment = () => {
        setIsReportDialogOpen(false);
        setCommentToReport(null);
        setCustomInput("");
        setSelectedOption(null);
    }

    const confirmReportComment = () => {
        if (commentToReport === null) return;
        setIsReportDialogOpen(false);
        setIsReportConfirmDialogOpen(true);
        setCommentToReport(null);
        setSelectedOption(null);
    }

    // // 비밀번호 상태
    // const [password, setPassword] = useState(currentPost?.isSecret);
    // const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
    // const correctPassword = currentPost?.password;

    // const passwordSubmit = (event: React.FormEvent) => {
    //     event.preventDefault();
    //     if (password === correctPassword) {
    //         setIsPasswordCorrect(true);
    //     } else {
    //         alert("비밀번호가 틀립니다.");
    //     }
    // };

    useEffect(() => {
        // sidebar 현재 서브카테고리 bold 처리 위함
        setCategoryId(Number(currentCategory?.id))
        setSubCategoryId(Number(currentSubCategory?.id))
        setComments(Comment_Data.filter((comment) => comment.postId === currentPost?.postId))
    }, [currentPost])

    return (
        <div className="flex w-full justify-center">
            <div className="max-w-800 min-h-screen flex flex-col gap-6 py-12">
                {/* 목록으로 버튼*/}
                <div className="w-full">
                    <BackBtn
                        title="목록으로"
                        onClick={() => router.push(`/blog/${params?.id}/${currentCategory?.id}/${currentSubCategory?.id}`)}
                    />
                </div>

                {/* 게시물 헤더 */}
                <div className="w-full">
                    <PostHeader
                        currentPost={currentPost}
                        currentCategory={currentCategory}
                        currentSubCategory={currentSubCategory}
                    />
                </div>

                {/* 구분선 */}
                <hr className="w-full border-t-1 border-border2" />

                {/* 게시물 내용 */}
                <div className="w-full">
                    <PostContent
                        currentPost={currentPost}
                    />
                </div>

                {/* 게시물 버튼 - PostAction */}
                <div className="w-full h-5">
                    <PostAction
                        currentPost={currentPost}
                    />
                </div>

                {/* 구분선 */}
                <hr className="w-full border-t-1 border-border2" />

                {/* 댓글  - Comment */}
                <div className="flex flex-col w-full gap-4">
                    <p className="text-black text-lg">댓글 {comments.length}개</p>

                    {/* 댓글 입력 */}
                    <CommentInput
                        target={replyParentId ? "reply" : "comment"}
                        onSubmit={submitComment}
                        mentionId={mentionId}
                        onCancel={onClickCancel}
                    />

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
                        ))
                    }

                </div>

                {/* 목록으로 버튼*/}
                <div className="w-full">
                    <BackBtn
                        title="목록으로"
                        onClick={() => router.push(`/blog/${params?.id}/${params?.categoryId}/${params?.subCategoryId}`)}
                    />
                </div>
            </div>

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
                    onBtnClick={confirmReportComment}
                >
                    <DropDown
                        isSmall={false}
                        selection={selectedOption || ""}
                        list={["스팸 및 광고", "부적절한 내용", "개인 정보 침해", "허위 사실 유포", "직접 입력"]}
                        onSelectionClick={setSelectedOption}
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
                    onBackBtnClick={() => setIsReportConfirmDialogOpen(false)}
                >
                </Dialog>
            )}
        </div>
    )
}