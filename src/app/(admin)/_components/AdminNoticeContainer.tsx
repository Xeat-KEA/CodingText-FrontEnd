import Pagination from "@/app/_components/Pagination";
import { useEffect, useState } from "react";
import { Notice } from "@/app/_interfaces/interfaces";
import NoticeCard from "@/app/_components/NoticeCard";
import { Notice_Dummy_Data } from "@/app/_constants/constants";
import { usePaginationStore } from "@/app/stores";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function AdminNoticeContainer() {
    const pathname = usePathname();
    const isAdmin = pathname.includes('/admin');

    const [data, setData] = useState<Notice[]>([]);

    // 페이지네이션
    const { page, setPage, setLastPage } = usePaginationStore();
    // 첫 페이지 초기화
    useEffect(() => {
        setPage(1);
        setLastPage(Math.ceil(data.length / 10));
    }, [data]);

    // 추후 데이터 API
    useEffect(() => {
        setData(Notice_Dummy_Data);
    }, [])

    return (
        <div className="top-container">
            <div className={`flex flex-col w-full gap-6`}>
                {/* // 공지사항 리스트 */}
                <div>
                    <div className="w-full p-2 flex gap-6 items-center bg-bg-1 border-y border-border-2">
                        <div className="w-20 list-topbar-tab">작성일</div>
                        <div className="list-topbar-tab">공지사항 제목</div>
                    </div>
                    <div className="w-full flex flex-col mb-6 divide-y divide-border-2 border-b border-border-2">
                        {data.map((el) => (
                            <NoticeCard
                                noticeId={el.noticeId}
                                noticeTitle={el.noticeTitle}
                                noticeContent={el.noticeContent}
                                noticedAt={el.noticedAt}
                            />
                        ))}
                    </div>
                </div>

                <Pagination />

                {/* // "새 게시글 작성" 버튼 */}
                {isAdmin && (
                    <div className="flex w-full justify-end items-center">
                        <Link
                            href={"/admin/notice/write"}
                            className="px-4 py-2 bg-primary text-white text-xs text-bold rounded-md"
                        >
                            새 공지사항 작성
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
