import Image from "next/image";
import { BpEditIcon, BpFollowerIcon } from "./Icons";
import { useEffect, useRef, useState } from "react";
import Dialog from "@/app/_components/Dialog";
import { DialogCheckIcon, DialogReportIcon } from "@/app/_components/Icons";
import Link from "next/link";
import { useBlogStore, useTokenStore, useWindowSizeStore } from "@/app/stores";
import { REPORT_REASONS } from "../_constants/constants";
import DropDown from "@/app/_components/DropDown";
import IconBtn from "@/app/_components/IconBtn";
import api from "@/app/_api/config";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { profileProps } from "@/app/_interfaces/interfaces";
import ProfileImgContainer from "@/app/_components/ProfileImgContainer";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { usePathname, useRouter } from "next/navigation";
import { useOutsideClick } from "@/app/_hooks/useOutsideClick";
import { handleWindowResize } from "@/app/utils";
import LoadingAnimation from "@/app/_components/LoadingAnimation";
import LikeListCard from "./LikeListCard";

export default function BlogProfile({ profile }: profileProps) {
  // 로그인 여부 확인
  const { accessToken, isTokenSet } = useTokenStore();

  const queryClient = useQueryClient();
  const router = useRouter();

  const { userBlogId, currentBlogId, isOwnBlog } = useBlogStore();
  const [blogToReport, setBlogToReport] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [customInput, setCustomInput] = useState("");
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [isReportConfirmDialogOpen, setIsReportConfirmDialogOpen] =
    useState(false);
  const [isLoginRequiredDialogOpen, setIsLoginRequiredDialogOpen] =
    useState(false);


  // 팔로우 리스트와 팝업 상태 관리
  const [isOpen, setIsOpen] = useState(false);
  const [followList, setFollowList] = useState([]);

  const followerRef = useRef(null);

  // 바깥 영역 클릭 감지용 hook 선언
  const followerPopupRef = useOutsideClick(
    () => onClickFollowerList(false),
    followerRef
  );

  const buttonVariants = {
    rest: { scale: 1 },
    clicked: { scale: 0.95, transition: { type: "spring", stiffness: 300 } },
  };

  const onClickFollow = async () => {
    if (!accessToken) {
      setIsLoginRequiredDialogOpen(true);
      return;
    }

    try {
      // 팔로우/언팔로우 API 요청 보내기
      const response = await api.put(
        `/blog-service/blog/home/follow/${currentBlogId}`,
        null,
        {
          headers: { Authorization: accessToken },
        }
      );

      // 프로필 데이터 다시 가져오기
      queryClient.invalidateQueries({ queryKey: ["blogInfo"] });
    } catch (error) {}
  };

  const onClickFollowerList = (state?: boolean) => {
    setIsOpen((prev) => (state !== undefined ? state : !prev));
  };

  // 팔로워 리스트 API 호출
  const fetchFollowerList = async ({ pageParam }: { pageParam?: number }) => {
    if (currentBlogId === -1) return null;
    const response = await api.get(
      `/blog-service/blog/home/follow/list/${currentBlogId}`,
      { params: { page: pageParam, size: 5 } }
    );
    return response.data.data;
  };

  const {
    data: followers,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["followers", isOpen],
    queryFn: fetchFollowerList,
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
    select: (data) => data.pages.flatMap((page) => page?.followerList),
  });

  // 무한스크롤 트리거
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && !isLoading) {
      fetchNextPage();
    }
  }, [inView]);

  const onClickReportBlog = (id: number) => {
    if (!accessToken) {
      setIsLoginRequiredDialogOpen(true);
      return;
    }

    setBlogToReport(id);
    setIsReportDialogOpen(true);
  };

  const cancelReportBlog = () => {
    setIsReportDialogOpen(false);
    setBlogToReport(null);
    setCustomInput("");
    setSelectedOption(null);
  };

  const confirmReportBlog = async () => {
    if (blogToReport === null || !selectedOption) return;

    try {
      const response = await api.post(
        `/blog-service/blog/report/${blogToReport}`,
        {
          reportCategory: selectedOption,
          directCategory: customInput,
        },
        {
          headers: { Authorization: accessToken },
        }
      );

      setIsReportDialogOpen(false);
      setIsReportConfirmDialogOpen(true);
    } catch (error) {}

    setBlogToReport(null);
    setCustomInput("");
    setSelectedOption(null);
  };

  return (
    <>
      <div className="w-226 h-30 mt-12 mb-6 p-2">
        {profile && (
          <div className="profile-card flex items-center space-x-6">
            {/* 프로필 이미지 */}
            {profile.profileUrl && (
              <div className="profile-image w-120 h-120 relative shrink-0">
                <ProfileImgContainer
                  width={120}
                  height={120}
                  src={profile.profileUrl}
                />
              </div>
            )}

            {/* 프로필 정보 */}
            <div className="profile-info w-[428px] h-26">
              <p className="text-body text-xs font-bold">{profile.tier}</p>
              <p className="text-xl text-black font-semibold">
                {profile.userName}
              </p>

              <p className="text-sm text-body font-regular mt-2">
                {profile.profileMessage}
              </p>

              <div className="flex items-center gap-4 mt-2">
                <div className="flex gap-1 items-center">
                  <motion.button
                    className="flex items-center gap-1"
                    onClick={isOwnBlog ? undefined : onClickFollow}
                    variants={buttonVariants}
                    initial="rest"
                    whileTap="clicked">
                    <BpFollowerIcon isFilled={profile.followCheck} />
                  </motion.button>
                  <motion.button
                    ref={followerRef}
                    className="relative flex items-center gap-1"
                    onClick={() => onClickFollowerList()}
                    variants={buttonVariants}
                    initial="rest"
                    whileTap="clicked">
                    <p className="text-primary-1 text-xs font-semibold whitespace-nowrap hover:underline decoration-primary-1">{`팔로워 ${profile.followCount}`}</p>

                    {/* 팔로워 리스트 팝업 */}
                    {isOpen && (
                      <div
                        ref={followerPopupRef}
                        style={{
                          left: 0,
                        }}
                        className="absolute bg-white top-[calc(100%+10px)] w-[200px] h-[200px] flex flex-col items-center rounded-lg shadow-2 divide-y divide-border-1 overflow-y-auto z-10">
                        {followers !== undefined && followers.length !== 0 ? (
                          followers?.map((el) => (
                            <LikeListCard key={el?.blogId} liker={el!} />
                          ))
                        ) : (
                          <span className="text-sm text-body h-full flex items-center">
                            팔로워 목록이 비어있어요!
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

                {!isOwnBlog && (
                  <IconBtn
                    type="report"
                    content="신고"
                    onClick={() => onClickReportBlog(profile.blogId)}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>

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

      {/* 사용자 정보 수정 버튼 */}
      {isOwnBlog && (
        <Link
          // 경로 수정 필요
          href="/edit/profile"
          className="inline-flex items-center w-auto h-5 gap-1 ml-2">
          <BpEditIcon />
          <p className="text-primary-1 text-xs font-semibold">
            사용자 정보 수정
          </p>
        </Link>
      )}

      {/* 신고 다이얼로그 컴포넌트 */}
      {isReportDialogOpen && (
        <Dialog
          icon={<DialogReportIcon />}
          title="이 블로그를 신고할까요?"
          backBtn="취소"
          onBackBtnClick={cancelReportBlog}
          redBtn="신고"
          onBtnClick={confirmReportBlog}>
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
    </>
  );
}
