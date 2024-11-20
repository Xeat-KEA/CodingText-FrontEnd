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
        '<h3>문제 설명</h3>\n<p>주어진 그래프에서 시작 노드부터 끝 노드까지의 경로를 깊이 우선 탐색(DFS) 알고리즘을 사용하여 찾으세요. 모든 경로 중 최소 비용 경로를 찾아야 합니다. 경로의 비용은 각 경로의 간선 가중치의 합으로 결정됩니다.</p>\n\n<h3>문제 제한 사항</h3>\n<ul>\n<li>그래프는 양방향이며, 노드와 간선은 정수로 표현됩니다.</li>\n<li>모든 간선에는 양의 가중치가 있습니다.</li>\n<li>시작 노드와 끝 노드는 입력으로 주어집니다.</li>\n</ul>\n\n<h3>입력 예시</h3>\n<pre><code>\n6\n0 1 5\n0 2 10\n1 3 8\n2 3 2\n3 4 5\n4 5 2\n0 5\n</code></pre>\n\n<h3>출력 예시</h3>\n<pre><code>\n15\n0 2 3 4 5\n</code></pre>\n\n<h3>입출력 예 설명</h3>\n<p>입력의 첫 번째 줄은 노드의 개수를 나타내며, 다음 줄들은 각 간선을 나타냅니다. 간선은 "노드A 노드B 가중치"의 형태로 주어집니다. 마지막 줄에 시작 노드와 끝 노드가 제공됩니다. 최소 비용 경로의 비용과 해당 경로의 노드 순서를 출력하세요.</p>\n\n<h3>문제 정보</h3>\n<ul>\n<li>알고리즘: 깊이 우선 탐색(DFS)</li>\n<li>난이도: LEVEL4</li>\n<li>추가 사항: 문제 특성상 경로 순회 시 조건에 따른 백트래킹이 필요할 수 있습니다.</li>\n</ul>\n\n<h3>테스트 케이스</h3>\n<ul>\n<li>\n<pre><code><strong>입력:</strong>\n5\n0 1 4\n0 2 2\n1 3 5\n2 3 1\n3 4 3\n0 4\n<strong>출력:</strong>\n6\n0 2 3 4\n</code></pre>\n</li>\n<li>\n<pre><code><strong>입력:</strong>\n4\n0 1 1\n1 2 1\n2 3 1\n0 1\n<strong>출력:</strong>\n1\n0 1\n</code></pre>\n</li>\n<li>\n<pre><code><strong>입력:</strong>\n7\n0 1 6\n0 2 3\n1 2 2\n1 3 4\n2 4 5\n3 5 1\n4 5 3\n0 5\n<strong>출력:</strong>\n10\n0 2 4 5\n</code></pre>\n</li>\n</ul>\\n\\n<h3>입출력 예 :</h3>\n<table>\n  <tr>\n    <th>입력</th>\n    <th>출력</th>\n  </tr>\n<tr><td>6\n0 1 5\n0 2 10\n1 3 8\n2 3 2\n3 4 5\n4 5 2\n0 5\n</td><td>15\n0 2 3 4 5\n</td></tr><tr><td>5\n0 1 4\n0 2 2\n1 3 5\n2 3 1\n3 4 3\n0 4\n</td><td>6\n0 2 3 4\n</td></tr><tr><td>4\n0 1 1\n1 2 1\n2 3 1\n0 1\n</td><td>1\n0 1\n</td></tr><tr><td>7\n0 1 6\n0 2 3\n1 2 2\n1 3 4\n2 4 5\n3 5 1\n4 5 3\n0 5\n</td><td>10\n0 2 4 5\n</td></tr></table>',
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
        className="grow flex flex-col p-6 gap-6 overflow-y-auto"
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
