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
import { useQuery } from "@tanstack/react-query";
import api from "@/app/_api/config";
import { useParams } from "next/navigation";
import { useBase64 } from "@/app/_hooks/useBase64";
import { CodeInfo } from "../../_interface/interfaces";
import { getDifficultyNumber } from "@/app/utils";

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
  const { data: codeInfo } = useQuery<CodeInfo>({
    queryKey: ["codeInfo", isTokenSet],
    queryFn: fetchCodeInfo,
  });

  return (
    <>
      {codeInfo && windowSize ? (
        windowSize >= 768 ? (
          <SplittedContainer
            content={codeContent}
            historyId={codeInfo.historyId}
            difficulty={getDifficultyNumber(codeInfo.difficulty)}
          />
        ) : (
          <UnsplittedContainer
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
