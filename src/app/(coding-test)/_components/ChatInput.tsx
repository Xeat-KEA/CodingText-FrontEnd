import { MouseEvent, useEffect, useState } from "react";
import { SendMessageIcon, SettingIcon } from "./Icons";
import ToggleBtn from "@/app/_components/ToggleBtn";
import { useForm } from "react-hook-form";
import { ChatInputForm, ChatInputProps } from "../_interface/interfaces";

export default function ChatInput({ onSubmit }: ChatInputProps) {
  const { register, handleSubmit, setValue } = useForm<ChatInputForm>();
  const onValid = (data: ChatInputForm) => {
    onSubmit(data);
    setValue("content", "");
  };

  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const onSettingClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsSettingOpen((prev) => !prev);
  };

  // 채팅 관련 설정 변수
  const [correctOrNot, setCorrectOrNot] = useState(false);
  const [sendWithCode, setSendWithCode] = useState(false);
  useEffect(() => {
    setValue("correctOrNot", correctOrNot);
    setValue("sendWithCode", sendWithCode);
  }, [correctOrNot, sendWithCode]);

  return (
    <form
      onSubmit={handleSubmit(onValid)}
      className="relative last:w-full flex items-center px-4 py-2 gap-3 bg-white border border-border-2 rounded-full"
    >
      <button type="button" onClick={onSettingClick}>
        <SettingIcon />
      </button>
      <input
        {...register("content", { required: true })}
        className="outline-none grow text-black"
        type="text"
        placeholder="AI에게 궁금한 점을 자유롭게 질문해보세요!"
        autoComplete="off"
      />
      <button
        type="submit"
        className="flex justify-center items-center w-9 h-9 rounded-full bg-primary"
      >
        <SendMessageIcon />
      </button>
      {isSettingOpen && (
        <div className="flex flex-col gap-3 px-5 py-4 rounded-lg shadow-1 bg-white absolute left-0 bottom-[calc(100%+8px)]">
          <ToggleBtn
            content="정답 여부만 확인"
            state={correctOrNot}
            onClick={() => setCorrectOrNot((prev) => !prev)}
          />
          <ToggleBtn
            content="코드와 함께 질문"
            state={sendWithCode}
            onClick={() => setSendWithCode((prev) => !prev)}
          />
        </div>
      )}
    </form>
  );
}
