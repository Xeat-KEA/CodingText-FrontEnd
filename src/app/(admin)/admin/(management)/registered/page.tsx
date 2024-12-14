"use client";

import RegisterCard from "@/app/(admin)/_components/RegisterCard";
import RegisterTopBar from "@/app/(admin)/_components/RegisterTopBar";
import { CodeDetail } from "@/app/(admin)/_interfaces/interfaces";
import api from "@/app/_api/config";
import Pagination from "@/app/_components/Pagination";
import { useCheckToken } from "@/app/_hooks/useCheckToken";
import { usePaginationStore } from "@/app/stores";
import { useQuery } from "@tanstack/react-query";

export default function RegisterPage() {
  const { accessToken, isTokenSet } = useCheckToken("/admin/sign-in");
  const { page, setPage, setLastPage } = usePaginationStore();

  const fetchPendingList = async () => {
    const response = await api.get(
      "/code-bank-service/admin/register/pendinglists",
      { headers: { Authorization: accessToken } }
    );
    // 페이지 정보 초기화
    const lastPage = response.data.totalPages - 1;
    if (page > lastPage) {
      setPage(lastPage);
    }
    setLastPage(lastPage);
    return response.data.content;
  };
  const { data } = useQuery<CodeDetail[]>({
    queryKey: ["pendingList", isTokenSet],
    queryFn: fetchPendingList,
    enabled: !!accessToken,
  });

  return (
    <div className="flex flex-col gap-6">
      {/* 건의된 코드 내역 */}
      <div className="flex flex-col">
        <RegisterTopBar />
        <div className="flex flex-col divide-y divide-border-2">
          {data?.map((el) => (
            <RegisterCard
              key={el.code.codeId}
              nickName={el.nickName}
              code={el.code}
              testcases={el.testcases}
            />
          ))}
        </div>
      </div>
      <Pagination />
    </div>
  );
}
