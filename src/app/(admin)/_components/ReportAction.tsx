import { SmDeleteIcon } from "@/app/(blog)/_components/Icons";
import Dialog from "@/app/_components/Dialog";
import { BlindIcon } from "@/app/_components/Icons";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Post_Dummy_Data, Report_Dummy_Data } from "../_constants/constants";


export default function ReportAction() {
    const router = useRouter();
    const params = useParams();

    const reportPost = Report_Dummy_Data.find((report) => report.reportId === Number(params.id))
    const currentPost = Post_Dummy_Data.find((post) => post.blogId === reportPost?.reportedBlogId && post.postId === reportPost.reportedPostId)
    

    // 블라인드 여부 받아와서 상태 처리
    const [isBlind, setIsBlind] = useState(false);
    const [isBlindDialogOpen, setIsblindDialogOpen] = useState(false);
    // 삭제 다이얼로그
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [postToDelete, setPostToDelete] = useState<number | null>(null);

    // 추후 로직 추가
    const onClickBlind = () => {
        setIsBlind(true);
        setIsblindDialogOpen(false);
    }

    const onClickUnBlind = () => {
        setIsBlind(false);
        setIsblindDialogOpen(false);
    }

    const onClickDeletePost = (id: number) => {
        setPostToDelete(id);
        setIsDeleteDialogOpen(true);
    };

    const confirmDeletePost = () => {
        if (postToDelete === null) return;
        setIsDeleteDialogOpen(false);
        setPostToDelete(null);
        router.push("/admin/report");
    };

    return (
        <div className="flex w-full h-5 gap-4 justify-end">
            <button
                className="flex items-center gap-1"
                onClick={() => setIsblindDialogOpen(true)}
            >
                <BlindIcon />
                <p className="text-body text-xs font-semibold">{isBlind ? "블라인드 해제" : "블라인드"}</p>
            </button>

            <button
                className="flex items-center gap-1"
                onClick={() => onClickDeletePost(Number(currentPost?.postId))}
            >
                <SmDeleteIcon />
                <p className="text-red text-xs font-semibold">{`삭제`}</p>
            </button>

            {/* 블라인드 처리 다이얼로그 컴포넌트 */}
            {isBlindDialogOpen && (
                <Dialog
                    title={isBlind ? "게시글을 블라인드 해제할까요?" : "게시글을 블라인드 처리할까요?"}
                    backBtn="취소"
                    onBackBtnClick={() => setIsblindDialogOpen(false)}
                    {...(isBlind
                        ? { primaryBtn: "블라인드 해제", onBtnClick: onClickUnBlind }
                        : { redBtn: "블라인드", onBtnClick: onClickBlind }
                    )}
                ></Dialog>
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
                    }}
                    redBtn="삭제"
                    onBtnClick={confirmDeletePost}
                />
            )}
        </div>
    )
}