import Image from "next/image";
import { BpEditIcon, BpFollowerIcon } from "./Icons";
import { useEffect, useState } from "react"; // useState 훅 임포트
import Dialog from "@/app/_components/Dialog";
import { DialogCheckIcon, DialogReportIcon } from "@/app/_components/Icons";
import Link from "next/link";
import { useBlogStore, useTokenStore } from "@/app/stores";
import { REPORT_REASONS } from "../_constants/constants";
import DropDown from "@/app/_components/DropDown";
import IconBtn from "@/app/_components/IconBtn";
import api from "@/app/_api/config";
import { useQueryClient } from "@tanstack/react-query";
import { profileProps } from "@/app/_interfaces/interfaces";
import ProfileImgContainer from "@/app/_components/ProfileImgContainer";

export default function BlogProfile({ profile }: profileProps) {
  // 로그인 여부 확인
  const { accessToken, isTokenSet } = useTokenStore();

  const queryClient = useQueryClient();

  const { userBlogId, currentBlogId, isOwnBlog } = useBlogStore();
  const [blogToReport, setBlogToReport] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [customInput, setCustomInput] = useState("");
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [isReportConfirmDialogOpen, setIsReportConfirmDialogOpen] =
    useState(false);

  const onClickFollow = async () => {
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
    } catch (error) {
      console.error("팔로우 요청 오류", error);
    }
  };

  const onClickReportBlog = (id: number) => {
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
    if (blogToReport === null) return;

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
    } catch (error) {
      console.error("블로그 신고 실패: ", error);
    }

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
              <h2 className="text-xl text-black font-semibold">
                {profile.userName}
              </h2>
              <p className="text-sm text-body font-regular mt-2">
                {profile.profileMessage}
              </p>
              <div className="flex items-center gap-4 mt-2">
                {!isOwnBlog ? (
                  <>
                    <button
                      className="flex items-center gap-1"
                      onClick={onClickFollow}>
                      <BpFollowerIcon isFilled={profile.followCheck} />
                      <p className="text-primary-1 text-xs font-semibold">{`팔로워 ${profile.followCount}`}</p>
                    </button>

                    <IconBtn
                      type="report"
                      content="신고"
                      onClick={() => onClickReportBlog(profile.blogId)}
                    />
                  </>
                ) : (
                  <>
                    <button className="flex items-center gap-1">
                      <BpFollowerIcon isFilled={true} />
                      <p className="text-primary-1 text-xs font-semibold">{`팔로워 ${profile.followCount}`}</p>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

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
    </>
  );
}
