import { Splitter, SplitterPanel } from "primereact/splitter";
import CodeEditor from "./CodeEditor";
import TabBar from "@/app/_components/TapBar/TabBar";
import { useCodingTestStore, useTabStore } from "@/app/stores";
import { CODING_TAB_BAR_MENU } from "../_constants/constants";
import { useEffect, useState } from "react";
import CodeCompiler from "./CodeCompiler";

export default function SplittedCodePart() {
  const { memo, setMemo, isRunning } = useCodingTestStore();
  const { tab } = useTabStore();

  const [stateKey, setStateKey] = useState(0);
  const [panelSize, setPanelSize] = useState([99, 1]);
  useEffect(() => {
    if (isRunning) {
      setStateKey((prev) => prev + 1);
      setPanelSize([50, 50]);
    }
  }, [isRunning]);

  return (
    <Splitter
      // 코드 실행 시 사이즈 변경 후 리렌더링
      key={stateKey + ""}
      gutterSize={10}
      className="w-full h-full flex flex-col"
      layout="vertical"
    >
      <SplitterPanel size={panelSize[0]}>
        {/* 코드 에디터 */}
        <div className="relative w-full h-full bg-[#292A2F] border-b border-border-2">
          <div className="absolute flex w-full h-full">
            <CodeEditor />
          </div>
        </div>
      </SplitterPanel>
      {/* 컴파일러 / 메모장 */}
      <SplitterPanel
        size={panelSize[1]}
        className="w-full flex flex-col shrink-0 overflow-hidden px-6"
      >
        {/* 탭바 */}
        <TabBar menuList={CODING_TAB_BAR_MENU} />
        {/* 컴파일러 */}
        {tab === "컴파일러" && (
          <div className="w-full h-full pb-4">
            <CodeCompiler />
          </div>
        )}
        {/* 메모장 */}
        {tab === "메모장" && (
          <div className="w-full h-full py-4">
            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              className={`${
                tab === "메모장" ? "block" : "hidden"
              } w-full h-full px-4 py-3 text-black resize-none rounded-lg border border-border-2`}
            />
          </div>
        )}
      </SplitterPanel>
    </Splitter>
  );
}
