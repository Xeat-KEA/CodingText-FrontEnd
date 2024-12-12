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
import { Chat } from "../../_interface/interfaces";
import SplittedContainer from "../../_components/SplittedContainer";
import UnsplittedContainer from "../../_components/UnsplittedContainer";
import { useQuery } from "@tanstack/react-query";
import api from "@/app/_api/config";
import { useParams } from "next/navigation";
import { useBase64 } from "@/app/_hooks/useBase64";

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
  } = useCodingTestStore();
  const { setContent } = useTiptapStore();
  // 페이지 진입 시 전역변수 초기화
  useEffect(() => {
    setIsPosting(false);
    setValue("");
    setContent("");
    setCompileError("");
    setCompiledResult([]);
    setLanguage(PROGRAMMING_LANGUAGES[0]);
  }, []);

  const { windowSize } = useWindowSizeStore();

  const [historyId, setHistoryId] = useState(0);
  const fetchCodeInfo = async () => {
    if (isTokenSet === true) {
      if (accessToken) {
        const response = await api.get(
          `/code-bank-service/code/history/user/${id}`,
          {
            headers: { Authorization: accessToken },
          }
        );
        setHistoryId(response.data.historyId);
        setValue(useBase64("decode", response.data.codeHistory_writtenCode));
        return response.data;
      } else {
        const response = await api.get(
          `/code-bank-service/code/non/lists/${id}`
        );
        return response.data;
      }
    }
  };
  const { data } = useQuery({
    queryKey: ["codeInfo", isTokenSet],
    queryFn: fetchCodeInfo,
  });
  console.log(data);
  const [dummyChat, setDummyChat] = useState<Chat[]>([
    {
      content: "hi",
      role: "gpt",
    },
    {
      content: "hi",
      role: "user",
    },
    {
      content: "hi",
      role: "gpt",
    },
    {
      content: "hi",
      role: "user",
    },
    {
      content: "hi",
      role: "gpt",
    },
  ]);

  return (
    <>
      {data && windowSize ? (
        windowSize >= 768 ? (
          <SplittedContainer
            content={useBase64(
              "decode",
              accessToken ? data.code_Content : data.content
            )}
            chats={dummyChat}
          />
        ) : (
          <UnsplittedContainer
            content={useBase64("decode", data.code_Content)}
            chats={dummyChat}
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
