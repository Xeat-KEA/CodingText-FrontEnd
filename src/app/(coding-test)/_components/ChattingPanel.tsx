import api from "@/app/_api/config";
import { useQuery } from "@tanstack/react-query";
import ChatInput from "./ChatInput";
import { useEffect, useRef, useState } from "react";
import { Chat, ChatInputForm } from "../_interface/interfaces";
import ChatBubble from "./ChatBubble";
import { useTokenStore } from "@/app/stores";
import LoadingAnimation from "@/app/_components/LoadingAnimation";

export default function ChattingPanel() {
  const { accessToken, isTokenSet } = useTokenStore();
  const [dummyData, setDummyData] = useState<Chat[]>([
    {
      content:
        "<h3>Balanced Parentheses</h3>\n\n<p>In this problem, you must determine if the parentheses in an input string are balanced. A string is considered balanced if every opening parenthesis ‘(’ has a matching closing parenthesis ‘)’, and the pairs are correctly nested.</p>\n\n<h4>문제 설명:</h4>\n<p>귀하의 임무는 주어진 문자열에 포함된 괄호가 올바르게 쌍을 이루고 있는지를 확인하는 것입니다. 올바른 문자열이란 모든 여는 괄호 ‘(’가 닫는 괄호 ‘)’와 쌍을 이루고, 괄호 쌍이 제대로 중첩되는 경우입니다.</p>\n\n<h4>문제 제약 사항:</h4>\n<ul>\n  <li>입력 문자열은 괄호 이외의 문자도 포함될 수 있습니다.</li>\n  <li>괄호는 (), {}, [] 세 종류가 포함됩니다.</li>\n</ul>\n\n<h4>입력 예시:</h4>\n<pre><code>(){}[]\n([{}])\n({[})\n</code></pre>\n\n<h4>출력 예시:</h4>\n<pre><code>true\ntrue\nfalse\n</code></pre>\n\n<h4>입출력 예 설명:</h4>\n<p>첫 번째 예에서 모든 괄호 쌍은 올바른 순서로 배치되어 있으며 중첩이 없습니다. 두 번째 예에서는 세 쌍이 중첩되어 있지만 여전히 올바르게 닫힙니다. 세 번째 예에서는 중괄호가 일치하지 않아서 체크 시 false가 반환됩니다.</p>",
      role: "gpt",
    },
  ]);

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
  const [dummyResponse, setDummyResponse] = useState("");
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
    setIsLoading(true);
    // 실제 api 호출 시 데이터 형식 수정 필요
    setTimeout(() => {
      const response =
        "Python에서 출력을 위해 가장 기본적으로 사용하는 함수는 **print()**입니다.";
      setDummyData((prev) => [...prev, { content: response, role: "gpt" }]);
      setIsLoading(false);
    }, 2000);
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
  }, [data, dummyData]);

  return (
    <>
      <div
        ref={chatContainerRef}
        className="max-md:h-[400px] grow flex flex-col px-6 py-8 gap-6 overflow-y-auto bg-primary-2"
      >
        {accessToken ? (
          // 로그인 시 문제 + 이전 채팅 목록 출력
          <>
            {dummyData?.map((chat, index) => (
              <ChatBubble key={index} role={chat.role} content={chat.content} />
            ))}
            {/* ChatGPT가 채팅 반환 시 일시적 표시되는 스켈레톤 말풍선 */}
            {isLoading && (
              <div className="ml-4">
                <LoadingAnimation />
              </div>
            )}
          </>
        ) : (
          // 비로그인 시 문제만 출력
          <>
            {dummyData && (
              <ChatBubble role="gpt" content={dummyData[0].content} />
            )}
          </>
        )}
      </div>
      {/* 채팅 입력칸 */}
      {accessToken && <ChatInput onSubmit={onSubmit} />}
    </>
  );
}
