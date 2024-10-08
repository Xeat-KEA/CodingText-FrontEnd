import TabBar from "@/app/_components/TabBar";
import CodeEditor from "./CodeEditor";
import { CODING_BUTTONS, CODING_TAB_BAR_MENU } from "../_constants/constants";
import { PROGRAMMING_LANGUAGES } from "@/app/_constants/constants";
import { useCodingTestStore, useTabStore } from "@/app/stores";
import { useState } from "react";
import Dialog from "@/app/_components/Dialog";
import { DialogCheckIcon, DialogXIcon } from "@/app/_components/Icons";
import { useRouter } from "next/navigation";
import { usePageHandler } from "@/app/_hooks/usePageHandler";

export default function CodeEditPanel() {
  const router = useRouter();

  // 현재 탭 전역 변수
  const { tab } = useTabStore();
  const { hasSolved, setHasSolved, setIsPosting, setMemo } =
    useCodingTestStore();

  const [isCorrect, setIsCorrect] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPageChanging, setIsPageChanging] = useState(false);

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
        <div className="w-full h-[200px] flex shrink-0 border border-border-2 rounded-2xl overflow-hidden">
          {/* 컴파일러 */}
          <div></div>
          {/* 메모장 */}
          <textarea
            onChange={(e) => setMemo(e.target.value)}
            className={`${
              tab === "메모장" ? "block" : "hidden"
            } w-full h-full px-4 py-3 text-black resize-none`}
          />
        </div>
        {/* 구분선 */}
        <div className="division" />
        {/* 하단 버튼 */}
        <div className="flex gap-4 self-end">
          <button
            onClick={() => setIsPosting(true)}
            className={`${!hasSolved ? "btn-disabled" : "btn-default"}`}
            disabled={!hasSolved}
          >
            {CODING_BUTTONS[0].content}
          </button>
          <button onClick={() => {}} className="btn-default">
            {CODING_BUTTONS[1].content}
          </button>
          <button onClick={() => {}} className="btn-default">
            {CODING_BUTTONS[2].content}
          </button>
          <button
            onClick={() => {
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
          onSubBtnClick={() => {}}
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
          onBtnClick={() => router.push("/")}
        />
      )}
    </>
  );
}
