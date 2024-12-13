import { MouseEvent, useEffect, useRef, useState } from "react";
import { SendMessageIcon, SettingIcon } from "./Icons";
import ToggleBtn from "@/app/_components/ToggleBtn";
import { useForm } from "react-hook-form";
import { ChatInputForm, ChatInputProps } from "../_interface/interfaces";
import { useChatStore, useCodingTestStore, useTokenStore } from "@/app/stores";
import api from "@/app/_api/config";

export default function ChatInput({ historyId }: { historyId?: number }) {
  const { register, handleSubmit, setValue, watch } = useForm<ChatInputForm>();
  const { newChats, setNewChats, setIsLoading } = useChatStore();
  const { value, language } = useCodingTestStore();
  const { accessToken } = useTokenStore();
  const onValid = async (data: ChatInputForm) => {
    const tempChats = [...newChats, { role: "user", content: data.content }];
    setNewChats(tempChats);
    setIsLoading(true);
    setValue("content", "");
    try {
      const requestBody = {
        chatMessage: `${sendWithCode ? `${value}\n` : ""}${data.content}`,
        codeHistoryId: historyId,
        codeLanguage: language.content,
        codingTestContent: content,
        isIncludingAnswer: isIncludingAnswer,
      };
      const response = await api.post(
        "/code-llm-service/llm/chat",
        requestBody,
        {
          headers: { Authorization: accessToken },
        }
      );
      setNewChats([
        ...tempChats,
        { role: "gpt", content: response.data.data.answer },
      ]);
      setIsLoading(false);
    } catch {
      setIsLoading(false);
    }
  };

  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const onSettingClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsSettingOpen((prev) => !prev);
  };

  // 채팅 관련 설정 변수
  const {
    isIncludingAnswer,
    setIsIncludingAnswer,
    sendWithCode,
    setSendWithCode,
  } = useChatStore();

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
              content="정답 정보를 포함"
              state={isIncludingAnswer}
              onClick={() => setIsIncludingAnswer(!isIncludingAnswer)}
            />
            <ToggleBtn
              content="코드와 함께 질문"
              state={sendWithCode}
              onClick={() => setSendWithCode(!sendWithCode)}
            />
          </div>
        )}
      </form>
    </div>
  );
}
