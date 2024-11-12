import api from "@/app/_api/config";
import { useQuery } from "@tanstack/react-query";
import DOMPurify from "isomorphic-dompurify";
import ChatInput from "./ChatInput";
import { useEffect, useRef, useState } from "react";
import { Chat, ChatInputForm } from "../_interface/interfaces";

export default function ChattingPanel() {
  const [dummyData, setDummyData] = useState<Chat[]>([
    { content: "hi", role: "gpt" },
  ]);

  // 문제 정보 GET (자체 제공 문제)
  const fetchChats = async () => {
    const response = await api.get("/coding-test");
    return response.data;
  };
  const { data, isLoading } = useQuery({
    queryKey: ["chats"],
    queryFn: fetchChats,
  });

  // 채팅 입력 시 채팅 POST
  const onSubmit = async (newChat: ChatInputForm) => {
    // 정답 여부만 확인 체크 시
    if (newChat.correctOrNot) {
    }
    // 코드와 함께 질문 체크 시
    if (newChat.sendWithCode) {
    }
    setDummyData((prev) => [
      ...prev,
      { content: newChat.content, role: "user" },
    ]);
    // 실제 api 호출 시 데이터 형식 수정 필요
    const response: string = await api.post("/coding-test", { data: newChat });
    setDummyData((prev) => [...prev, { content: response, role: "gpt" }]);
  };

  // 채팅 입력 시 채팅창 아래로 이동
  const chatContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // 처음 문제가 생성될 때는 위에서부터 볼 수 있게 설정
    if (dummyData?.length !== 1) {
      const current = chatContainerRef.current;
      if (current) {
        current.scrollTop = current.scrollHeight;
      }
    }
  }, [data]);

  return (
    <div className="flex flex-col bg-bg-1 h-full max-md:h-[70vh]">
      <div
        ref={chatContainerRef}
        className="grow flex flex-col px-6 py-8 gap-6 overflow-y-auto"
      >
        {dummyData?.map((chat, index) => (
          <div
            key={index}
            className={`bubble ${
              chat.role === "gpt"
                ? "bg-white"
                : "bg-primary-1 font-bold self-end !text-white whitespace-pre-wrap"
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
      <ChatInput onSubmit={onSubmit} />
    </div>
  );
}
