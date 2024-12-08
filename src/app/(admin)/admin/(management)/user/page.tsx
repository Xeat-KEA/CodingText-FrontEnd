"use client";

import UserListCard from "@/app/(admin)/_components/UserListCard";
import UserListTopBar from "@/app/(admin)/_components/UserListTopBar";
import { AdminUserInfo } from "@/app/(admin)/_interfaces/interfaces";
import api from "@/app/_api/config";
import Pagination from "@/app/_components/Pagination";
import { useCheckToken } from "@/app/_hooks/useCheckToken";
import { usePaginationStore } from "@/app/stores";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

export default function UserManagementPage() {
  const router = useRouter();
  const { accessToken, isTokenSet } = useCheckToken("/admin/sign-in");
  const { page, setPage, setLastPage } = usePaginationStore();

  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  const onClickUser = (id: number) => {
    router.push(`/admin/user/${id}`);
  };

  const fetchUserList = async () => {
    if (accessToken) {
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
    } else {
      return null;
    }
  };
  const { data } = useQuery<AdminUserInfo[]>({
    queryKey: ["userList", isTokenSet, page, keyword],
    queryFn: fetchUserList,
  });

  return (
    <>
      {/* 검색 결과 */}
      <div className="grow h-full">
        <div className={`flex flex-col gap-6`}>
          <div className="flex flex-col">
            <UserListTopBar />
            {data?.map((el) => (
              <UserListCard key={el.userId} userInfo={el} onClick={() => {}} />
            ))}
          </div>
          <Pagination />
        </div>
      </div>
    </>
  );
}
