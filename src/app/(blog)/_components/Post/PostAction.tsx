import {
  useBlogStore,
  useCategoryStore,
  usePostStore,
  useWindowSizeStore,
} from "@/app/stores";
import { BpFollowerIcon, ShareIcon } from "../Icons";
import { useEffect, useRef, useState } from "react";
import Dialog from "@/app/_components/Dialog";
import { DialogCheckIcon, DialogReportIcon } from "@/app/_components/Icons";
import { useRouter } from "next/navigation";
import DropDown from "@/app/_components/DropDown";
import { REPORT_REASONS } from "../../_constants/constants";
import IconBtn from "@/app/_components/IconBtn";
import api from "@/app/_api/config";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useCheckToken } from "@/app/_hooks/useCheckToken";
import { motion } from "framer-motion";
import { useOutsideClick } from "@/app/_hooks/useOutsideClick";
import { useInView } from "react-intersection-observer";
import { handleWindowResize } from "@/app/utils";
import LikeListCard from "../LikeListCard";
import LoadingAnimation from "@/app/_components/LoadingAnimation";

export default function PostAction() {
  const { accessToken, isTokenSet } = useCheckToken();

  const queryClient = useQueryClient();

  const { currentPost, isCodingPost } = usePostStore();
  const { currentBlogId, isOwnBlog } = useBlogStore();
  const router = useRouter();
  const { windowSize } = useWindowSizeStore();
  handleWindowResize();
  const maxWidth = 1000;

  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [isReportConfirmDialogOpen, setIsReportConfirmDialogOpen] =
    useState(false);
  const [isLoginRequiredDialogOpen, setIsLoginRequiredDialogOpen] =
    useState(false);

  const [postToDelete, setPostToDelete] = useState<number | null>(null);
  const [postToReport, setPostToReport] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [customInput, setCustomInput] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const likerRef = useRef(null);

  // 바깥 영역 클릭 감지용 hook 선언
  const followerPopupRef = useOutsideClick(
    () => onClickLikerList(false),
    likerRef
  );

  const buttonVariants = {
    rest: { scale: 1 },
    clicked: { scale: 0.95, transition: { type: "spring", stiffness: 300 } },
  };

  // 좋아요 API 연결
  const onClickLike = async () => {
    if (!currentPost) return;

    if (!accessToken) {
      setIsLoginRequiredDialogOpen(true);
      return;
    }

    try {
      await api.put(
        `/blog-service/blog/board/article/like/${currentPost.articleId}`,
        null,
        {
          headers: { Authorization: accessToken },
        }
      );
      queryClient.invalidateQueries({ queryKey: ["postContent"] });
    } catch (error) {}
  };

  const onClickLikerList = (state?: boolean) => {
    setIsOpen((prev) => (state !== undefined ? state : !prev));
  };

  // 좋아요 리스트 API 호출
  const fetchLikerList = async ({ pageParam }: { pageParam?: number }) => {
    if (currentPost.articleId === -1) return null;
    const response = await api.get(
      `/blog-service/blog/board/article/like/list/${currentPost.articleId}`,
      { params: { page: pageParam, size: 5 } }
    );
    console.log(response);
    return response.data.data;
  };

  const {
    data: likers,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["likers", isOpen],
    queryFn: fetchLikerList,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.pageInfo.totalPageNum === 0) {
        return undefined;
      }
      if (
        lastPage?.pageInfo.totalPageNum === lastPage?.pageInfo.currentPageNum
      ) {
        return undefined;
      } else {
        return lastPage?.pageInfo.currentPageNum;
      }
    },
    // 데이터 평탄화
    select: (data) => data.pages.flatMap((page) => page?.recommendList),
  });

  // 무한스크롤 트리거
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && !isLoading) {
      fetchNextPage();
    }
  }, [inView]);

  // http에서는 navigator.clipboard.writeText 지원 안함 -> 추후 가능하면 수정
  const onClickCopyLink = () => {
    const currentUrl = window.location.href;
    const textarea = document.createElement("textarea");
    textarea.value = currentUrl;
    document.body.appendChild(textarea);

    textarea.select();
    try {
      document.execCommand("copy"); // 복사 실행
      setIsShareDialogOpen(true);
    } catch (error) {
      alert("복사에 실패했습니다. 직접 복사해주세요.");
    }
    document.body.removeChild(textarea);
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
    if (postToReport === null || !selectedOption) return;
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
    } catch (error) {}
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

      router.replace(`/blog/${currentBlogId}`);
    } catch (error) {}
  };

  return (
    <div className="flex w-full h-5 justify-between">
      {/* 좋아요 */}
      <div className="flex gap-1 items-center">
        <motion.button
          className="flex items-center gap-1"
          onClick={onClickLike}
          variants={buttonVariants}
          initial="rest"
          whileTap="clicked">
          <BpFollowerIcon isFilled={currentPost.checkRecommend} />
        </motion.button>
        <motion.button
          ref={likerRef}
          className="relative flex items-center gap-1 hover:underline decoration-primary-1"
          onClick={() => onClickLikerList()}
          variants={buttonVariants}
          initial="rest"
          whileTap="clicked">
          <p className="text-primary-1 text-xs font-semibold">{`좋아요 ${currentPost?.likeCount}`}</p>
          {/* 좋아요 리스트 팝업 */}
          {isOpen && (
            <div
              ref={followerPopupRef}
              style={{
                left: 0,
              }}
              className="absolute bg-white top-[calc(100%+10px)] w-[200px] h-[200px] flex flex-col items-center rounded-lg shadow-2 divide-y divide-border-1 overflow-y-auto z-10">
              {likers !== undefined && likers.length !== 0 ? (
                likers?.map((el) => (
                  <LikeListCard key={el?.blogId} liker={el!} />
                ))
              ) : (
                <span className="text-sm text-body h-full flex items-center">
                  좋아요 목록이 비어있어요!
                </span>
              )}
              {!isLoading && hasNextPage && (
                // 노출 시 다음 데이터 fetch
                <div
                  ref={ref}
                  className={`w-full flex-center shrink-0 ${
                    isLoading ? "h-full" : "h-10"
                  }`}>
                  <LoadingAnimation />
                </div>
              )}
            </div>
          )}
        </motion.button>
      </div>

      {/* 공유 */}
      <div className="flex gap-4">
        <motion.button
          className="flex items-center gap-1"
          onClick={onClickCopyLink}
          variants={buttonVariants}
          initial="rest"
          whileTap="clicked">
          <ShareIcon />
          <p className="text-black text-xs font-semibold">{`공유`}</p>
        </motion.button>

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

      {/* 로그인 필요 다이얼로그 */}
      {isLoginRequiredDialogOpen && (
        <Dialog
          title="로그인이 필요합니다"
          content={`이 기능을 사용하려면 로그인이 필요합니다.\n로그인하시겠습니까?`}
          backBtn="취소"
          onBackBtnClick={() => setIsLoginRequiredDialogOpen(false)}
          primaryBtn="로그인"
          onBtnClick={() => {
            setIsLoginRequiredDialogOpen(false);
            router.push("/sign-in");
          }}
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
                className="w-full h-28 resize-none border border-border-2 pl-4 p-2 rounded-md text-base font-regular"
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
