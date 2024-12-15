import { ChatsResponse, NewChat } from "../_interface/interfaces";
import ChatBubble from "./ChatBubble";
import { useChatStore, useTokenStore } from "@/app/stores";
import LoadingAnimation from "@/app/_components/LoadingAnimation";
import { useInView } from "react-intersection-observer";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import api from "@/app/_api/config";

export default function ChattingPanel({
  newChats,
  historyId,
}: {
  newChats?: NewChat[];
  historyId?: number;
}) {
  const { isTokenSet, accessToken } = useTokenStore();
  const { isLoading } = useChatStore();
  // 채팅 정보
  const fetchChats = async ({
    pageParam,
  }: {
    pageParam?: number;
  }): Promise<ChatsResponse> => {
    const response = await api.get(
      `/code-llm-service/llm/history/${historyId}`,
      {
        params: { page: pageParam },
        headers: { Authorization: accessToken },
      }
    );
    return response.data.data;
  };
  // 무한스크롤 데이터 가져오기
  const {
    data: chats,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
  } = useInfiniteQuery({
    queryKey: ["chats", isTokenSet, historyId],
    queryFn: fetchChats,
    initialPageParam: -1,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage) {
        return undefined;
      }
      if (lastPage?.firstPage) {
        return undefined;
      }
      return lastPage?.currentPage - 1;
    },
    enabled: !!accessToken && !!historyId,

    // 데이터 평탄화
    select: (data) =>
      data.pages
        .slice()
        .reverse()
        .flatMap((page) => page.chatResponseList),
  });

  // 무한스크롤 트리거
  const { ref, inView } = useInView();
  const [prevScrollHeight, setPrevScrollHeight] = useState(0);
  useEffect(() => {
    if (inView) {
      setPrevScrollHeight(panelRef.current?.scrollHeight || 0);
      fetchNextPage();
    }
  }, [inView]);

  const panelRef = useRef<HTMLDivElement>(null);
  // chats 데이터가 업데이트될 때 자동으로 가장 아래로 스크롤
  useEffect(() => {
    if (!isPending) {
      setPrevScrollHeight(panelRef.current?.scrollHeight || 0);
      if (panelRef.current) {
        panelRef.current.scrollTo({
          top: panelRef.current.scrollHeight,
        });
      }
    }
  }, [isPending, newChats]);

  // 채팅 데이터 추가 시 스크롤 복원
  useLayoutEffect(() => {
    if (panelRef.current) {
      const currentScrollHeight = panelRef.current.scrollHeight;
      const scrollOffset = currentScrollHeight - prevScrollHeight;
      panelRef.current.scrollTop += scrollOffset;
    }
  }, [isFetchingNextPage, chats]);

  return (
    <div
      ref={panelRef}
      className="max-md:h-[400px] w-full h-full flex flex-col px-6 py-8 gap-6 overflow-y-auto bg-primary-2 relative"
    >
      {!isPending && hasNextPage && (
        // 노출 시 다음 데이터 fetch
        <div ref={ref} className="w-full h-10 flex-center">
          <LoadingAnimation />
        </div>
      )}
      {!isPending &&
        chats?.length !== 0 &&
        chats?.map((chat) => (
          <div className="flex flex-col gap-6" key={chat.chatHistoryId}>
            <ChatBubble role="user" content={chat.question} />
            <ChatBubble role="gpt" content={chat.answer} />
          </div>
        ))}
      {newChats?.map((chat, index) => (
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
