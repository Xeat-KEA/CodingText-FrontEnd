import { useForm } from "react-hook-form";
import { PlusIcon } from "./Icons";
import { SearchUserBarProps } from "../_interfaces/interfaces";
import { useState } from "react";
import Dialog from "@/app/_components/Dialog";
import { DialogXIcon } from "@/app/_components/Icons";

export default function SearchUserBar({
  onAddUser,
  isDisabled,
}: SearchUserBarProps) {
  const { register, handleSubmit, setValue } = useForm<{ nickName: string }>();
  const onValid = ({ nickName }: { nickName: string }) => {
    if (nickName.length === 0) {
      setIsError((prev) => !prev);
    } else {
      onAddUser(nickName);
      setValue("nickName", "");
    }
  };

  const [isError, setIsError] = useState(false);

  return (
    <>
      <form
        onSubmit={handleSubmit(onValid)}
        className={`flex gap-2 w-full max-w-[240px] border border-border-2 rounded-full px-4 py-2 ${
          isDisabled && "bg-bg-1"
        }`}
      >
        <input
          {...register("nickName")}
          className="grow text-xs disabled:bg-bg-1"
          placeholder="추가할 닉네임을 입력해주세요"
          autoComplete="off"
          disabled={isDisabled}
        />
        <button type="submit" disabled={isDisabled}>
          <PlusIcon />
        </button>
      </form>
      {isError && (
        <Dialog
          icon={<DialogXIcon />}
          title="닉네임을 입력해주세요"
          backBtn="확인"
          onBackBtnClick={() => setIsError((prev) => !prev)}
        />
      )}
    </>
  );
}
