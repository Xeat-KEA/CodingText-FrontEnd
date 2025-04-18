import { SmDeleteIcon } from "@/app/(blog)/_components/Icons";
import { SmCheckIcon } from "./Icons";
import { useState } from "react";
import Dialog from "@/app/_components/Dialog";
import { Admin } from "../_interfaces/interfaces";
import api from "@/app/_api/config";
import { useTokenStore } from "@/app/stores";
import { useQueryClient } from "@tanstack/react-query";
import AdminResponseDialogs from "./AdminResponseDialogs";

export default function AdminRequestCard({ id, email }: Admin) {
  const { accessToken } = useTokenStore();

  const [isDialogOpen, setIsDialogOpen] = useState({
    approve: false,
    deny: false,
    error: false,
    done: false,
  });

  const queryClient = useQueryClient();
  const onApprove = async () => {
    try {
      // 관리자 승인 POST 필요
      const response = await api.post(
        "/admin-service/admins/permit",
        { adminId: id, isPermit: true },
        { headers: { Authorization: accessToken } }
      );
      setIsDialogOpen({
        approve: false,
        deny: false,
        error: false,
        done: true,
      });
    } catch (err) {
      setIsDialogOpen((prev) => ({ ...prev, error: !prev.error }));
    }
  };

  const onDeny = async () => {
    try {
      // 관리자 거절 POST 필요
      const response = await api.post(
        "/admin-service/admins/permit",
        { adminId: id, isPermit: false },
        { headers: { Authorization: accessToken } }
      );
      setIsDialogOpen({
        approve: false,
        deny: false,
        error: false,
        done: true,
      });
    } catch (err) {
      setIsDialogOpen((prev) => ({ ...prev, error: !prev.error }));
    }
  };

  const onError = () =>
    setIsDialogOpen((prev) => ({ ...prev, error: !prev.error }));

  const onDone = () => {
    queryClient.invalidateQueries({
      queryKey: ["adminList"],
      exact: false,
    });
    setIsDialogOpen((prev) => ({ ...prev, done: !prev.done }));
  };

  return (
    <>
      <div className="w-full p-2 flex gap-4 justify-between items-center">
        <div className="w-full grow text-sm text-black">{email}</div>
        <div className="flex gap-4">
          <div className="w-[45px] flex-center">
            <button
              onClick={() =>
                setIsDialogOpen((prev) => ({ ...prev, approve: !prev.approve }))
              }
              className="flex-center gap-1"
            >
              <SmCheckIcon />
              <span className="text-xs font-semibold text-green">승인</span>
            </button>
          </div>
          <div className="w-[45px] flex-center">
            <button
              onClick={() =>
                setIsDialogOpen((prev) => ({
                  ...prev,
                  deny: !prev.deny,
                }))
              }
              className="flex-center gap-1"
            >
              <SmDeleteIcon />
              <span className="text-xs font-semibold text-red">거부</span>
            </button>
          </div>
        </div>
      </div>
      {isDialogOpen.approve && (
        <Dialog
          title={`'${email}' 님의\n관리자 가입 신청을 승인할까요?`}
          isTitleSm
          backBtn="취소"
          onBackBtnClick={() =>
            setIsDialogOpen((prev) => ({ ...prev, approve: !prev.approve }))
          }
          primaryBtn="승인"
          onBtnClick={onApprove}
        />
      )}
      {isDialogOpen.deny && (
        <Dialog
          title={`'${email}' 님의\n관리자 가입 신청을 거부할까요?`}
          isTitleSm
          backBtn="취소"
          onBackBtnClick={() =>
            setIsDialogOpen((prev) => ({ ...prev, deny: !prev.deny }))
          }
          redBtn="거부"
          onBtnClick={onDeny}
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
