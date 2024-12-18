"use client";

import UserListCard from "@/app/(admin)/_components/UserListCard";
import UserListTopBar from "@/app/(admin)/_components/UserListTopBar";
import { AdminUserInfo } from "@/app/(admin)/_interfaces/interfaces";
import api from "@/app/_api/config";
import Pagination from "@/app/_components/Pagination";
import { useCheckToken } from "@/app/_hooks/useCheckToken";
import { usePaginationStore } from "@/app/stores";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export default function UserManagementPage() {
  const { accessToken, isTokenSet } = useCheckToken("/admin/sign-in");
  const { page, setPage, setLastPage } = usePaginationStore();

  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  const fetchUserList = async () => {
    const response = await api.get("/user-service/users/list", {
      params: { page: page, size: 10, input: keyword },
      headers: { Authorization: accessToken },
    });
    // 페이지 정보 초기화
    const lastPage = response.data.totalPages - 1;
    if (page > lastPage) {
      setPage(lastPage);
    }
    setLastPage(lastPage);
    return response.data.content;
  };
  const { data } = useQuery<AdminUserInfo[]>({
    queryKey: ["userList", isTokenSet, page, keyword],
    queryFn: fetchUserList,
    enabled: !!accessToken,
  });

  return (
    <>
      {/* 검색 결과 */}
      <div className="grow h-full">
        <div className={`flex flex-col gap-6`}>
          <div className="flex flex-col">
            <UserListTopBar />
            {data?.map((el) => (
              <UserListCard key={el.userId} userInfo={el} />
            ))}
          </div>
          <Pagination />
        </div>
      </div>
    </>
  );
}
