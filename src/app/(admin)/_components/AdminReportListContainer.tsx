"use client";

import TabBar from "@/app/_components/TapBar/TabBar";
import { Report_Dummy_Data, REPORT_TAP_LIST } from "../_constants/constants";
import { usePaginationStore, useTabStore } from "@/app/stores";
import ReportTopBar from "./ReportTopBar";
import ReportCard from "./ReportCard";
import { Report } from "../_interfaces/interfaces";
import { useEffect, useState } from "react";
import Pagination from "@/app/_components/Pagination";

export default function AdminReportListContainer() {
    // 더미 데이터 생성
    useEffect(() => {
        setData(Report_Dummy_Data);
    }, []);

    const { tab } = useTabStore();

    const [data, setData] = useState<Report[]>([]);

    // 페이지네이션
    const { page, setPage, setLastPage } = usePaginationStore();
    // 첫 페이지 초기화
    useEffect(() => {
        setPage(1);
        setLastPage(Math.ceil(data.length / 10));
    }, [data]);


    return (
        <div className="w-full flex flex-col">
            {/* 신고 내역 탭바 */}
            <TabBar menuList={REPORT_TAP_LIST} />

            {/* 신고 리스트 상단바 */}
            <ReportTopBar />

            {/* 신고 리스트 */}
            <div className="w-full flex flex-col mb-6 divide-y divide-border-2 border-b border-border-2">
                {data.filter((el) => {
                    return tab === "게시글" ? el.reportedCommentId === undefined : el.reportedCommentId !== undefined;
                }).map((el) => (
                    <ReportCard
                        key={el.reportId}
                        reportId={el.reportId}
                        reportUserId={el.reportUserId}
                        reportedBlogId={el.reportedBlogId}
                        reportedPostId={el.reportedPostId}
                        reportedAt={el.reportedAt}
                        reportedCommentId={el.reportedCommentId}
                        reportReason={el.reportReason}
                        directReason={el.directReason}
                    />
                ))}
            </div>
            {/* 페이지네이션 */}
            <Pagination />
        </div>
    )
}