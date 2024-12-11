"use client";

import { Splitter, SplitterPanel } from "primereact/splitter";
import CodeEditPanel from "../../_components/CodeEditPanel";
import {
  useCodingTestStore,
  useTiptapStore,
  useWindowSizeStore,
} from "@/app/stores";
import NewPostPanel from "../../_components/NewPostPanel";
import { useEffect } from "react";
import ChattingPanel from "../../_components/ChattingPanel";
import LoadingSpinner from "@/app/_components/LoadingSpinner";
import { PROGRAMMING_LANGUAGES } from "@/app/_constants/constants";
import { useCheckToken } from "@/app/_hooks/useCheckToken";

export default function CodingTestPage() {
  const {} = useCheckToken();

  // 필요한 전역변수 선언
  const {
    isPosting,
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

  return (
    <>
      {windowSize ? (
        windowSize >= 768 ? (
          <Splitter gutterSize={10} className="w-full h-screen pt-16 flex">
            {/* 채팅창 공간 */}
            <SplitterPanel className="flex flex-col">
              {/* 메세지 표시 공간 */}
              <ChattingPanel />
            </SplitterPanel>
            {/* 작성 관련 공간 */}
            <SplitterPanel className="flex">
              {!isPosting ? <CodeEditPanel /> : <NewPostPanel />}
            </SplitterPanel>
          </Splitter>
        ) : (
          <div className="w-full pt-16 flex flex-col">
            <ChattingPanel />
            {!isPosting ? <CodeEditPanel /> : <NewPostPanel />}
          </div>
        )
      ) : (
        <div className="w-screen h-screen">
          <LoadingSpinner />
        </div>
      )}
    </>
  );
}
