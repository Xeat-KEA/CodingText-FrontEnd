import { useCodingTestStore } from "@/app/stores";
import { useEffect, useState } from "react";
import Dialog from "@/app/_components/Dialog";
import { DialogCheckIcon, DialogXIcon } from "@/app/_components/Icons";
import { useParams, useRouter } from "next/navigation";
import { usePageHandler } from "@/app/_hooks/usePageHandler";
import { useBase64 } from "@/app/_hooks/useBase64";
import api from "@/app/_api/config";
import { useHandleResize } from "@/app/_hooks/useHandleResize";
import CodePart from "./CodePart";
import SplittedCodePart from "./SplittedCodePart";
import CodePartBtns from "./CodePartBtns";

export default function CodeEditPanel() {
  const router = useRouter();
  const { id } = useParams();

  // 코딩 테스트 관련 전역 변수
  const { value, setIsPosting, language, setHasSolved } = useCodingTestStore();

  const [isCorrect, setIsCorrect] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPageChanging, setIsPageChanging] = useState(false);
  const [compiledResult, setCompiledResult] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  // 코드 컴파일 시
  const onCompile = async () => {
    // 코드를 base64로 인코딩하여 백에 전달
    const encodedCode = useBase64("encode", value);
    const data = {
      codeId: Number(id),
      language: language.selection,
      code: encodedCode,
    };
    if (!isRunning) {
      try {
        setIsRunning(true);
        const response = await api.post(
          "/code-compile-service/code/compile",
          data,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
            },
          }
        );
        if (response.status === 200) {
          const result = response.data.data;
          setCompiledResult(result.result[0]);
          setIsRunning(false);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  // 코드 제출 시
  const onSubmit = () => {
    setIsCorrect(true);
    setHasSolved(true);
    setIsDialogOpen((prev) => !prev);
  };

  // 새로고침, 페이지 닫기, 뒤로가기 방지
  usePageHandler();

  const windowSize = useHandleResize();
  console.log(compiledResult);
  return (
    <>
      <div className="w-full flex flex-col max-md:h-screen">
        {/* 화면 크기 클 경우 Splitter 있는 코드 작성 부분 렌더링 */}
        {windowSize > 768 ? (
          <SplittedCodePart
            isRunning={isRunning}
            compiledResult={compiledResult}
          />
        ) : (
          <CodePart isRunning={isRunning} compiledResult={compiledResult} />
        )}
        {/* 하단 버튼 */}
        <CodePartBtns onCompile={onCompile} onSubmit={onSubmit} />
      </div>
      {isCorrect && isDialogOpen && (
        <Dialog
          icon={<DialogCheckIcon />}
          title="정답이에요!"
          content="내 풀이 방법을 블로그에 바로 정리할 수 있어요"
          backBtn="돌아가기"
          onBackBtnClick={() => setIsDialogOpen((prev) => !prev)}
          subBtn="다른 문제 풀기"
          onSubBtnClick={() => router.push("/code/list", { scroll: false })}
          primaryBtn="글 쓰기"
          onBtnClick={() => setIsPosting(true)}
        />
      )}
      {!isCorrect && isDialogOpen && (
        <Dialog
          icon={<DialogXIcon />}
          title="오답이에요..."
          content="다시 풀어보세요!"
          backBtn="확인"
          onBackBtnClick={() => setIsDialogOpen((prev) => !prev)}
        />
      )}
      {isPageChanging && (
        <Dialog
          title={"문제 풀이를\n그만두시겠어요?"}
          content={
            "코드 실행을 하지 않고 페이지를 나가면\n현재까지의 내용이 문제 풀이 기록에 저장되지 않아요\n*AI 생성 문제의 경우, 문제가 삭제돼요*"
          }
          isWarning
          backBtn="돌아가기"
          onBackBtnClick={() => setIsPageChanging((prev) => !prev)}
          redBtn="문제 풀이 그만두기"
          onBtnClick={() => router.push("/", { scroll: false })}
        />
      )}
    </>
  );
}
