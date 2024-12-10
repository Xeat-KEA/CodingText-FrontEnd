import { useBlogStore, useCategoryStore, usePostStore } from "@/app/stores";
import { PostProps } from "../../_interfaces/interfaces";
import { BpFollowerIcon, ShareIcon } from "../Icons";
import { useState } from "react";
import Dialog from "@/app/_components/Dialog";
import { DialogCheckIcon, DialogReportIcon } from "@/app/_components/Icons";
import { useRouter } from "next/navigation";
import DropDown from "@/app/_components/DropDown";
import { REPORT_REASONS } from "../../_constants/constants";
import IconBtn from "@/app/_components/IconBtn";
import api from "@/app/_api/config";
import { useQueryClient } from "@tanstack/react-query";
import { useCheckToken } from "@/app/_hooks/useCheckToken";

export default function PostAction() {
  const { accessToken, isTokenSet } = useCheckToken();

  const queryClient = useQueryClient();

  const { currentPost, isCodingPost } = usePostStore();
  const { currentBlogId, isOwnBlog } = useBlogStore();
  const { categoryId, childCategoryId } = useCategoryStore();

  const router = useRouter();
  const [isLiking, setIsLiking] = useState<boolean>(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<number | null>(null);
  const [postToReport, setPostToReport] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [customInput, setCustomInput] = useState("");
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [isReportConfirmDialogOpen, setIsReportConfirmDialogOpen] =
    useState(false);

  // 좋아요 API 연결
  const onClickLike = async () => {
    if (!currentPost) return;

    try {
      await api.put(
        `/blog-service/blog/board/article/like/${currentPost.articleId}`,
        null,
        {
          headers: { Authorization: accessToken },
        }
      );
      queryClient.invalidateQueries({ queryKey: ["postContent"] });
    } catch (error) {
      console.error("게시글 좋아요 요청 오류", error);
    }
  };

  // 공유 -> URL 복사
  const onClickCopyLink = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      setIsShareDialogOpen(true);
    });
  };

  // 신고 클릭
  const onClickReportPost = (id: number) => {
    setPostToReport(id);
    setIsReportDialogOpen(true);
  };

  // 신고 취소
  const cancelReportPost = () => {
    setIsReportDialogOpen(false);
    setPostToReport(null);
    setCustomInput("");
    setSelectedOption(null);
  };

  const confirmReportPost = async () => {
    if (postToReport === null) return;
    try {
      const response = await api.post(
        `/blog-service/blog/article/report/${postToReport}`,
        {
          reportCategory: selectedOption,
          directCategory: customInput,
        },
        {
          headers: { Authorization: accessToken },
        }
      );
    } catch (error) {
      console.error("게시글 신고 실패: ", error);
    }
    setIsReportDialogOpen(false);
    setIsReportConfirmDialogOpen(true);
    setPostToReport(null);
    setCustomInput("");
    setSelectedOption(null);
  };

  // 게시글 삭제 클릭
  const onClickDeletePost = (id: number) => {
    setPostToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  // 게시글 삭제 API 요청
  const confirmDeletePost = async () => {
    if (postToDelete === null) return;
    try {
      const response = await api.delete(
        `/blog-service/blog/board/article/${postToDelete}`,
        {
          data: { articleId: postToDelete },
          headers: { Authorization: accessToken },
        }
      );
      setIsDeleteDialogOpen(false);
      setPostToDelete(null);

      router.push(`/category/${currentPost.childCategoryId}`);
    } catch (error) {
      console.error("게시글 삭제 실패:", error);
    }
  };

  return (
    <div className="flex w-full h-5 justify-between">
      {accessToken ? (
        <button className="flex items-center gap-1" onClick={onClickLike}>
          <BpFollowerIcon isFilled={currentPost.checkRecommend} />
          <p className="text-primary-1 text-xs font-semibold">{`좋아요 ${currentPost?.likeCount}`}</p>
        </button>
      ) : (
        <button className="flex items-center gap-1">
          <BpFollowerIcon isFilled={true} />
          <p className="text-primary-1 text-xs font-semibold">{`좋아요 ${currentPost?.likeCount}`}</p>
        </button>
      )}
      <div className="flex gap-4">
        <button className="flex items-center gap-1" onClick={onClickCopyLink}>
          <ShareIcon />
          <p className="text-black text-xs font-semibold">{`공유`}</p>
        </button>
        {isOwnBlog ? (
          <>
            <IconBtn
              type="edit"
              content="수정"
              onClick={() => router.push(`/edit-post/${currentPost.articleId}`)}
            />
            <IconBtn
              type="delete"
              content="삭제"
              onClick={() => onClickDeletePost(Number(currentPost?.articleId))}
            />
          </>
        ) : (
          <>
            {accessToken && (
              <IconBtn
                type="report"
                content="신고"
                onClick={() =>
                  onClickReportPost(Number(currentPost?.articleId))
                }
              />
            )}
          </>
        )}
      </div>

      {/* 공유 다이얼로그 컴포넌트 */}
      {isShareDialogOpen && (
        <Dialog
          icon={<DialogCheckIcon />}
          content="URL이 클립보드에 복사되었습니다!"
          backBtn="확인"
          onBackBtnClick={() => setIsShareDialogOpen(false)}
        />
      )}

      {/* 삭제 다이얼로그 컴포넌트 */}
      {isDeleteDialogOpen && (
        <Dialog
          title="게시글을 삭제할까요?"
          content="삭제 후 복구할 수 없어요!"
          isWarning={isDeleteDialogOpen}
          backBtn="취소"
          onBackBtnClick={() => {
            setIsDeleteDialogOpen(false);
            setPostToDelete(null);
          }}
          redBtn="삭제"
          onBtnClick={confirmDeletePost}
        />
      )}

      {/* 신고 다이얼로그 컴포넌트 */}
      {isReportDialogOpen && (
        <Dialog
          icon={<DialogReportIcon />}
          title="이 게시글을 신고할까요?"
          backBtn="취소"
          onBackBtnClick={cancelReportPost}
          redBtn="신고"
          onBtnClick={confirmReportPost}>
          <DropDown
            isSmall={false}
            selection={selectedOption || ""}
            list={REPORT_REASONS}
            onSelectionClick={(selected) => setSelectedOption(selected.content)}
            placeholder="분류"
          />
          {selectedOption === "직접 입력" && (
            <div className="mt-6">
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
