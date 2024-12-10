import { CompileResult } from "../_interface/interfaces";

export default function CompileResultCard({
  index,
  runtime,
  input,
  output,
  result,
}: CompileResult) {
  const isCorrect = output == result;
  return (
    <div className="flex flex-col gap-4 py-6">
      <div className="flex gap-4 items-center">
        <span className="text-black text-sm font-semibold">
          테스트 케이스 {index}
        </span>
        <div className="flex gap-2">
          <span
            className={`${
              isCorrect ? "text-green" : "text-red"
            } text-xs font-bold`}
          >
            {isCorrect ? "정답" : "오답"}
          </span>
          <span className="text-disabled text-xs">{runtime}ms</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-body text-sm">입력값</span>
        <div className="prose bg-bg-1 px-4 p-2 rounded-lg">
          <pre className="!p-0 !m-0 !bg-transparent !text-primary-1">
            <code>{input}</code>
          </pre>
        </div>
      </div>
      <div className="flex gap-8">
        <div className="w-full h-full flex flex-col gap-2">
          <span className="text-body text-sm">정답</span>
          <div className="prose bg-bg-1 px-4 py-2 rounded-lg h-full">
            <pre className="!p-0 !m-0 !bg-transparent !text-primary-1">
              <code>{output}</code>
            </pre>
          </div>
        </div>
        <div className="w-full h-full flex flex-col gap-2">
          <span className="text-body text-sm">출력 결과</span>
          <div className="prose bg-bg-1 px-4 py-2 rounded-lg h-full">
            <pre
              className={`!p-0 !m-0 !bg-transparent ${
                !isCorrect ? "!text-red" : "!text-primary-1"
              }`}
            >
              <code>{result}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
