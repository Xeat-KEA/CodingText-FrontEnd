import DropDown from "@/app/_components/DropDown";
import SaveOrCancelBtn from "@/app/_components/SaveOrCancelBtn";
import TiptapEditor from "@/app/_components/TipTapEditor/TiptapEditor";
import { useRouter } from "next/navigation";
import { ManageCodeProps } from "../_interfaces/interfaces";
import { useEffect, useState } from "react";
import { ALGORITHM_LIST, DIFFICULTY_LIST } from "@/app/_constants/constants";
import { useForm } from "react-hook-form";
import { CodeDetail } from "@/app/_interfaces/interfaces";
import CodeEditor from "@/app/(coding-test)/_components/CodeEditor";
import { useCodingTestStore, useTiptapStore } from "@/app/stores";
import Dialog from "@/app/_components/Dialog";
import { DialogCheckIcon } from "@/app/_components/Icons";
import api from "@/app/_api/config";
import { useQuery } from "@tanstack/react-query";
import { useInitiateEditor } from "@/app/_hooks/useInitiateEditor";

export default function ManageCode({ codeId }: ManageCodeProps) {
  const router = useRouter();

  const { handleSubmit, setValue, watch } = useForm<CodeDetail>();
  const onValid = (data: CodeDetail) => {
    // 빈 값 필터링
    if (
      data.difficulty &&
      data.algorithm &&
      content !== "<p></p>" &&
      value.length !== 0
    ) {
      const newData: CodeDetail = {
        ...data,
        content: content,
        testcase: value,
      };
      // newData POST 필요

      console.log(newData);
      setIsDone((prev) => !prev);
    } else {
    }
  };

  // 문제 수정일 경우 문제 데이터 GET
  const fetchData = async () => {
    const response = await api.get(`/admin/${codeId}`);
    return response.data;
  };
  const { data } = useQuery({ queryKey: ["codeDetail"], queryFn: fetchData });
  const dummy: CodeDetail = {
    difficulty: "1",
    algorithm: "입출력",
    content: `<h3>문제 : 최단 거리 구하기</h3>
<p>두 노드 간의 최단 거리를 구하세요.</p>
<ul>
  <li><p>조건 1 : 노드는 0부터 N-1까지의 번호를 가집니다.</p></li>
  <li><p>조건 2 : 간선은 방향성이 없으며, 양방향으로 이동 가능합니다.</p></li>
  <li><p>조건 3 : 특정 노드에서 출발하여 다른 모든 노드로 가는 최단 거리를 구하세요.</p></li>
  <li><p>조건 4 : 간선은 가중치가 1입니다.</p></li>
</ul>`,
    testcase: { input: "1 2", output: "3" },
  };

  // 에디터 초기값 설정
  const { content } = useTiptapStore();
  const { setLanguage, value } = useCodingTestStore();
  const initiateEditor = useInitiateEditor();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    // 코드 에디터 언어 JSON으로 설정
    setLanguage({ content: "json", selection: "json" });
    if (codeId) {
      // 문제 수정일 경우 초기값 설정
      setValue("difficulty", dummy.difficulty);
      setValue("algorithm", dummy.algorithm);
      initiateEditor("text", dummy.content);
      initiateEditor("code", JSON.stringify(dummy.testcase));
      // 초기값 설정 끝난 뒤 isLoaded 설정
      setIsLoaded(true);
    } else {
      // 문제 생성일 경우 초기값 전부 초기화 후 isLoaded 설정
      initiateEditor("both");
      setIsLoaded(true);
    }
  }, []);

  const [isDone, setIsDone] = useState(false);

  return (
    <>
      <form onSubmit={handleSubmit(onValid)} className="flex flex-col gap-8">
        {/* 난이도 / 알고리즘 설정 */}
        <div className="edit-container">
          <span className="edit-title">분류</span>
          <div className="flex gap-4">
            <DropDown
              selection={
                watch("difficulty") ? `${watch("difficulty")}단계` : ""
              }
              onSelectionClick={(selected) =>
                setValue("difficulty", selected.content)
              }
              placeholder="난이도"
              list={DIFFICULTY_LIST}
            />
            <DropDown
              selection={watch("algorithm")}
              onSelectionClick={(selected) =>
                setValue("algorithm", selected.content)
              }
              placeholder="알고리즘"
              list={ALGORITHM_LIST}
            />
          </div>
        </div>
        {/* 문제 입력 */}
        <div className="edit-container">
          <span className="edit-title">문제</span>
          <div className="h-[400px]">{isLoaded && <TiptapEditor />}</div>
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
            saveBtn={!codeId ? "새 문제 생성" : "수정"}
            onCancel={() => router.back()}
          />
        </div>
      </form>
      {/* 문제 생성 / 수정 완료 */}
      {isDone && (
        <Dialog
          icon={<DialogCheckIcon />}
          title={`문제가 ${!codeId ? "생성" : "수정"}되었어요`}
          backBtn="확인"
          onBackBtnClick={() => router.push("/admin/code")}
          blockOutsideClick
        />
      )}
    </>
  );
}
