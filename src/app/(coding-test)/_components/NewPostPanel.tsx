import { POSTING_TAB_BAR_MENU } from "../_constants/constants";
import { useCodingTestStore, useTabStore } from "@/app/stores";
import CodeEditor from "./CodeEditor";
import { useState } from "react";
import Dialog from "@/app/_components/Dialog";
import { DialogCheckIcon } from "@/app/_components/Icons";
import { useRouter } from "next/navigation";
import { usePageHandler } from "@/app/_hooks/usePageHandler";
import TabBar from "@/app/_components/TapBar/TabBar";
import { useBase64 } from "@/app/_hooks/useBase64";
import PostEditor from "@/app/_components/PostEditor/PostEditor";

export default function NewPostPanel() {
  const router = useRouter();

  // 전역 변수 선언
  const { tab } = useTabStore();
  const { value, setIsPosting, memo, setMemo } = useCodingTestStore();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPageChanging, setIsPageChanging] = useState(false);

  // 새로고침, 페이지 닫기, 뒤로가기 방지
  usePageHandler();

  return (
    <>
      <div className="w-full flex flex-col px-6 pt-4 pb-8 gap-4">
        {/* 탭바 */}
        <TabBar menuList={POSTING_TAB_BAR_MENU} />
        {/* 컴파일러 / 메모장 */}
        <div className="w-full h-[200px] shrink-0 flex overflow-hidden">
          {/* 코드 뷰어 */}
          <div
            className={`w-full h-full rounded-2xl overflow-hidden ${
              tab === "코드 뷰어" ? "flex" : "hidden"
            }`}
          >
            <CodeEditor isViewer defaultValue={value} />
          </div>
          {/* 메모장 */}
          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            className={`${
              tab === "메모장" ? "block" : "hidden"
            } w-full h-full px-4 py-3 text-black border border-border-2 rounded-2xl resize-none`}
          />
        </div>
        <div className="division" />
        {/* 새 게시글 내용 작성 */}
        <div className="w-full h-full overflow-hidden">
          <PostEditor
            isCodingTest
            onCancelClick={() => setIsPosting(false)}
            onBtnClick={(data) => {
              // data post 부분 작성 필요
              const newContent = useBase64("encode", data.content);
              const newData = { ...data, content: newContent };
              console.log(newData);

              setIsDialogOpen((prev) => !prev);
            }}
          />
        </div>
      </div>
      {isDialogOpen && (
        <Dialog
          icon={<DialogCheckIcon />}
          title="게시글이 등록되었어요!"
          content="작성된 게시글을 확인해보세요"
          backBtn="문제 목록 페이지로"
          onBackBtnClick={() => router.push("/code/list", { scroll: false })}
          primaryBtn="게시글 페이지로"
          onBtnClick={() => router.push("/blog/1/post/1")} // 링크 수정 필요
        />
      )}
      {isPageChanging && (
        <Dialog
          title={"게시글 작성을\n그만두시겠어요?"}
          content={
            "작성하던 게시글은 저장되지 않으며\n문제 목록 페이지로 이동해요"
          }
          isWarning
          backBtn="돌아가기"
          onBackBtnClick={() => setIsPageChanging((prev) => !prev)}
          redBtn="게시글 작성 취소"
          onBtnClick={() => router.push("/", { scroll: false })}
        />
      )}
    </>
  );
}
