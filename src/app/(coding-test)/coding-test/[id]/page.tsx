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
import { usePathname, useSearchParams } from "next/navigation";

export default function CodingTestPage() {
  // 로그인 여부 확인
  const {} = useCheckToken(true);

  const { isPosting } = useCodingTestStore();
  const [chatData, setChatData] = useState<Chat[]>([]);
  // ChatGPT 채팅 반환 지연 시 스켈레톤 ui 표시용 state
  const [isLoading, setIsLoading] = useState(false);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 프로토타입 API 문제 정보 GET (자체 제공 문제)
  useEffect(() => {
    if (!pathname.startsWith("/coding-test/ai")) {
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
    }
  }, []);

  // 프로토타입 API 문제 정보 POST (ChatGPT AI 문제)
  useEffect(() => {
    if (pathname.startsWith("/coding-test/ai")) {
      if (searchParams.get("chatMessage") !== null) {
        // param에서 문제 요구사항 추출
        const chatMessage = searchParams.get("chatMessage")!;
        // 로딩 state 갱신으로 스켈레톤 UI 출력
        setIsLoading(true);
        api
          .post("/chat", { chatMessage: chatMessage })
          .then((res) => {
            const result = res.data.answer;
            const decodedMessage = useBase64("decode", result);

            // ChatGPT에서 받아온 결과 채팅에 반영 및 로딩 종료
            setChatData((prev) => {
              // 초기 채팅 데이터가 React Strict Mode로 인해 2번 들어가는 것을 방지
              if (prev.length === 0) {
                return [...prev, { role: "gpt", content: decodedMessage }];
              } else {
                return prev;
              }
            });
          })
          .then(() => setIsLoading(false)); // API 작업 종료 후 로딩 state 갱신
      }
    }
  }, []);

  // 유저 채팅 입력 시 GPT에게 POST
  const onSubmit = (data: ChatInputForm) => {
    // 채팅 화면에 출력 및 GPT 채팅 로딩 시작
    setChatData((prev) => [...prev, { role: "user", content: data.content }]);
    setIsLoading(true);

    // ChatGPT에 조건에 맞게 POST
    if (data.correctOrNot) {
    } else if (data.sendWithCode) {
    }

    // ChatGPT에서 받아온 결과 채팅에 반영 및 로딩 종료
    api
      .post("/chat", { chatMessage: data.content })
      .then((res) => {
        const result = res.data.answer;
        const decodedMessage = useBase64("decode", result);

        // ChatGPT에서 받아온 결과 채팅에 반영 및 로딩 종료
        setChatData((prev) => {
          // 초기 채팅 데이터가 React Strict Mode로 인해 2번 들어가는 것을 방지
          if (prev.length === 0) {
            return [...prev, { role: "gpt", content: decodedMessage }];
          } else {
            return prev;
          }
        });
      })
      .then(() => setIsLoading(false)); // API 작업 종료 후 로딩 state 갱신
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
          {/* ChatGPT가 채팅 반환 시 일시적 표시되는 스켈레톤 말풍선 */}
          {isLoading && <div className="bubble bg-white">......</div>}
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
