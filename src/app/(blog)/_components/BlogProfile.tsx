"use client";
import Image from "next/image"; // Next.js에서 이미지 최적화 컴포넌트 사용
import { Blog_Profile_Data, loggedInUserId, blogOwnerId } from "../_constants/constants";
import { BpFollowerIcon1, BpFollowerIcon2, BpReportIcon } from "./Icons";
import { use, useState } from "react"; // useState 훅 임포트
import Dialog from "@/app/_components/Dialog";
import { DialogCheckIcon, DialogReportIcon } from "@/app/_components/Icons";

export default function BlogProfile() {

    const [blogToReport, setBlogToReport] = useState<number | null>(null);
    const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
    const [isReportConfirmDialogOpen, setIsReportConfirmDialogOpen] = useState(false);

    const handleReportBlog = (id: number) => {
        console.log(id, "블로그 신고 요청")
        setBlogToReport(id);
        setIsReportDialogOpen(true);
    }

    const cancelReportBlog = () => {
        setIsReportDialogOpen(false);
        setBlogToReport(null);
    }

    const confirmReportBlog = () => {
        if (blogToReport === null) return;
        setIsReportDialogOpen(false);
        setIsReportConfirmDialogOpen(true);
        setBlogToReport(null);
    }

    return (
        <div className="w-226 h-30 mt-12 mb-6 p-2">
            {/* 프로필 데이터 출력 */}
            {Blog_Profile_Data.map((profile, index) => {
                // 팔로워 상태를 관리하기 위한 useState 훅
                const [isFollowerClicked, setIsFollowerClicked] = useState(false);
                const [followerCount, setFollowerCount] = useState(profile.FollowerCount);

                // 팔로워 버튼 클릭 시 상태를 업데이트하는 함수
                const handleFollowerClick = () => {
                    if (isFollowerClicked) {
                        setFollowerCount(followerCount - 1);
                    } else {
                        setFollowerCount(followerCount + 1);
                    }
                    setIsFollowerClicked(!isFollowerClicked);
                };

                return (
                    <div key={index} className="profile-card flex items-center space-x-6">
                        {/* 프로필 이미지 */}
                        {profile.profileImage && (
                            <div className="profile-image w-120 h-120 relative">
                                <Image
                                    src={profile.profileImage}
                                    alt={`${profile.name}의 프로필 이미지`}
                                    width={120}
                                    height={120}
                                    className="rounded-full"
                                />
                            </div>
                        )}

                        {/* 프로필 정보 */}
                        <div className="profile-info w-[428px] h-26">
                            <p className="text-body text-xs font-bold">{profile.rank}</p>
                            <h2 className="text-xl text-black font-semibold">{profile.name}</h2>
                            <p className="text-sm text-body font-regular mt-2">{profile.Intro}</p>
                            <div className="flex items-center gap-4 mt-2">
                                <button className="flex items-center gap-1" onClick={handleFollowerClick}>
                                    {isFollowerClicked ? <BpFollowerIcon2 /> : <BpFollowerIcon1 />}
                                    <p className="text-primary xs font-semibold">{`팔로워 ${followerCount}`}</p>
                                </button>
                                {(loggedInUserId !== blogOwnerId) ? (
                                    <>
                                        <button className="flex items-center gap-1" onClick={() => handleReportBlog(profile.profileId)}>
                                            <BpReportIcon />
                                            <p className="text-red xs font-semibold">{`신고`}</p>
                                        </button>
                                    </>
                                ) : null}
                            </div>
                        </div>
                    </div>
                );
            })}


            {/* 신고 다이얼로그 컴포넌트 */}
            {isReportDialogOpen && (
                <Dialog
                    icon={<DialogReportIcon />}
                    title="이 블로그를 신고할까요?"
                    backBtn="취소"
                    onBackBtnClick={cancelReportBlog}
                    redBtn="신고"
                    onBtnClick={confirmReportBlog}
                />
            )}

            {/* 신고 확인 다이얼로그 컴포넌트 */}
            {isReportConfirmDialogOpen && (
                <Dialog
                    icon={<DialogCheckIcon />}
                    title="감사합니다"
                    content="신고가 정상적으로 접수되었어요"
                    backBtn="확인"
                    onBackBtnClick={() => setIsReportConfirmDialogOpen(false)}
                />
            )}
        </div>
    );
}