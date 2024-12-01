import { Code } from "@/app/(code)/_interfaces/interfaces";
import Dialog from "@/app/_components/Dialog";
import IconBtn from "@/app/_components/IconBtn";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AdminResponseDialogs from "./AdminResponseDialogs";
import { useQueryClient } from "@tanstack/react-query";
import { useTokenStore } from "@/app/stores";
import api from "@/app/_api/config";

export default function AdminCodeCard({ code }: { code: Code }) {
  const router = useRouter();
  const { accessToken } = useTokenStore();

  const [isDialogOpen, setIsDialogOpen] = useState({
    delete: false,
    error: false,
    done: false,
  });
  const onDelete = async () => {
    try {
      const response = await api.delete(
        `/code-bank-service/admin/delete/${code.codeId}`,
        {
          headers: { Authorization: accessToken },
        }
      );
      setIsDialogOpen({ delete: false, error: false, done: true });
    } catch (err) {
      setIsDialogOpen((prev) => ({ ...prev, error: !prev.error }));
    }
  };

  const queryClient = useQueryClient();
  const onError = () =>
    setIsDialogOpen((prev) => ({ ...prev, error: !prev.error }));

  const onDone = () => {
    queryClient.invalidateQueries({
      queryKey: ["codeList"],
      exact: false,
    });
    setIsDialogOpen((prev) => ({ ...prev, done: !prev.done }));
  };

  return (
    <>
      <div className="w-full px-2 py-4 flex items-center relative">
        <div className="w-[60px] text-xs font-semibold text-primary-1 flex-center whitespace-nowrap shrink-0">
          #{code.codeId}
        </div>
        <span className="w-full grow text-sm text-black whitespace-nowrap">
          {code.title}
        </span>
        <div className="flex gap-4 absolute right-2 top-1/2 -translate-y-1/2">
          <IconBtn
            type="edit"
            content="수정"
            onClick={() => router.push(`/admin/code/${code.codeId}`)}
          />
          <IconBtn
            type="delete"
            content="삭제"
            onClick={() =>
              setIsDialogOpen((prev) => ({ ...prev, delete: !prev.delete }))
            }
          />
        </div>
      </div>
      {isDialogOpen.delete && (
        <Dialog
          title="문제를 삭제할까요?"
          content="삭제 후 복구할 수 없어요!"
          isWarning
          backBtn="취소"
          onBackBtnClick={() =>
            setIsDialogOpen((prev) => ({ ...prev, delete: !prev.delete }))
          }
          redBtn="삭제"
          onBtnClick={onDelete}
        />
      )}
      <AdminResponseDialogs
        isDone={isDialogOpen.done}
        isError={isDialogOpen.error}
        onDone={onDone}
        onError={onError}
      />
    </>
  );
}
