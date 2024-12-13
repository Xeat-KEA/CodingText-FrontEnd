import { useCodingTestStore } from "@/app/stores";
import CompileResultCard from "./CompileResultCard";
import CompileError from "./CompileError";
import LoadingSpinner from "@/app/_components/LoadingSpinner";
import SubmitResultCard from "./SubmitResultCard";

export default function CodeCompiler() {
  const { isRunning, compileError, compiledResult, submitResult } =
    useCodingTestStore();
  const isSubmitted = submitResult.length !== 0;
  return (
    <div className="w-full h-full relative overflow-y-auto md:min-h-[200px]">
      {!isRunning ? (
        <div className="absolute top-0 left-0 w-full h-full">
          {compileError !== "" ? (
            <CompileError content={compileError} />
          ) : isSubmitted ? (
            <div className="w-full h-full pt-4">
              <div className="w-full h-full rounded-lg bg-bg-1 text-body flex flex-col px-4 py-2 gap-3 overflow-y-auto">
                {submitResult.map((el, index) => (
                  <SubmitResultCard
                    key={index}
                    index={index + 1}
                    submitResult={el}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-border-1">
              {compiledResult.map((el, index) => (
                <CompileResultCard
                  key={index}
                  index={index + 1}
                  compileResult={el}
                />
              ))}
            </div>
          )}
          {compileError === "" &&
            compiledResult.length === 0 &&
            submitResult.length === 0 && (
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
