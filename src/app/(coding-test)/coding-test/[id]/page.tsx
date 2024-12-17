"use client";

import {
  useChatStore,
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
import { useQuery } from "@tanstack/react-query";
import api from "@/app/_api/config";
import { useParams } from "next/navigation";
import { useBase64 } from "@/app/_hooks/useBase64";
import { CodeInfo } from "../../_interface/interfaces";
import { getDifficultyNumber } from "@/app/utils";
import { isAxiosError } from "axios";

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
  const { setNewChats } = useChatStore();
  // 페이지 진입 시 전역변수 초기화
  useEffect(() => {
    setIsPosting(false);
    setValue("");
    setContent("");
    setCompileError("");
    setCompiledResult([]);
    setIsRunning(false);
    setSubmitResult([]);
    setNewChats([]);
    setLanguage(PROGRAMMING_LANGUAGES[0]);
  }, []);

  const { windowSize } = useWindowSizeStore();

  // 문제 정보
  const [codeContent, setCodeContent] = useState("");
  const fetchCodeInfo = async () => {
    if (isTokenSet === true) {
      try {
        if (accessToken) {
          const response = await api.get(
            `/code-bank-service/code/history/user/${id}`,
            {
              headers: { Authorization: accessToken },
            }
          );
          // 문제를 풀었던 기록이 있는 경우
          setCodeContent(useBase64("decode", response.data.code_Content));
          setHasSolved(response.data.correct);
          setValue(useBase64("decode", response.data.codeHistory_writtenCode));
          return response.data;
        } else {
          const { data } = await api.get(
            `/code-bank-service/code/non/lists/${id}`
          );
          setCodeContent(useBase64("decode", data.content));
          return data;
        }
      } catch (err) {
        if (isAxiosError(err)) {
          if (err.response?.status === 500) {
            // 문제를 처음 푸는 경우
            const response = await api.get(
              `/code-bank-service/code/lists/${id}`,
              {
                headers: { Authorization: accessToken },
              }
            );
            setCodeContent(useBase64("decode", response.data.code_Content));
            setHasSolved(response.data.correct);
            setValue(
              useBase64("decode", response.data.codeHistory_writtenCode)
            );
            return response.data;
          }
        }
      }
    }
  };
  const { data: codeInfo } = useQuery<CodeInfo>({
    queryKey: ["codeInfo", isTokenSet],
    queryFn: fetchCodeInfo,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      {codeInfo && windowSize ? (
        windowSize >= 768 ? (
          <SplittedContainer
            key={codeInfo.historyId}
            content={codeContent}
            historyId={codeInfo.historyId}
            difficulty={getDifficultyNumber(codeInfo.difficulty)}
          />
        ) : (
          <UnsplittedContainer
            key={codeInfo.historyId}
            content={codeContent}
            historyId={codeInfo.historyId}
            difficulty={getDifficultyNumber(codeInfo.difficulty)}
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
