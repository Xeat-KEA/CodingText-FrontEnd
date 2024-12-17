"use client";

import RegisterCard from "@/app/(admin)/_components/RegisterCard";
import RegisterTopBar from "@/app/(admin)/_components/RegisterTopBar";
import { CodeDetail } from "@/app/(admin)/_interfaces/interfaces";
import api from "@/app/_api/config";
import Dialog from "@/app/_components/Dialog";
import Pagination from "@/app/_components/Pagination";
import { useCheckToken } from "@/app/_hooks/useCheckToken";
import { usePaginationStore } from "@/app/stores";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function RegisterPage() {
  const { accessToken, isTokenSet } = useCheckToken("/admin/sign-in");
  const { page, setPage, setLastPage } = usePaginationStore();
  const queryClient = useQueryClient();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCodeId, setSelectedCodeId] = useState<number | null>(null);

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

  const onClickDeny = (codeId: number) => {
    setSelectedCodeId(codeId);
    setIsDialogOpen(true);
  };

  const confirmDeny = () => {
    if (selectedCodeId !== null) {
      denyMutation.mutate(selectedCodeId);
    }
  };

  // 등록 거부 처리 함수
  const denyMutation = useMutation({
    mutationFn: async (codeId: number) => {
      return await api.put(
        `/code-bank-service/admin/register/${codeId}/refused`,
        {},
        {
          headers: { Authorization: accessToken },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pendingList"] });
      setIsDialogOpen(false);
    },
    onError: () => {
      setIsDialogOpen(false);
    },
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
              onDeny={() => onClickDeny(el.code.codeId)}
            />
          ))}
        </div>
      </div>
      <Pagination />

      {/* 등록 거부 dialog */}
      {isDialogOpen && (
        <Dialog
          title="문제 등록 신청 거부"
          content="해당 문제의 등록 신청을 거부할까요?"
          isWarning
          backBtn="취소"
          onBackBtnClick={() => setIsDialogOpen(false)}
          redBtn="거부"
          onBtnClick={confirmDeny}
        />
      )}
    </div>
  );
}
