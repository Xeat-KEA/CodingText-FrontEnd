import { useCodingTestStore, useTabStore } from "@/app/stores";
import CodeEditor from "./CodeEditor";
import TabBar from "@/app/_components/TapBar/TabBar";
import { PROGRAMMING_LANGUAGES } from "@/app/_constants/constants";
import { CodePartProps } from "../_interface/interfaces";
import { CODING_TAB_BAR_MENU } from "../_constants/constants";

export default function CodePart({ isRunning, compiledResult }: CodePartProps) {
  const { memo, setMemo } = useCodingTestStore();
  const { tab } = useTabStore();
  return (
    <div className="w-full h-full flex flex-col gap-4 px-6">
      <div className="h-full flex flex-col gap-4">
        {/* 코드 에디터 */}
        <div className="flex h-full rounded-2xl overflow-hidden">
          <CodeEditor />
        </div>
      </div>
      {/* 컴파일러 / 메모장 */}
      <div className="w-full h-[240px] flex flex-col gap-4 shrink-0">
        {/* 탭바 */}
        <TabBar menuList={CODING_TAB_BAR_MENU} />
        {/* 컴파일러 */}
        {tab === "컴파일러" && (
          <div className="prose w-full h-full max-w-none">
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
            } w-full h-full px-4 py-3 text-black resize-none rounded-lg border border-border-2`}
          />
        )}
      </div>
    </div>
  );
}
