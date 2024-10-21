import CodeEditor from "./CodeEditor";
import { CODING_BUTTONS, CODING_TAB_BAR_MENU } from "../_constants/constants";
import { PROGRAMMING_LANGUAGES } from "@/app/_constants/constants";
import { useCodingTestStore, useTabStore } from "@/app/stores";
import { useState } from "react";
import Dialog from "@/app/_components/Dialog";
import { DialogCheckIcon, DialogXIcon } from "@/app/_components/Icons";
import { useParams, useRouter } from "next/navigation";
import { usePageHandler } from "@/app/_hooks/usePageHandler";
import TabBar from "@/app/_components/TapBar/TabBar";
import { useBase64 } from "@/app/_hooks/useBase64";

export default function CodeEditPanel() {
  const router = useRouter();
  const { id } = useParams();

  // 현재 탭 전역 변수
  const { tab } = useTabStore();

  // 코딩 테스트 관련 전역 변수
  const { value, hasSolved, setHasSolved, setIsPosting, memo, setMemo } =
    useCodingTestStore();

  const [isCorrect, setIsCorrect] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPageChanging, setIsPageChanging] = useState(false);
  const [compiledResult, setCompiledResult] = useState("");

  const onCodeSubmit = () => {
    // 코드를 base64로 인코딩하여 백에 전달
    const encodedCode = useBase64("encode", value);

    // 백으로부터 전달 받은 컴파일 결과 내용을 디코딩 후 저장
    const result = useBase64("decode", "");
    setCompiledResult(result);
    // 정답 여부 저장
    setIsCorrect(true);
  };

  // 새로고침, 페이지 닫기, 뒤로가기 방지
  usePageHandler();

  return (
    <>
      <div className="w-full flex flex-col px-6 py-8 gap-4">
        {/* 코드 에디터 */}
        <div className="flex h-full rounded-2xl overflow-hidden">
          <CodeEditor />
        </div>
        {/* 탭바 */}
        <TabBar
          menuList={CODING_TAB_BAR_MENU}
          dropDownList={PROGRAMMING_LANGUAGES}
        />
        {/* 컴파일러 / 메모장 */}
        <div
          className={`w-full h-[200px] flex shrink-0 rounded-2xl overflow-hidden ${
            tab === "메모장" && "border border-border-2"
          }`}
        >
          {/* 컴파일러 */}
          {tab === "컴파일러" && (
            <div className="prose w-full">
              <pre className="w-full h-full !m-0">
                <code>
                  {/* 컴파일 결과 */}
                  {compiledResult}
                </code>
              </pre>
            </div>
          )}
          {/* 메모장 */}
          {tab === "메모장" && (
            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              className={`${
                tab === "메모장" ? "block" : "hidden"
              } w-full h-full px-4 py-3 text-black resize-none`}
            />
          )}
        </div>
        {/* 구분선 */}
        <div className="division" />
        {/* 하단 버튼 */}
        <div className="flex gap-4 self-end">
          {/* 글 쓰기 버튼 (정답 시에만 활성화) */}
          <button
            onClick={() => setIsPosting(true)}
            className={`${!hasSolved ? "btn-disabled" : "btn-default"}`}
            disabled={!hasSolved}
          >
            {CODING_BUTTONS[0].content}
          </button>
          {/* 다른 사람 풀이 보기 버튼 */}
          <button
            onClick={() =>
              router.push(`${CODING_BUTTONS[1].url}&keyword=${id}`, {
                scroll: false,
              })
            }
            className="btn-default"
          >
            {CODING_BUTTONS[1].content}
          </button>
          {/* 코드 컴파일 후 실행 */}
          <button onClick={onCodeSubmit} className="btn-default">
            {CODING_BUTTONS[2].content}
          </button>
          {/* 코드 제출 */}
          <button
            onClick={() => {
              onCodeSubmit();

              if (isCorrect) {
                setHasSolved(true);
                setIsDialogOpen((prev) => !prev);
              } else {
                setIsDialogOpen((prev) => !prev);
              }
            }}
            className="btn-primary"
          >
            {CODING_BUTTONS[3].content}
          </button>
        </div>
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
