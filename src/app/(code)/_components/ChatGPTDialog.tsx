import { useOutsideClick } from "@/app/_hooks/useOutsideClick";
import { ChatGPTIcon } from "./Icons";
import DropDown from "@/app/_components/DropDown";
import { ALGORITHM_LIST, DIFFICULTY_LIST } from "@/app/_constants/constants";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { CreateCodeForm } from "../_interfaces/interfaces";
import { useBase64 } from "@/app/_hooks/useBase64";
import api from "@/app/_api/config";
import { useTokenStore } from "@/app/stores";
import LoadingSpinner from "@/app/_components/LoadingSpinner";

export default function ChatGPTDialog({
  onBackBtnClick,
}: {
  onBackBtnClick: () => void;
}) {
  const { accessToken } = useTokenStore();
  const router = useRouter();
  const ref = useOutsideClick(onBackBtnClick);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<CreateCodeForm>();
  const [difficulty, setDifficulty] = useState("");
  const [algorithm, setAlgorithm] = useState("");

  const [isRunning, setIsRunning] = useState(false);
  const onValid = async (data: CreateCodeForm) => {
    if (!data.difficulty) {
      setError("difficulty", { type: "custom" });
      return;
    }
    if (!data.algorithm) {
      setError("algorithm", { type: "custom" });
      return;
    }
    setIsRunning(true);
    const response = await api.post(
      "/code-llm-service/llm/code-generating",
      data,
      {
        headers: { Authorization: accessToken },
      }
    );
    const generatedCodeId = response.data.data.codeId;
    router.push(`/coding-test/${generatedCodeId}`);
  };

  return (
    <div className="overlay">
      <div
        ref={ref}
        className="absolute flex left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] bg-white p-6 rounded-2xl shadow-1"
      >
        {!isRunning ? (
          <form
            onSubmit={handleSubmit(onValid)}
            className="flex flex-col gap-6 w-full"
          >
            <div className="flex flex-col items-center gap-4 py-6">
              <ChatGPTIcon />
              <span className="whitespace-pre-wrap text-black text-xl font-semibold text-center">
                {"ChatGPT를 이용해\n나만의 문제를 만들어 보세요!"}
              </span>
            </div>
            <div className="flex flex-col gap-4">
              <DropDown
                placeholder="난이도"
                list={DIFFICULTY_LIST}
                selection={difficulty}
                onSelectionClick={(selected) => {
                  setValue("difficulty", selected.selection);
                  setDifficulty(selected.content);
                  clearErrors("difficulty");
                }}
                isError={errors.difficulty !== undefined}
              />
              <DropDown
                placeholder="알고리즘"
                list={ALGORITHM_LIST}
                selection={algorithm}
                onSelectionClick={(selected) => {
                  setValue("algorithm", selected.selection);
                  setAlgorithm(selected.content);
                  clearErrors("algorithm");
                }}
                isError={errors.algorithm !== undefined}
              />
              <textarea
                {...register("etc")}
                className="w-full h-[120px] px-4 py-2 text-black border border-border-2 rounded-2xl resize-none"
                placeholder="(선택) 추가 요청사항을 적어주세요"
              />
            </div>
            <div className="flex gap-4">
              {/* 뒤로가기 버튼 */}
              <button
                type="button"
                onClick={onBackBtnClick}
                className="btn-default w-full"
              >
                취소
              </button>
              {/* Primary 색상 버튼 */}
              <button type="submit" className="btn-primary w-full">
                새 문제 만들기
              </button>
            </div>
          </form>
        ) : (
          <div className="w-full h-[200px] flex-center">
            <LoadingSpinner />
          </div>
        )}
      </div>
    </div>
  );
}
