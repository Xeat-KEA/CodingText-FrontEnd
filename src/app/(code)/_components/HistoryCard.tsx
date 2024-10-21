import { History } from "../_interfaces/interfaces";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetYMD } from "@/app/_hooks/useGetYMD";
import Dialog from "@/app/_components/Dialog";
import { DialogCheckIcon } from "@/app/_components/Icons";

export default function HistoryCard({
  id,
  title,
  hasSolved,
  createdAt,
}: History) {
  const router = useRouter();

  const [isMounted, setisMounted] = useState(false);
  useEffect(() => {
    setisMounted(true);
  }, []);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  return (
    isMounted && (
      <>
        <div className="w-full px-2 py-4 flex justify-between items-center gap-4">
          <div className="w-full flex gap-2 items-center">
            <span className="w-20 text-xs text-body list-text">
              {useGetYMD(createdAt)}
            </span>
            <span
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                if (id !== null) {
                  router.push(
                    `/search?keyword=${id}&tab=POST&category=CODE&order=ACCURACY`,
                    { scroll: false }
                  );
                }
              }}
              className="w-[60px] text-xs font-semibold text-primary list-text cursor-pointer hover:underline"
            >
              {id !== null ? `#${id}` : "AI 생성"}
            </span>
            <div className="w-full grow text-sm text-black">{title}</div>
          </div>
          <div className="flex">
            <div className="flex gap-2">
              {id === null && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setIsDialogOpen((prev) => !prev);
                  }}
                  className="text-xs text-disabled font-semibold whitespace-nowrap"
                >
                  정식 등록 건의
                </button>
              )}
              <button
                onClick={() => {
                  // AI 문제의 경우 다른 로직 필요

                  router.push(`/coding-test/${id}`, { scroll: false });
                }}
                className="text-xs text-black font-semibold whitespace-nowrap"
              >
                다시 풀어보기
              </button>
            </div>
            <div
              className={`w-12 text-xs font-bold list-text ${
                hasSolved ? "text-green" : "text-red"
              }`}
            >
              {hasSolved ? "정답" : "오답"}
            </div>
          </div>
        </div>
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
              onBtnClick={() => {
                // 문제 등록 신청 POST 로직 필요

                setIsRegistered((prev) => !prev);
              }}
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
      </>
    )
  );
}
