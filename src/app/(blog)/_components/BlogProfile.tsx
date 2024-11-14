import Image from "next/image";
import { BpEditIcon, BpFollowerIcon } from "./Icons";
import { useEffect, useState } from "react"; // useState 훅 임포트
import Dialog from "@/app/_components/Dialog";
import { DialogCheckIcon, DialogReportIcon } from "@/app/_components/Icons";
import Link from "next/link";
import { useBlogStore } from "@/app/stores";
import { REPORT_REASONS } from "../_constants/constants";
import DropDown from "@/app/_components/DropDown";
import IconBtn from "@/app/_components/IconBtn";

export default function BlogProfile() {
  // 전역 변수
  const { blogId, isOwnBlog, profile, setProfile } = useBlogStore();
  const [isFollowing, setIsFollowing] = useState(false); // 초기값 설정
  const [blogToReport, setBlogToReport] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [customInput, setCustomInput] = useState("");
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [isReportConfirmDialogOpen, setIsReportConfirmDialogOpen] =
    useState(false);

  const onClickFollow = () => {
    if (!profile) return;
    const newFollowerCount = isFollowing
      ? profile.FollowerCount - 1
      : profile.FollowerCount + 1;
    setProfile({
      ...profile,
      FollowerCount: newFollowerCount,
    });
    setIsFollowing(!isFollowing);
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

  const confirmReportBlog = () => {
    if (blogToReport === null) return;
    setIsReportDialogOpen(false);
    setIsReportConfirmDialogOpen(true);
    setBlogToReport(null);
    setSelectedOption(null);
  };

  // 프로필 api 연결
  useEffect(() => {}, [blogId]);
  return (
    <>
      <div className="w-226 h-30 mt-12 mb-6 p-2">
        {profile && (
          <div className="profile-card flex items-center space-x-6">
            {/* 프로필 이미지 */}
            {profile.profileImg && (
              <div className="profile-image w-120 h-120 relative">
                <Image
                  src={profile.profileImg}
                  alt={`${profile.nickName}의 프로필 이미지`}
                  width={120}
                  height={120}
                  className="rounded-full"
                  priority
                />
              </div>
            )}

            {/* 프로필 정보 */}
            <div className="profile-info w-[428px] h-26">
              <p className="text-body text-xs font-bold">{profile.rank}</p>
              <h2 className="text-xl text-black font-semibold">
                {profile.nickName}
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
                      <BpFollowerIcon isFilled={isFollowing} />
                      <p className="text-primary-1 text-xs font-semibold">{`팔로워 ${profile.FollowerCount}`}</p>
                    </button>

                    <IconBtn
                      type="report"
                      content="신고"
                      onClick={() => onClickReportBlog(profile.userId)}
                    />
                  </>
                ) : (
                  <>
                    <button className="flex items-center gap-1">
                      <BpFollowerIcon isFilled={true} />
                      <p className="text-primary-1 text-xs font-semibold">{`팔로워 ${profile.FollowerCount}`}</p>
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
    </>
  );
}
