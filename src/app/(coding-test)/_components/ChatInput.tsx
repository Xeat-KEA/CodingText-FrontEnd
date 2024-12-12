import { MouseEvent, useEffect, useRef, useState } from "react";
import { SendMessageIcon, SettingIcon } from "./Icons";
import ToggleBtn from "@/app/_components/ToggleBtn";
import { useForm } from "react-hook-form";
import { ChatInputForm, ChatInputProps } from "../_interface/interfaces";

export default function ChatInput({ onSubmit }: ChatInputProps) {
  const { register, handleSubmit, setValue, watch } = useForm<ChatInputForm>();
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

  // textarea 높이 자동 조절
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const content = watch("content");
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        72
      )}px`;
    }
  }, [content]);

  return (
    <div className="px-6 pb-8 bg-primary-2 w-full shrink-0 h-[96px] flex flex-col-reverse">
      <form
        onSubmit={handleSubmit(onValid)}
        className="relative last:w-full flex px-4 py-2 gap-3 bg-white border border-border-2 rounded-[27px]"
      >
        <button
          className="self-end mb-1"
          type="button"
          onClick={onSettingClick}
        >
          <SettingIcon />
        </button>
        <textarea
          {...register("content", { required: true })}
          ref={(e) => {
            // register와 ref의 충돌 방지
            textareaRef.current = e;
            register("content").ref(e);
          }}
          className="self-center resize-none grow text-black h-auto"
          rows={1}
          placeholder="AI에게 질문"
          autoComplete="off"
        />
        <button
          type="submit"
          className="self-end flex-center w-8 h-8 rounded-full bg-primary-1"
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
    </div>
  );
}
