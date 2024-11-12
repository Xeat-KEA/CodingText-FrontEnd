import api from "@/app/_api/config";
import BackBtn from "@/app/_components/BackBtn";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Notice_Dummy_Data } from "@/app/_constants/constants";
import DOMPurify from "isomorphic-dompurify";
import { useCalculateDate } from "@/app/_hooks/useCalculateDate";
import { useBase64 } from "@/app/_hooks/useBase64";
import { useEffect, useState } from "react";
import { useTiptapStore } from "@/app/stores";
import TiptapEditor from "@/app/_components/TipTapEditor/TiptapEditor";
import NoticeEditBtn from "./NoticeEditBtn";
import IconBtn from "@/app/_components/IconBtn";
import Dialog from "@/app/_components/Dialog";


export default function AdminNoticeDetailContainer() {
    // API 호출
    const fetchNoticeData = async () => {
        const response = await api.get("/Notice");
        return response.data;
    };
    const router = useRouter();
    const params = useParams();
    const pathname = usePathname();
    const isAdmin = pathname.includes('/admin');

    const currentNotice = Notice_Dummy_Data.find(notice => notice.noticeId === Number(params.id));

    // 기존 공지사항 내용 디코딩 결과
    const contentDe = currentNotice && useBase64("decode", currentNotice.noticeContent);

    const [noticeData, setNoticeData] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const { content, setContent } = useTiptapStore();

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [noticeToDelete, setNoticeToDelete] = useState<number | null>(null);


    useEffect(() => {
        if (contentDe) {
            setNoticeData(contentDe);
        }
    }, [currentNotice]);

    // 로직 추가 예정
    const onClickDeleteNotice = (id: number) => {
        setNoticeToDelete(id);
        setIsDeleteDialogOpen(true);
    };
    const confirmDeleteNotice = () => {
        if (noticeToDelete === null) return;
        setIsDeleteDialogOpen(false);
        setNoticeToDelete(null);
        router.push(
            `/admin/notice`
        );
    };

    return (
        <div className="top-container">
            <div className="flex flex-col w-full max-w-[800px] min-h-screen gap-6">
                <BackBtn
                    title="공지사항 내역으로"
                    onClick={() =>
                        router.push(
                            '/admin/notice',
                            { scroll: false }
                        )
                    }
                />

                <div className="flex flex-col gap-2">
                    <div className="w-full text-sm text-body font-regular flex justify-between">
                        <span>공지사항</span>
                        <span>{useCalculateDate(currentNotice?.noticedAt || "")}</span>
                    </div>

                    <div className="flex w-full text-xl font-semibold">
                        <p className="text-black line-clamp-2">
                            {currentNotice?.noticeTitle}
                        </p>
                    </div>
                </div>

                {/* 구분선 */}
                <hr className="w-full border-t-1 border-border2" />

                {/* 공지사항 내용 */}
                {!isEditing ? (
                    <div className="w-full text-black border border-border2 rounded-xl p-4">
                        <div
                            className="prose"
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(noticeData),
                            }}
                        />
                    </div>
                ) : (
                    <div className="h-[400px]"><TiptapEditor /></div>
                )}

                {/* 버튼 - 수정 */}
                <div className="flex w-full h-5 justify-end gap-4">
                    <NoticeEditBtn
                        isEditing={isEditing}
                        onEditClick={() => {
                            setContent(noticeData);
                            setIsEditing((prev) => !prev);
                        }}
                        onCancelClick={() => {
                            setIsEditing((prev) => !prev);
                        }}
                        onSubmit={() => {
                            if (content !== "<p></p>") {
                                setNoticeData(content);
                                setIsEditing((prev) => !prev);
                            }
                        }}
                    />
                    {/* 버튼 - 삭제 */}
                    {!isEditing &&
                        <IconBtn
                            type="delete"
                            content="삭제"
                            onClick={() => onClickDeleteNotice(Number(currentNotice?.noticeId))}
                        />
                    }
                </div>

                <BackBtn
                        title="공지사항 내역으로"
                        onClick={() =>
                            router.push(
                                '/admin/notice',
                                { scroll: false }
                            )
                        }
                    />
            </div>
            {/* 삭제 다이얼로그 컴포넌트 */}
            {isDeleteDialogOpen && (
                <Dialog
                    title="공지사항을 삭제할까요?"
                    content="삭제 후 복구할 수 없어요!"
                    isWarning={isDeleteDialogOpen}
                    backBtn="취소"
                    onBackBtnClick={() => {
                        setIsDeleteDialogOpen(false);
                        setNoticeToDelete(null);
                    }}
                    redBtn="삭제"
                    onBtnClick={confirmDeleteNotice}
                />
            )}
        </div >
    )
}