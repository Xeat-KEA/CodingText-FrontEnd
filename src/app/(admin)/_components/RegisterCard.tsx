import { SmShowMoreIcon } from "@/app/(blog)/_components/Icons";
import { useGetYMD } from "@/app/_hooks/useGetYMD";
import { useEffect, useState } from "react";
import DOMPurify from "isomorphic-dompurify";
import {
  useCodingTestStore,
  useRegisterStore,
  useTiptapStore,
  useTokenStore,
} from "@/app/stores";
import CodeEditor from "@/app/(coding-test)/_components/CodeEditor";
import { SmLinkArrowIcon } from "@/app/_components/Icons";
import { useRouter } from "next/navigation";
import { CodeDetail } from "../_interfaces/interfaces";
import { useBase64 } from "@/app/_hooks/useBase64";
import api from "@/app/_api/config";

export default function RegisterCard({
  nickName,
  code,
  testcases,
}: CodeDetail) {
  const router = useRouter();
  const { accessToken } = useTokenStore();

  const [isOpened, setIsOpened] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // 테스트케이스용 코드 에디터 언어 설정
  const { setLanguage } = useCodingTestStore();
  useEffect(() => {
    setLanguage({ content: "json", selection: "json" });
  }, []);
  const jsonTestCases = JSON.stringify(testcases, null, 2);

  // 등록 거부 처리
  const onClickDeny = async () => {
    setIsProcessing(true); // 요청 진행 상태 설정
    try {
      const response = await api.put(
        `/code-bank-service/admin/register/${code.codeId}/refused`,
        {},
        {
          headers: { Authorization: accessToken },
        }
      );

      console.log(response);
      if (response.status === 200) {
        alert("등록이 거부되었습니다."); // 성공 메시지
        // TODO: 필요한 추가 UI 업데이트
      } else {
        alert("등록 거부에 실패했습니다."); // 실패 메시지
      }
    } catch (error) {
      console.error(error);
      alert("오류가 발생했습니다."); // 에러 메시지
    } finally {
      setIsProcessing(false); // 요청 완료 상태 설정
    }
  };

  return (
    <div className="flex flex-col gap-2 px-2 py-3">
      {/* 건의된 문제 정보 */}
      <div className="w-full flex">
        <span className="w-[80px] shrink-0 flex-center text-xs text-body">
          {useGetYMD(code.createdAt)}
        </span>
        <span className="w-[100px] shrink-0 flex-center text-xs font-bold text-black">
          {nickName}
        </span>
        <span className="w-full grow text-xs text-black">{code.title}</span>
      </div>
      {/* 문제 열기 / 닫기 버튼 */}
      <button
        onClick={() => setIsOpened((prev) => !prev)}
        className="flex gap-1 items-center w-fit">
        <div className={isOpened ? "rotate-90" : ""}>
          <SmShowMoreIcon isHidden={true} />
        </div>
        <span className="text-xs font-semibold text-body">문제 펼쳐보기</span>
      </button>
      {/* 문제 상세 내용 표시 */}
      {isOpened && (
        <div className="flex flex-col gap-6 px-2 py-4">
          {/* 문제 내용 표시 */}
          <div className="edit-container">
            <span className="edit-title">문제</span>
            <div
              className="prose sign-in-input"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(useBase64("decode", code.content)),
              }}
            />
          </div>
          {/* 테스트케이스 표시 */}
          <div className="edit-container">
            <span className="edit-title">테스트케이스</span>
            <div className="rounded-lg overflow-hidden">
              <CodeEditor defaultValue={jsonTestCases} isViewer />
            </div>
          </div>
          <div className="w-full justify-between flex items-center">
            {/* 문제 생성 버튼 */}
            <button
              onClick={onClickDeny}
              className="flex gap-2 items-center w-fit">
              <span className="edit-btn-red">
                {isProcessing ? "처리 중..." : "등록 거부"}
              </span>{" "}
            </button>
            {/* 문제 생성 버튼 */}
            <button
              onClick={() => router.push(`/admin/code/register/${code.codeId}`)}
              className="flex gap-2 items-center w-fit">
              <span className="edit-btn-primary">새 문제 생성으로 이동</span>
              <SmLinkArrowIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
