import { SmDeleteIcon } from "@/app/(blog)/_components/Icons";
import { useState } from "react";
import Dialog from "@/app/_components/Dialog";
import { Admin } from "../_interfaces/interfaces";
import api from "@/app/_api/config";
import { DialogCheckIcon, DialogXIcon } from "@/app/_components/Icons";
import { useTokenStore } from "@/app/stores";
import { useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";

export default function AdminListCard({ email, id, adminRole }: Admin) {
  const { accessToken } = useTokenStore();
  const [isDialogOpen, setIsDialogOpen] = useState({
    delete: false,
    error: false,
    done: false,
  });
  const onDelete = async () => {
    try {
      // 삭제될 계정 서버로 POST 필요
      const response = await api.delete(`/admin-service/admins/${id}`, {
        headers: { Authorization: accessToken },
      });
      setIsDialogOpen({ delete: false, error: false, done: true });
    } catch (err) {
      setIsDialogOpen((prev) => ({ ...prev, error: !prev.error }));
    }
  };

  const queryClient = useQueryClient();

  return (
    <>
      <div className="w-full p-2 flex gap-4 justify-between items-center">
        <div className="w-full grow text-sm text-black">{email}</div>
        <div className="flex gap-2">
          <div className="w-[60px] flex-center text-xs text-black">
            {adminRole === "ROOT" ? "루트" : "일반"}
          </div>
          <div className="w-[45px] flex-center">
            {/*삭제 버튼 */}
            {adminRole !== "ROOT" && (
              <button
                onClick={() =>
                  setIsDialogOpen((prev) => ({ ...prev, delete: !prev.delete }))
                }
                className="flex-center gap-1"
              >
                <SmDeleteIcon />
                <span className="text-xs font-semibold text-red">삭제</span>
              </button>
            )}
          </div>
        </div>
      </div>
      {/* 관리자 삭제 팝업 */}
      {isDialogOpen.delete && (
        <Dialog
          title={`'${email}' 님을\n관리자에서 삭제할까요?`}
          isTitleSm
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
      {isDialogOpen.error && (
        <Dialog
          icon={<DialogXIcon />}
          title={"요청이\n거부되었어요"}
          content={"권한이 없거나\n서버에 오류가 있어요"}
          backBtn="확인"
          onBackBtnClick={() =>
            setIsDialogOpen((prev) => ({ ...prev, error: !prev.error }))
          }
        />
      )}
      {isDialogOpen.done && (
        <Dialog
          icon={<DialogCheckIcon />}
          title={"완료되었어요"}
          backBtn="확인"
          onBackBtnClick={() => {
            queryClient.invalidateQueries({
              queryKey: ["adminList"],
              exact: false,
            });
            setIsDialogOpen((prev) => ({ ...prev, done: !prev.done }));
          }}
        />
      )}
    </>
  );
}
