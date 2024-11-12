import Dialog from "@/app/_components/Dialog";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Post_Dummy_Data, Report_Dummy_Data } from "../_constants/constants";
import IconBtn from "@/app/_components/IconBtn";
import DropDown from "@/app/_components/DropDown";
import { REPORT_REASONS } from "@/app/(blog)/_constants/constants";

export default function ReportAction() {
    const router = useRouter();
    const params = useParams();

    const reportPost = Report_Dummy_Data.find((report) => report.reportId === Number(params.id));
    const currentPost = Post_Dummy_Data.find((post) => post.blogId === reportPost?.reportedBlogId && post.postId === reportPost.reportedPostId);

    // 블라인드 및 삭제 상태 관리
    const [isBlind, setIsBlind] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [actionType, setActionType] = useState<"blind" | "delete" | null>(null); // 블라인드 또는 삭제 선택
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [customInput, setCustomInput] = useState("");
    const [postToBlind, setPostToBlind] = useState<number | null>(null);
    const [postToDelete, setPostToDelete] = useState<number | null>(null);

    // 블라인드 및 삭제 처리
    const onClickBlindAction = (id: number) => {
        setPostToBlind(id);
        setActionType("blind");
        setIsDialogOpen(true);
    };

    const confirmBlindPost = () => {
        if(postToBlind === null) return; 
        setIsBlind(true);
        setIsDialogOpen(false);
        setPostToBlind(null);
        // 블라인드 처리 API 호출 시 필요한 데이터
    };

    const onClickUnBlind = () => {
        setIsBlind(false);
        setIsDialogOpen(false);
    };

    const onClickDeletePost = (id: number) => {
        setPostToDelete(id);
        setActionType("delete");
        setIsDialogOpen(true);
    };

    const confirmDeletePost = () => {
        if (postToDelete === null) return;
        setIsDialogOpen(false);
        setPostToDelete(null);
        router.push("/admin/report");
    };

    return (
        <div className="flex w-full h-5 gap-4 justify-end">
            <IconBtn
                type="blind"
                content={isBlind ? "블라인드 해제" : "블라인드"}
                onClick={() => onClickBlindAction(Number(currentPost?.postId))}
            />

            <IconBtn
                type="delete"
                content="삭제"
                onClick={() => onClickDeletePost(Number(currentPost?.postId))}
            />

            {/* 블라인드 처리 및 삭제 사유를 하나의 다이얼로그에서 처리 */}
            {isDialogOpen && (
                <Dialog
                    title={actionType === "blind" ? (isBlind ? "블라인드 해제 사유를 선택해 주세요" : "블라인드 처리 사유를 선택해 주세요") : "삭제 사유를 선택해 주세요"}
                    backBtn="취소"
                    onBackBtnClick={() => setIsDialogOpen(false)}
                    {
                        ...(actionType === "blind"
                          ? {
                              ...(isBlind
                                ? { primaryBtn: "블라인드 해제", onBtnClick: onClickUnBlind }
                                : { redBtn: "블라인드", onBtnClick: confirmBlindPost })
                            }
                          : {
                              redBtn: "삭제",
                              onBtnClick: confirmDeletePost
                            }
                        )
                      }
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
                                placeholder={actionType === "blind" ? "블라인드 사유를 적어주세요" : "삭제 사유를 적어주세요"}
                                className="w-full h-28 border pl-4 p-2 rounded-md text-base font-regular"
                            />
                        </div>
                    )}
                </Dialog>
            )}
        </div>
    );
}