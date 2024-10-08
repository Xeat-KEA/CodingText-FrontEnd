import { MouseEvent, useState } from "react";
import { SendMessageIcon, SettingIcon } from "./Icons";
import ToggleBtn from "@/app/_components/ToggleBtn";
import { useCodingTestStore } from "@/app/stores";

export default function ChatInput() {
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const onSettingClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsSettingOpen((prev) => !prev);
  };

  // 채팅 관련 설정 전역 변수
  const { checkAnswerOnly, setCheckAnswerOnly, sendWithCode, setSendWithCode } =
    useCodingTestStore();

  return (
    <form className="relative last:w-full flex items-center px-4 py-2 gap-3 bg-white border border-border-2 rounded-full">
      <button onClick={onSettingClick}>
        <SettingIcon />
      </button>
      <input
        className="outline-none grow text-black"
        type="text"
        placeholder="AI에게 궁금한 점을 자유롭게 질문해보세요!"
      />
      <button className="flex justify-center items-center w-9 h-9 rounded-full bg-primary">
        <SendMessageIcon />
      </button>
      {isSettingOpen && (
        <div className="flex flex-col gap-3 px-5 py-4 rounded-lg shadow-1 bg-white absolute left-0 bottom-[calc(100%+8px)]">
          <ToggleBtn
            content="정답 여부만 확인"
            state={checkAnswerOnly}
            onClick={setCheckAnswerOnly}
          />
          <ToggleBtn
            content="코드와 함께 질문"
            state={sendWithCode}
            onClick={setSendWithCode}
          />
        </div>
      )}
    </form>
  );
}
