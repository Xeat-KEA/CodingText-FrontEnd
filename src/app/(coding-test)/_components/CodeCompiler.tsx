import { useCodingTestStore } from "@/app/stores";
import CompileResultCard from "./CompileResultCard";
import CompileError from "./CompileError";
import LoadingSpinner from "@/app/_components/LoadingSpinner";

export default function CodeCompiler() {
  const { isRunning, compileError, compiledResult } = useCodingTestStore();
  return (
    <div className="w-full h-full relative overflow-y-auto min-h-[100px]">
      {!isRunning ? (
        <div className="absolute top-0 left-0 w-full h-full flex flex-col divide-y divide-border-1">
          {compileError === "" ? (
            compiledResult.map((el, index) => (
              <CompileResultCard
                key={index}
                index={index + 1}
                runtime={el.runtime}
                input={el.input}
                output={el.output}
                result={el.result}
              />
            ))
          ) : (
            <CompileError content={compileError} />
          )}
          {compileError === "" && compiledResult.length === 0 && (
            <div className="w-full h-full pt-4">
              <div className="w-full h-full rounded-lg bg-bg-1 text-sm text-body flex-center">
                코드를 실행해주세요
              </div>
            </div>
          )}
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}
