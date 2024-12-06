import DropDown from "@/app/_components/DropDown";
import SaveOrCancelBtn from "@/app/_components/SaveOrCancelBtn";
import TiptapEditor from "@/app/_components/TipTapEditor/TiptapEditor";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ALGORITHM_LIST,
  DIFFICULTY_LIST,
  PROGRAMMING_LANGUAGES,
} from "@/app/_constants/constants";
import { useForm } from "react-hook-form";
import CodeEditor from "@/app/(coding-test)/_components/CodeEditor";
import { useCodingTestStore, useTiptapStore } from "@/app/stores";
import Dialog from "@/app/_components/Dialog";
import { DialogCheckIcon } from "@/app/_components/Icons";
import { CodeDetail, ManageCodeProps } from "../_interfaces/interfaces";
import { Code } from "@/app/(code)/_interfaces/interfaces";

export default function ManageCode({
  code,
  testcases,
  onSubmit,
}: ManageCodeProps) {
  const router = useRouter();
  const pathname = usePathname();

  // FormData Handling
  const { register, handleSubmit, setValue } = useForm<Code>();
  const onValid = (data: Code) => {
    // 빈 값 필터링
    if (
      data.title &&
      data.difficulty &&
      data.algorithm &&
      content !== "<p></p>" &&
      value.length !== 0
    ) {
      const newData: CodeDetail = {
        code: { ...data, content },
        testcases: JSON.parse(value),
      };
      onSubmit(newData);
    } else {
    }
  };

  // 에디터 초기값 설정
  const { content, setContent } = useTiptapStore();
  const { value, setValue: setTestcase, setLanguage } = useCodingTestStore();
  const [isLoading, setIsLoading] = useState(true);
  const [selection, setSelection] = useState({ difficulty: "", algorithm: "" });
  useEffect(() => {
    setIsLoading(true);
    if (code) {
      setContent(code.content);
      const difficulty = DIFFICULTY_LIST.find(
        (el) => el.selection === code.difficulty
      );
      const algorithm = ALGORITHM_LIST.find(
        (el) => el.selection === code.algorithm
      );
      setValue("title", code.title);
      setValue(
        "difficulty",
        difficulty?.selection as
          | "LEVEL1"
          | "LEVEL2"
          | "LEVEL3"
          | "LEVEL4"
          | "LEVEL5"
      );
      setValue("algorithm", algorithm?.selection || "");
      setSelection({
        difficulty: difficulty?.content || "",
        algorithm: algorithm?.content || "",
      });
    }

    setLanguage({ content: "", selection: "json" });
    if (testcases) {
      setTestcase(JSON.stringify(testcases, null, 2));
    } else {
      setTestcase(JSON.stringify([{ input: "", output: "" }], null, 2));
    }
    setIsLoading(false);
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(onValid)} className="flex flex-col gap-8">
        <input
          {...register("title")}
          className="post-input"
          placeholder="제목을 입력해주세요"
        />
        {/* 난이도 / 알고리즘 설정 */}
        <div className="edit-container">
          <span className="edit-title">분류</span>
          <div className="flex gap-4">
            <DropDown
              selection={selection.difficulty}
              onSelectionClick={(selected) => {
                setValue(
                  "difficulty",
                  selected.selection as
                    | "LEVEL1"
                    | "LEVEL2"
                    | "LEVEL3"
                    | "LEVEL4"
                    | "LEVEL5"
                );
                setSelection((prev) => ({
                  ...prev,
                  difficulty: selected.content,
                }));
              }}
              placeholder="난이도"
              list={DIFFICULTY_LIST}
            />
            <DropDown
              selection={selection.algorithm}
              onSelectionClick={(selected) => {
                setValue("algorithm", selected.selection);
                setSelection((prev) => ({
                  ...prev,
                  algorithm: selected.content,
                }));
              }}
              placeholder="알고리즘"
              list={ALGORITHM_LIST}
            />
          </div>
        </div>
        {/* 문제 입력 */}
        <div className="edit-container">
          <span className="edit-title">문제</span>
          <div className="h-[400px]">{!isLoading && <TiptapEditor />}</div>
        </div>
        {/* 테스트케이스 입력 */}
        <div className="edit-container">
          <span className="edit-title">
            테스트케이스 (json 형식으로 작성해주세요)
          </span>
          <div className="flex rounded-lg overflow-hidden h-[200px]">
            <CodeEditor />
          </div>
        </div>
        {/* 저장 / 취소 버튼 */}
        <div className="self-end">
          <SaveOrCancelBtn
            saveBtn={
              pathname.startsWith("/admin/code/new-code")
                ? "새 문제 생성"
                : "수정"
            }
            onCancel={() => router.back()}
          />
        </div>
      </form>
    </>
  );
}
