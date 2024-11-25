import api from "@/app/_api/config";
import { useQuery } from "@tanstack/react-query";
import ChatInput from "./ChatInput";
import { useEffect, useRef, useState } from "react";
import { Chat, ChatInputForm } from "../_interface/interfaces";
import { useCheckToken } from "@/app/_hooks/useCheckToken";
import ChatBubble from "./ChatBubble";

export default function ChattingPanel() {
  const { token, isLoaded } = useCheckToken();
  const [dummyData, setDummyData] = useState<Chat[]>([
    { content: "hi", role: "gpt" },
    { content: "hi", role: "gpt" },
    { content: "hi", role: "gpt" },
    { content: "hi", role: "gpt" },
    { content: "hi", role: "gpt" },
    { content: "hi", role: "gpt" },
    { content: "hi", role: "gpt" },
    { content: "hi", role: "gpt" },
  ]);

  // 문제 정보 GET (자체 제공 문제)
  const fetchChats = async () => {
    if (isLoaded) {
      if (token !== "") {
        // api 호출부 추가 필요
        return null;
      } else {
        // 비로그인 시 문제만 GET
        const response = await api.get("/code-bank-service/code/non/lists/1", {
          headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}` },
        });
        return response.data;
      }
    }
  };
  const { data, isLoading } = useQuery({
    queryKey: ["chats", isLoaded],
    queryFn: fetchChats,
  });

  console.log(data, isLoaded);

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
    <>
      <div
        ref={chatContainerRef}
        className="max-md:h-[400px] grow flex flex-col px-6 py-8 gap-6 overflow-y-auto bg-primary-2"
      >
        {token ? (
          <>
            {dummyData?.map((chat, index) => (
              <ChatBubble key={index} role={chat.role} content={chat.content} />
            ))}
            {/* ChatGPT가 채팅 반환 시 일시적 표시되는 스켈레톤 말풍선 */}
            {isLoading && <div className="bubble bg-white">......</div>}
          </>
        ) : (
          <>{data && <ChatBubble role="gpt" content={data.content} />}</>
        )}
      </div>
      {/* 채팅 입력칸 */}
      {token && <ChatInput onSubmit={onSubmit} />}
    </>
  );
}
