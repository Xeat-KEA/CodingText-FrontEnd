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

export default function CodingTestPage() {
  const { accessToken } = useCheckToken();

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

  const [dummyData, setDummyData] = useState<Chat[]>([
    {
      content:
        "<h3>Balanced Parentheses</h3>\n\n<p>In this problem, you must determine if the parentheses in an input string are balanced. A string is considered balanced if every opening parenthesis ‘(’ has a matching closing parenthesis ‘)’, and the pairs are correctly nested.</p>\n\n<h4>문제 설명:</h4>\n<p>귀하의 임무는 주어진 문자열에 포함된 괄호가 올바르게 쌍을 이루고 있는지를 확인하는 것입니다. 올바른 문자열이란 모든 여는 괄호 ‘(’가 닫는 괄호 ‘)’와 쌍을 이루고, 괄호 쌍이 제대로 중첩되는 경우입니다.</p>\n\n<h4>문제 제약 사항:</h4>\n<ul>\n  <li>입력 문자열은 괄호 이외의 문자도 포함될 수 있습니다.</li>\n  <li>괄호는 (), {}, [] 세 종류가 포함됩니다.</li>\n</ul>\n\n<h4>입력 예시:</h4>\n<pre><code>(){}[]\n([{}])\n({[})\n</code></pre>\n\n<h4>출력 예시:</h4>\n<pre><code>true\ntrue\nfalse\n</code></pre>\n\n<h4>입출력 예 설명:</h4>\n<p>첫 번째 예에서 모든 괄호 쌍은 올바른 순서로 배치되어 있으며 중첩이 없습니다. 두 번째 예에서는 세 쌍이 중첩되어 있지만 여전히 올바르게 닫힙니다. 세 번째 예에서는 중괄호가 일치하지 않아서 체크 시 false가 반환됩니다.</p>",
      role: "gpt",
    },
  ]);
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
      {windowSize ? (
        windowSize >= 768 ? (
          <SplittedContainer content={dummyData[0].content} chats={dummyChat} />
        ) : (
          <UnsplittedContainer
            content={dummyData[0].content}
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
