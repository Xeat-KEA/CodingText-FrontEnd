import { useCodingTestStore, useTabStore } from "@/app/stores";
import CodeEditor from "./CodeEditor";
import TabBar from "@/app/_components/TapBar/TabBar";
import { CODING_TAB_BAR_MENU } from "../_constants/constants";
import CodeCompiler from "./CodeCompiler";

export default function CodePart() {
  const { memo, setMemo } = useCodingTestStore();
  const { tab } = useTabStore();
  return (
    <div className="w-full h-full flex flex-col gap-2">
      <div className="h-full flex flex-col gap-4">
        {/* 코드 에디터 */}
        <div className="flex h-full">
          <CodeEditor />
        </div>
      </div>
      {/* 컴파일러 / 메모장 */}
      <div className="w-full h-[280px] flex flex-col shrink-0 px-6 pb-4">
        {/* 탭바 */}
        <TabBar menuList={CODING_TAB_BAR_MENU} />
        {/* 컴파일러 */}
        {tab === "컴파일러" && <CodeCompiler />}
        {/* 메모장 */}
        {tab === "메모장" && (
          <div className="w-full h-full pt-4">
            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              className={`${
                tab === "메모장" ? "block" : "hidden"
              } w-full h-full px-4 py-3 text-black resize-none rounded-lg border border-border-2`}
            />
          </div>
        )}
      </div>
    </div>
  );
}
