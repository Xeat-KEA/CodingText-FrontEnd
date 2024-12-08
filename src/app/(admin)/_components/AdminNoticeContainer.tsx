import Pagination from "@/app/_components/Pagination";
import { useEffect, useState } from "react";
import { Notice } from "@/app/_interfaces/interfaces";
import NoticeCard from "@/app/_components/NoticeCard";
import { usePaginationStore, useTokenStore } from "@/app/stores";
import { usePathname } from "next/navigation";
import Link from "next/link";
import api from "@/app/_api/config";
import { useQuery } from "@tanstack/react-query";
import { useCheckToken } from "@/app/_hooks/useCheckToken";

export default function AdminNoticeContainer() {
  const { accessToken, isTokenSet } = useCheckToken("/admin/sign-in");

  const pathname = usePathname();

  // 페이지네이션
  const { page, setPage, setLastPage } = usePaginationStore();
  
  const fetchNoticeList = async () => {
    if (accessToken) {
      const response = await api.get(`/admin-service/admins/announce`, {
        params: { page: 0, size: 5 },
        headers: { Authorization: accessToken },
      });

      // 페이지 정보 초기화
      const lastPage = response.data.totalPages - 1;
      if (page > lastPage) {
        setPage(lastPage);
      }
      setLastPage(lastPage);
      return response.data.content;
    }
    return null;
  };

  const { data } = useQuery<Notice[]>({
    queryKey: ["noticeList", isTokenSet],
    queryFn: fetchNoticeList,
  });

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
            {data?.map((el) => (
              <NoticeCard
                key={el.announceId}
                announceId={el.announceId}
                title={el.title}
                createdDate={el.createdDate}
              />
            ))}
          </div>
        </div>

        <Pagination />

        {/* // "새 게시글 작성" 버튼 */}
        <div className="flex w-full justify-end items-center">
          <Link
            href={"/admin/notice/write"}
            className="px-4 py-2 bg-primary-1 text-white text-xs text-bold rounded-md">
            새 공지사항 작성
          </Link>
        </div>
      </div>
    </div>
  );
}
