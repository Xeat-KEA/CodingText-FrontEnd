"use client";

import {
  useCodingTestStore,
  useTiptapStore,
  useWindowSizeStore,
} from "@/app/stores";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/app/_components/LoadingSpinner";
import { PROGRAMMING_LANGUAGES } from "@/app/_constants/constants";
import { useCheckToken } from "@/app/_hooks/useCheckToken";
import SplittedContainer from "../../_components/SplittedContainer";
import UnsplittedContainer from "../../_components/UnsplittedContainer";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import api from "@/app/_api/config";
import { useParams } from "next/navigation";
import { useBase64 } from "@/app/_hooks/useBase64";
import { useInView } from "react-intersection-observer";

export default function CodingTestPage() {
  const { accessToken, isTokenSet } = useCheckToken();
  const { id } = useParams();

  // 필요한 전역변수 선언
  const {
    setIsPosting,
    setValue,
    setLanguage,
    setCompiledResult,
    setCompileError,
    setSubmitResult,
    setIsRunning,
    setHasSolved,
  } = useCodingTestStore();
  const { setContent } = useTiptapStore();
  // 페이지 진입 시 전역변수 초기화
  useEffect(() => {
    setIsPosting(false);
    setValue("");
    setContent("");
    setCompileError("");
    setCompiledResult([]);
    setIsRunning(false);
    setSubmitResult([]);
    setLanguage(PROGRAMMING_LANGUAGES[0]);
  }, []);

  const { windowSize } = useWindowSizeStore();

  // 문제 정보
  const [historyId, setHistoryId] = useState();
  const [codeContent, setCodeContent] = useState("");
  const fetchCodeInfo = async () => {
    if (isTokenSet === true) {
      if (accessToken) {
        const { data } = await api.get(
          `/code-bank-service/code/history/user/${id}`,
          {
            headers: { Authorization: accessToken },
          }
        );
        setHistoryId(data.historyId);
        setCodeContent(useBase64("decode", data.code_Content));
        setHasSolved(data.correct);
        setValue(useBase64("decode", data.codeHistory_writtenCode));
        return data;
      } else {
        const { data } = await api.get(
          `/code-bank-service/code/non/lists/${id}`
        );
        setCodeContent(useBase64("decode", data.content));
        return data;
      }
    }
  };
  const { data: codeInfo } = useQuery({
    queryKey: ["codeInfo", isTokenSet],
    queryFn: fetchCodeInfo,
  });

  // 채팅 정보
  const fetchChats = async ({ pageParam }: { pageParam?: number }) => {
    if (historyId) {
      const { data } = await api.get(
        `/code-llm-service/llm/history/${historyId}`,
        {
          params: { page: pageParam, size: 5 },
          headers: { Authorization: accessToken },
        }
      );
      return data.data;
    } else {
      return null;
    }
  };
  // 무한스크롤 데이터 가져오기
  const {
    data: chats,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["chats", historyId],
    queryFn: fetchChats,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return undefined;
    },
  });

  // 무한스크롤 트리거
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
      {codeInfo && windowSize ? (
        windowSize >= 768 ? (
          <SplittedContainer
            content={codeContent}
            // chats={chats}
          />
        ) : (
          <UnsplittedContainer
            content={codeContent}
            // chats={chats}
          />
        )
      ) : (
        <div className="w-screen h-screen">
          <LoadingSpinner />
        </div>
      )}
    </>
  );
}
