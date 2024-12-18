import { useQueryClient } from "@tanstack/react-query";
import { AdminResponseDialogsProps } from "../_interfaces/interfaces";
import { DialogCheckIcon, DialogXIcon } from "@/app/_components/Icons";
import Dialog from "@/app/_components/Dialog";

export default function AdminResponseDialogs({
  isDone,
  isError,
  onDone,
  onError,
}: AdminResponseDialogsProps) {
  return (
    <>
      {isError && (
        <Dialog
          icon={<DialogXIcon />}
          title={"요청이\n거부되었어요"}
          content={"권한이 없거나\n서버에 오류가 있어요"}
          backBtn="확인"
          onBackBtnClick={onError}
        />
      )}
      {isDone && (
        <Dialog
          icon={<DialogCheckIcon />}
          title={"완료되었어요"}
          backBtn="확인"
          onBackBtnClick={onDone}
        />
      )}
    </>
  );
}
