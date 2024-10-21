import Image from "next/image";
import { BpEditIcon, BpFollowerIcon, BpReportIcon } from "./Icons";
import { useState } from "react"; // useState 훅 임포트
import Dialog from "@/app/_components/Dialog";
import { DialogCheckIcon, DialogReportIcon } from "@/app/_components/Icons";
import Link from "next/link";
import DropDown from "@/app/_components/Dropdown";
import { useBlogStore } from "@/app/stores";


export default function BlogProfile() {
    // 전역 변수
    const {
        isOwnBlog,
        profile,
        setProfile
    } = useBlogStore();

    const [isFollowing, setIsFollowing] = useState<boolean>(false); // 초기값 설정
    const [blogToReport, setBlogToReport] = useState<number | null>(null);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [customInput, setCustomInput] = useState("");
    const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
    const [isReportConfirmDialogOpen, setIsReportConfirmDialogOpen] = useState(false);

    const onClickFollow = () => {
        if (!profile) return;
        const newFollowerCount = isFollowing ? profile.FollowerCount - 1 : profile.FollowerCount + 1;
        setProfile({
            ...profile,
            FollowerCount: newFollowerCount,
        });
        setIsFollowing(!isFollowing);
    };

    const onClickReportBlog = (id: number) => {
        setBlogToReport(id);
        setIsReportDialogOpen(true);
    }

    const cancelReportBlog = () => {
        setIsReportDialogOpen(false);
        setBlogToReport(null);
        setCustomInput("");
        setSelectedOption(null);
    }

    const confirmReportBlog = () => {
        if (blogToReport === null) return;
        setIsReportDialogOpen(false);
        setIsReportConfirmDialogOpen(true);
        setBlogToReport(null);
        setSelectedOption(null);
    }

    return (
        <>
            <div className="w-226 h-30 mt-12 mb-6 p-2">
                {profile && (
                    <div className="profile-card flex items-center space-x-6">
                        {/* 프로필 이미지 */}
                        {profile.profileImage && (
                            <div className="profile-image w-120 h-120 relative">
                                <Image
                                    src={profile.profileImage}
                                    alt={`${profile.name}의 프로필 이미지`}
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
                            <h2 className="text-xl text-black font-semibold">{profile.name}</h2>
                            <p className="text-sm text-body font-regular mt-2">{profile.Intro}</p>
                            <div className="flex items-center gap-4 mt-2">
                                {(!isOwnBlog) ? (
                                    <>
                                        <button className="flex items-center gap-1" onClick={onClickFollow}>
                                            <BpFollowerIcon isFilled={isFollowing} />
                                            <p className="text-primary text-xs font-semibold">{`팔로워 ${profile.FollowerCount}`}</p>
                                        </button>
                                        <button className="flex items-center gap-1" onClick={() => onClickReportBlog(profile.profileId)}>
                                            <BpReportIcon />
                                            <p className="text-red text-xs font-semibold">{`신고`}</p>
                                        </button>
                                    </>
                                ) :
                                    <>
                                        <button className="flex items-center gap-1">
                                            <BpFollowerIcon isFilled={true} />
                                            <p className="text-primary text-xs font-semibold">{`팔로워 ${profile.FollowerCount}`}</p>
                                        </button>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* 사용자 정보 수정 버튼 */}
            {(isOwnBlog) && (
                <Link href="/" className="inline-flex items-center w-auto h-5 gap-1 ml-2">
                    <BpEditIcon />
                    <p className="text-primary text-xs font-semibold">사용자 정보 수정</p>
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
                    onBtnClick={confirmReportBlog}
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
        </>
    );
}