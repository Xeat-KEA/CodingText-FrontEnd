import { useOutsideClick } from "@/app/_hooks/useOutsideClick";
import { ChatGPTIcon } from "./Icons";
import DropDown from "@/app/_components/Dropdown";
import { ALGORITHM_LIST, DIFFICULTY_LIST } from "@/app/_constants/constants";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { CreateCodeForm } from "../_interfaces/interfaces";

export default function ChatGPTDialog({
  onBackBtnClick,
}: {
  onBackBtnClick: () => void;
}) {
  const router = useRouter();
  const ref = useOutsideClick(onBackBtnClick);

  const [difficulty, setDifficulty] = useState("");
  const [algorithm, setAlgorithm] = useState("");

  const { register, handleSubmit, setValue } = useForm<CreateCodeForm>();
  const onSubmit = (data: CreateCodeForm) => {
    if (!data.difficulty) {
      console.log("error");
    } else {
      console.log(data);
      // ChatGPT를 통해 문제를 생성하는 POST 로직 추가 필요

      router.push("/coding-test/ai", { scroll: false });
    }
  };
  return (
    <div className="overlay">
      <div
        ref={ref}
        className="absolute flex left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] bg-white p-6 rounded-2xl shadow-1"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
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
                setDifficulty(selected);
                setValue("difficulty", selected);
              }}
            />
            <DropDown
              placeholder="(선택) 알고리즘"
              list={ALGORITHM_LIST}
              selection={algorithm}
              onSelectionClick={(selected) => {
                setAlgorithm(selected);
                setValue("algorithm", selected);
              }}
            />
            <textarea
              {...register("requirement")}
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
      </div>
    </div>
  );
}
