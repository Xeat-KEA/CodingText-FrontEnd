import { useQuery } from "@tanstack/react-query";
import ChatInput from "./ChatInput";
import { useEffect, useRef, useState } from "react";
import { Chat, ChatInputForm } from "../_interface/interfaces";
import ChatBubble from "./ChatBubble";
import { useTokenStore } from "@/app/stores";
import LoadingAnimation from "@/app/_components/LoadingAnimation";

export default function ChattingPanel({ chats }: { chats?: Chat[] }) {
  const { accessToken, isTokenSet } = useTokenStore();

  // 문제 정보 GET (자체 제공 문제)
  const fetchChats = async () => {
    if (isTokenSet) {
      if (accessToken) {
        // api 호출부 추가 필요
        return null;
      } else {
        // 비로그인 시 문제만 GET
      }
    }
  };
  const { data /* , isLoading */ } = useQuery({
    queryKey: ["chats", isTokenSet],
    queryFn: fetchChats,
  });

  const [isLoading, setIsLoading] = useState(false);
  // 채팅 입력 시 채팅 POST
  /* const onSubmit = async (newChat: ChatInputForm) => {
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
    setIsLoading(true);
    // 실제 api 호출 시 데이터 형식 수정 필요
    setTimeout(() => {
      const response =
        "Python에서 출력을 위해 가장 기본적으로 사용하는 함수는 **print()**입니다.";
      setDummyData((prev) => [...prev, { content: response, role: "gpt" }]);
      setIsLoading(false);
    }, 2000);
  }; */

  /* // 채팅 입력 시 채팅창 아래로 이동
  const chatContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // 처음 문제가 생성될 때는 위에서부터 볼 수 있게 설정
    if (dummyData?.length !== 1) {
      const current = chatContainerRef.current;
      if (current) {
        current.scrollTop = current.scrollHeight;
      }
    }
  }, [data, dummyData]);
 */
  return (
    <div
      // ref={chatContainerRef}
      className="max-md:h-[400px] w-full h-full flex flex-col px-6 py-8 gap-6 overflow-y-auto bg-primary-2 relative"
    >
      {chats?.map((chat, index) => (
        <ChatBubble key={index} role={chat.role} content={chat.content} />
      ))}
      {/* ChatGPT가 채팅 반환 시 일시적 표시되는 스켈레톤 말풍선 */}
      {isLoading && (
        <div className="ml-4">
          <LoadingAnimation />
        </div>
      )}
    </div>
  );
}
