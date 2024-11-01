import Dialog from "@/app/_components/Dialog";
import { DialogXIcon } from "@/app/_components/Icons";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NoticeFormContainerProps } from "../_interfaces/interfaces";

export default function NoticeFormContainer({
  onSubmit,
  isDone,
}: NoticeFormContainerProps) {
  const { register, handleSubmit, setValue } = useForm<{ notice: string }>();
  const onValid = ({ notice }: { notice: string }) => {
    if (notice.length === 0) {
      setIsError((prev) => !prev);
    } else {
      onSubmit(notice);
    }
  };

  const [isError, setIsError] = useState(false);

  // 공지사항 전달 완료 시 textarea 초기화
  useEffect(() => {
    if (isDone) {
      setValue("notice", "");
    }
  }, [isDone]);
  return (
    <>
      <form onSubmit={handleSubmit(onValid)} className="flex flex-col gap-4">
        <div className="edit-container">
          <span className="edit-title">공지사항</span>
          <textarea
            {...register("notice")}
            className="sign-in-input resize-none h-[120px]"
          />
        </div>
        <button className="sm-btn-primary w-fit self-end" type="submit">
          공지사항 전달
        </button>
      </form>
      {/* 공지사항에 값이 없을 경우 */}
      {isError && (
        <Dialog
          icon={<DialogXIcon />}
          title="공지사항을 입력해주세요"
          backBtn="확인"
          onBackBtnClick={() => setIsError((prev) => !prev)}
        />
      )}
    </>
  );
}
