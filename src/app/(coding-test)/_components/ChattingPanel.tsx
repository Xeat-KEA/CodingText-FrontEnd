import api from "@/app/_api/config";
import { useQuery } from "@tanstack/react-query";
import DOMPurify from "isomorphic-dompurify";
import ChatInput from "./ChatInput";
import { useEffect, useRef, useState } from "react";
import { Chat, ChatInputForm } from "../_interface/interfaces";

export default function ChattingPanel() {
  const [dummyData, setDummyData] = useState<Chat[]>([
    {
      content:
        "<h3>혼자 남지 않기 위한 최적의 경로 찾기</h3>\n\n<p>이 문제는 '혼자 남지 않기 위한 최적의 경로 찾기'를 목표로 합니다. 주어진 2차원 격자에서 특정 조건을 만족하며 목적지에 도달하기 위한 행동을 결정해야 합니다. 주어진 조건을 만족하는 함수를 작성하고, 격자를 탐색하는 중 최대한의 안전성을 확보해야 합니다.</p>\n\n<h4>문제 설명:</h4>\n<p>이 문제는 특정 시작점에서 목적지까지 '혼자 남지 않기' 위한 최적의 경로를 찾아야 합니다. 2차원 격자에서는 특정 위치로 이동할 때 1의 스탭이 소요되며, 각 위치에서 움직일 수 있는 최대 경로 수를 제한하여 주어질 것입니다. 주어진 조건하에서 최단 경로를 결정해야 하며, 경로에 존재하는 위험 요소를 피하면서 격자를 탐색해야 합니다.</p>\n\n<h4>문제 제한 사항:</h4>\n<ul>\n<li>격자 크기: M x N (1 ≤ M, N ≤ 100)</li>\n<li>시작점: 출발 위치는 (0,0)으로 고정되어 있습니다.</li>\n<li>목적지: 목적지는 항상 오른쪽 아래 모서리 (M-1, N-1)입니다.</li>\n<li>위험 요소는 격자 내 임의의 위치에 존재할 수 있으며, 이를 피하는 것이 중요합니다.</li>\n</ul>\n\n<h4>입력 예시:</h4>\n<pre><code>\n5 5\n0 0 0 0 0\n0 -1 0 -1 0\n0 0 0 -1 0\n0 -1 -1 0 -1\n0 0 0 0 0\n</code></pre>\n\n<h4>출력 예시:</h4>\n<pre><code>\n7\n</code></pre>\n\n<h4>입출력 예 설명:</h4>\n<p>주어진 격자에서 (0,0)에서 (4,4)까지 가장 적은 스탭으로 이동하기 위한 경로는 7스탭 입니다. 중간에 -1은 이동할 수 없는 위치이며, 다른 안전한 경로를 찾아야 합니다.</p>",
      role: "gpt",
    },
  ]);

  // 문제 정보 GET (자체 제공 문제)
  const fetchChats = async () => {
    /* 
    const response = await api.get("/coding-test");
    return response.data; */
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
