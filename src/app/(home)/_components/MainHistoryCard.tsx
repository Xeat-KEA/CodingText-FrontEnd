import Link from "next/link";
import { useState } from "react";
import Dialog from "@/app/_components/Dialog";
import { DialogCheckIcon, DialogXIcon } from "@/app/_components/Icons";
import { History } from "@/app/(code)/_interfaces/interfaces";
import api from "@/app/_api/config";
import { useTokenStore } from "@/app/stores";
import { isAxiosError } from "axios";

export default function MainHistoryCard({ history }: { history: History }) {
  const { accessToken } = useTokenStore();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false);

  const onRegister = async () => {
    try {
      const response = await api.post(
        `/code-bank-service/code/history/register/${history.codeId}`,
        {},
        { headers: { Authorization: accessToken } }
      );
      if (response.status === 200) {
        setIsRegistered((prev) => !prev);
      }
    } catch (err) {
      if (isAxiosError(err)) {
        if (err.response?.status === 400) {
          setIsDialogOpen(false);
          setIsAlreadyRegistered((prev) => !prev);
        }
      }

      console.log(err);
    }
  };

  return (
    <>
      <div className="w-full h-[36px] flex justify-between items-center gap-1">
        <div className="w-full flex overflow-hidden">
          {/* 문제 번호 / AI 생성 여부 */}
          <div className="w-[60px] flex items-center shrink-0">
            <button className="code-card-code-number">
              {history.isCreatedByAI ? "AI 생성" : `#${history.codeId}`}
            </button>
          </div>
          {/* 문제 제목 */}
          <span className="w-full text-black overflow-hidden whitespace-nowrap text-ellipsis">
            {history.codeTitle}
          </span>
        </div>
        <div className="flex">
          <div className="flex gap-2">
            {/* AI 생성 문제일 시 정식 등록 건의 버튼 활성화 */}
            {history.isCreatedByAI && (
              <button
                onClick={() => setIsDialogOpen((prev) => !prev)}
                className="text-xs font-semibold text-disabled whitespace-nowrap hover:underline"
              >
                정식 등록 건의
              </button>
            )}
            {/* 문제 다시 풀어보기 */}
            <Link
              href={`/coding-test/${history.codeId}`}
              className="text-xs font-semibold text-black whitespace-nowrap hover:underline"
            >
              다시 풀어보기
            </Link>
          </div>
          {/* 정답 여부 */}
          <span
            className={`w-12 text-xs font-bold text-center ${
              history.isCorrect ? "text-green" : "text-red"
            }`}
          >
            {history.isCorrect ? "정답" : "오답"}
          </span>
        </div>
      </div>
      {/* 정식 등록 버튼 클릭 시의 팝업 */}
      {isDialogOpen &&
        (!isRegistered ? (
          <Dialog
            title={"문제 정식 등록을\n건의할까요?"}
            content={
              "검토 후 문제가 정식으로 등록되면\n모든 사람들이 이 문제를 풀어볼 수 있어요"
            }
            backBtn="취소"
            onBackBtnClick={() => setIsDialogOpen((prev) => !prev)}
            primaryBtn="정식 등록 건의"
            onBtnClick={onRegister}
          />
        ) : (
          <Dialog
            icon={<DialogCheckIcon />}
            title="건의해주셔서 감사해요"
            content={"검토 후 문제가 정식으로 등록되면\n알림을 보내드릴게요"}
            backBtn="확인"
            onBackBtnClick={() => {
              setIsDialogOpen((prev) => !prev);
              setIsRegistered((prev) => !prev);
            }}
          />
        ))}
      {isAlreadyRegistered && (
        <Dialog
          icon={<DialogXIcon />}
          title={"이미 등록 신청된\n문제예요"}
          backBtn="확인"
          onBackBtnClick={() => setIsAlreadyRegistered((prev) => !prev)}
        />
      )}
    </>
  );
}
