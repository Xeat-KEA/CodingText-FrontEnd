"use client";

import { Splitter, SplitterPanel } from "primereact/splitter";
import { DUMMY_CHATS } from "../../_constants/constants";
import ChatInput from "../../_components/ChatInput";
import CodeEditPanel from "../../_components/CodeEditPanel";
import { useCodingTestStore } from "@/app/stores";
import NewPostPanel from "../../_components/NewPostPanel";
import DOMPurify from "isomorphic-dompurify";
import { useEffect, useRef, useState } from "react";
import { Chat, ChatInputForm } from "../../_interface/interfaces";
import { useCheckToken } from "@/app/_hooks/useCheckToken";

export default function CodingTestPage() {
  // 로그인 여부 확인
  const {} = useCheckToken(true);

  const { isPosting } = useCodingTestStore();
  const [chatData, setChatData] = useState<Chat[]>([]);

  // 채팅 기록 초기 불러오기
  useEffect(() => {
    setChatData(DUMMY_CHATS);
  }, []);

  // 유저 채팅 입력 시 GPT에게 POST
  const onSubmit = (data: ChatInputForm) => {
    // ChatGPT에 POST
    if (data.correctOrNot) {
    } else if (data.sendWithCode) {
    }

    setChatData((prev) => [...prev, { role: "user", content: data.content }]);
  };

  // 채팅 입력 시 채팅창 아래로 이동
  const chatContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // 처음 문제가 생성될 때는 위에서부터 볼 수 있게 설정
    if (chatData.length !== 1) {
      const current = chatContainerRef.current;
      if (current) {
        current.scrollTop = current.scrollHeight;
      }
    }
  }, [chatData]);

  return (
    <Splitter className="w-full h-screen pt-16 flex">
      {/* 채팅창 공간 */}
      <SplitterPanel className="bg-bg-1 flex flex-col">
        {/* 메세지 표시 공간 */}
        <div
          ref={chatContainerRef}
          className="grow flex flex-col px-6 py-8 gap-6 overflow-y-auto"
        >
          {chatData?.map((chat, index) => (
            <div
              key={index}
              className={`bubble ${
                chat.role === "gpt"
                  ? "bg-white"
                  : "bg-primary font-bold self-end !text-white"
              }`}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(chat.content),
              }}
            />
          ))}
        </div>
        {/* 채팅 입력칸 */}
        <div className="px-6 pb-8">
          <ChatInput onSubmit={onSubmit} />
        </div>
      </SplitterPanel>
      {/* 작성 관련 공간 */}
      <SplitterPanel className="flex w-full">
        {!isPosting ? <CodeEditPanel /> : <NewPostPanel />}
      </SplitterPanel>
    </Splitter>
  );
}
