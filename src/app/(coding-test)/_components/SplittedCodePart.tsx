import { Splitter, SplitterPanel } from "primereact/splitter";
import CodeEditor from "./CodeEditor";
import TabBar from "@/app/_components/TapBar/TabBar";
import { useCodingTestStore, useTabStore } from "@/app/stores";
import { PROGRAMMING_LANGUAGES } from "@/app/_constants/constants";
import { CodePartProps } from "../_interface/interfaces";
import LoadingSpinner from "@/app/_components/LoadingSpinner";
import { useEffect, useRef } from "react";
import { CODING_TAB_BAR_MENU } from "../_constants/constants";

export default function SplittedCodePart({
  isRunning,
  compiledResult,
}: CodePartProps) {
  const { memo, setMemo, setIsSmall } = useCodingTestStore();
  const { tab } = useTabStore();

  // 코드 작성 부분 크기 감지
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (ref.current) {
        setIsSmall(ref.current.clientWidth < 600);
      }
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <Splitter
      onResize={() => console.log("hi")}
      gutterSize={10}
      className="w-full h-full flex flex-col"
      layout="vertical"
    >
      <SplitterPanel size={75}>
        {/* 코드 에디터 */}
        <div ref={ref} className="relative w-full h-full pb-4 bg-[#292A2F]">
          <div className="absolute flex w-full h-full">
            <CodeEditor />
          </div>
        </div>
      </SplitterPanel>
      {/* 컴파일러 / 메모장 */}
      <SplitterPanel
        size={25}
        className="w-full flex flex-col gap-4 shrink-0 overflow-hidden px-6"
      >
        {/* 탭바 */}
        <TabBar menuList={CODING_TAB_BAR_MENU} />
        {/* 컴파일러 */}
        {tab === "컴파일러" && (
          <div className="prose w-full h-full max-w-none">
            <pre className="flex w-full h-[200px] !m-0">
              {!isRunning ? (
                <code>
                  {/* 컴파일 결과 */}
                  {compiledResult}
                </code>
              ) : (
                <div className="w-full h-full flex-center">
                  <LoadingSpinner />
                </div>
              )}
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
      </SplitterPanel>
    </Splitter>
  );
}
