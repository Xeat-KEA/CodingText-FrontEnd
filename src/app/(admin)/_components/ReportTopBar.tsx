import { useTabStore } from "@/app/stores";

export default function ReportTopBar() {
    const { tab } = useTabStore();

    return (
        <div className="w-full p-2 flex gap-4 justify-between items-center bg-bg-1 border-b border-border-2">
            <div className="w-full flex gap-2">
                <div className="w-20 list-topbar-tab">신고일</div>
                <div className="w-[100px] list-topbar-tab">신고자</div>
                <div className="w-full grow list-topbar-text">
                    {tab === "게시글" ? "신고 게시글 제목" : "신고 댓글 내용"}
                </div>
            </div>
        </div>
    )
}