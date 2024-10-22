import { useBlogStore } from "@/app/stores";
import { PostProps } from "../../_interfaces/interfaces";
import {
  BpEditIcon,
  BpFollowerIcon,
  BpReportIcon,
  ShareIcon,
  SmDeleteIcon,
} from "../Icons";
import { useEffect, useState } from "react";
import Dialog from "@/app/_components/Dialog";
import { DialogCheckIcon, DialogReportIcon } from "@/app/_components/Icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DropDown from "@/app/_components/DropDown";
import { REPORT_REASONS } from "../../_constants/constants";

const PostAction: React.FC<PostProps> = ({ currentPost }) => {
  // 전역 변수
  const { isOwnBlog, params } = useBlogStore();

  const router = useRouter();
  const [isLiking, setIsLiking] = useState<boolean>(false);
  const [newLikeCount, setNewLikeCount] = useState(0);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<number | null>(null);
  const [postToReport, setPostToReport] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [customInput, setCustomInput] = useState("");
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [isReportConfirmDialogOpen, setIsReportConfirmDialogOpen] =
    useState(false);

  useEffect(() => {
    setNewLikeCount(Number(currentPost?.likeCount));
  }, [currentPost]);

  const onClickLike = () => {
    if (!currentPost) return;
    const updatedLikeCount = isLiking ? newLikeCount - 1 : newLikeCount + 1;
    setNewLikeCount(updatedLikeCount);
    setIsLiking(!isLiking);
  };
  // 현재 URL 복사 -> 추후 공유 방법 수정
  const onClickCopyLink = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      setIsShareDialogOpen(true);
    });
  };

  const onClickReportPost = (id: number) => {
    setPostToReport(id);
    setIsReportDialogOpen(true);
  };

  const cancelReportPost = () => {
    setIsReportDialogOpen(false);
    setPostToReport(null);
    setCustomInput("");
    setSelectedOption(null);
  };

  const confirmReportPost = () => {
    if (postToReport === null) return;
    setIsReportDialogOpen(false);
    setIsReportConfirmDialogOpen(true);
    setPostToReport(null);
    setSelectedOption(null);
  };

  const onClickDeletePost = (id: number) => {
    setPostToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeletePost = () => {
    if (postToDelete === null) return;
    setIsDeleteDialogOpen(false);
    setPostToDelete(null);
    router.push(
      `/blog/${params?.id}/${currentPost?.categoryId}/${currentPost?.subCategoryId}`
    );
  };

  return (
    <div className="flex w-full h-5 justify-between">
      {isOwnBlog ? (
        <button className="flex items-center gap-1">
          <BpFollowerIcon isFilled={true} />
          <p className="text-primary text-xs font-semibold">{`좋아요 ${currentPost?.likeCount}`}</p>
        </button>
      ) : (
        <button className="flex items-center gap-1" onClick={onClickLike}>
          <BpFollowerIcon isFilled={isLiking} />
          <p className="text-primary text-xs font-semibold">{`좋아요 ${newLikeCount}`}</p>
        </button>
      )}
      <div className="flex gap-4">
        <button className="flex items-center gap-1" onClick={onClickCopyLink}>
          <ShareIcon />
          <p className="text-black text-xs font-semibold">{`공유`}</p>
        </button>
        {isOwnBlog ? (
          <>
            {/* 수정을 위해 필요한 ? currentPost 넘겨주기..?  경로 수정 필요*/}
            <Link href="/" className="flex items-center gap-1">
              <BpEditIcon />
              <p className="text-primary text-xs font-semibold">{`수정`}</p>
            </Link>

            <button
              className="flex items-center gap-1"
              onClick={() => onClickDeletePost(Number(currentPost?.postId))}
            >
              <SmDeleteIcon />
              <p className="text-red text-xs font-semibold">{`삭제`}</p>
            </button>
          </>
        ) : (
          <button
            className="flex items-center gap-1"
            onClick={() => onClickReportPost(Number(currentPost?.postId))}
          >
            <BpReportIcon />
            <p className="text-red text-xs font-semibold">{`이 게시글 신고`}</p>
          </button>
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
          onBtnClick={confirmReportPost}
        >
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
          onBackBtnClick={() => setIsReportConfirmDialogOpen(false)}
        ></Dialog>
      )}
    </div>
  );
};

export default PostAction;
