"use client";

import { Splitter, SplitterPanel } from "primereact/splitter";
import ChatInput from "../../_components/ChatInput";
import CodeEditPanel from "../../_components/CodeEditPanel";
import { useCodingTestStore } from "@/app/stores";
import NewPostPanel from "../../_components/NewPostPanel";
import DOMPurify from "isomorphic-dompurify";
import { useEffect, useRef, useState } from "react";
import { Chat, ChatInputForm } from "../../_interface/interfaces";
import { useCheckToken } from "@/app/_hooks/useCheckToken";
import api from "@/app/_api/config";
import { useBase64 } from "@/app/_hooks/useBase64";

export default function CodingTestPage() {
  // 로그인 여부 확인
  const {} = useCheckToken(true);

  const { isPosting } = useCodingTestStore();
  const [chatData, setChatData] = useState<Chat[]>([]);

  // 프로토타입 API 문제 정보 GET
  useEffect(() => {
    api.get("/code/1").then((res) => {
      const result = res.data.data;
      const decodedResult = useBase64("decode", result.content);
      setChatData((prev) => {
        // 초기 채팅 데이터가 React Strict Mode로 인해 2번 들어가는 것을 방지
        if (prev.length === 0) {
          return [...prev, { role: "gpt", content: decodedResult }];
        } else {
          return prev;
        }
      });
    });
  }, []);

  // 유저 채팅 입력 시 GPT에게 POST
  const onSubmit = (data: ChatInputForm) => {
    setChatData((prev) => [...prev, { role: "user", content: data.content }]);

    // ChatGPT에 조건에 맞게 POST
    if (data.correctOrNot) {
    } else if (data.sendWithCode) {
    }

    // ChatGPT에서 받아온 결과 채팅에 반영
    setChatData((prev) => [
      ...prev,
      {
        role: "gpt",
        content:
          "Python에서는 자바의 System.out.println()과 동일한 기능을 하는 문법으로 print() 함수를 사용하면 됩니다.",
      },
    ]);
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
                  : "bg-primary font-bold self-end !text-white whitespace-pre-wrap"
              }`}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(chat.content),
              }}
            />
          ))}
        </div>
        {/* 채팅 입력칸 */}
        <div className="px-6 pb-8 pt-2">
          <ChatInput onSubmit={onSubmit} />
        </div>
      </SplitterPanel>
      {/* 작성 관련 공간 */}
      <SplitterPanel className="flex">
        {!isPosting ? <CodeEditPanel /> : <NewPostPanel />}
      </SplitterPanel>
    </Splitter>
  );
}
