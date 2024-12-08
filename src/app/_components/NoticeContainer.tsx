import Pagination from "@/app/_components/Pagination";
import { useEffect, useState } from "react";
import { Notice } from "../_interfaces/interfaces";
import NoticeCard from "./NoticeCard";
import { usePaginationStore } from "@/app/stores";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import api from "../_api/config";

export default function NoticeContainer() {
  const pathname = usePathname();
  const isAdmin = pathname.includes("/admin");

  const [data, setData] = useState<Notice[]>([]);

  // 페이지네이션
  const { page, setPage, setLastPage } = usePaginationStore();
  // 첫 페이지 초기화
  useEffect(() => {
    setPage(1);
    setLastPage(Math.ceil(data.length / 10));
  }, [data]);

  // 추후 데이터 API
//   const fetchUserNoticeList = async () => {
//     const response = await api.get(`/user-service/users/announce`, {
//       params: { page: 0, size: 5 },
//     });
//     console.log(response);
//     // setData(response.data.content);
//   };

//   const { data: userNoticList } = useQuery({
//     queryKey: ["userNoticeList"],
//     queryFn: fetchUserNoticeList,
//   });

  return (
    <div className="top-container">
      <div className={`flex flex-col max-w-1000 p-12 gap-6`}>
        {/* // 공지사항 텍스트 */}
        <div className="flex w-full justify-start">
          <p className="text-black text-2xl font-semibold">공지사항</p>
        </div>

        {/* // 공지사항 리스트 */}
        <div className="w-full flex flex-col mb-6 divide-y divide-border-2 border-b border-border-2">
          {data.map((el) => (
            <NoticeCard
              announceId={el.announceId}
              title={el.title}
              createdDate={el.createdDate}
            />
          ))}
        </div>

        <Pagination />

        {/* // "새 게시글 작성" 버튼 */}
        {isAdmin && (
          <div className="flex w-full justify-end items-center">
            <Link
              href={"/admin/notice/write"}
              className="px-4 py-2 bg-primary text-white text-xs text-bold rounded-md">
              새 공지사항 작성
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
