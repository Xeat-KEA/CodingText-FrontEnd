import { SubmitResult } from "../_interface/interfaces";

export default function SubmitResultCard({
  index,
  submitResult,
}: {
  index: number;
  submitResult: SubmitResult;
}) {
  return (
    <div className="w-full flex gap-4 items-center justify-between">
      <span className="text-black text-sm font-semibold">
        테스트 케이스 {index}
      </span>
      <div className="flex items-center gap-2">
        <span className="text-disabled text-xs">{submitResult.runtime}ms</span>
        <span
          className={`${
            submitResult.result ? "text-green" : "text-red"
          } text-xs font-bold`}
        >
          {submitResult.result ? "정답" : "오답"}
        </span>
      </div>
    </div>
  );
}
