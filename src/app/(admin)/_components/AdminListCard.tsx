import { SmDeleteIcon } from "@/app/(blog)/_components/Icons";
import { AdminListCardProps } from "../_interfaces/interfaces";
import { useState } from "react";
import Dialog from "@/app/_components/Dialog";

export default function AdminListCard({ email, role }: AdminListCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const onDelete = () => {
    // 삭제될 계정 서버로 POST 필요

    setIsDeleting((prev) => !prev);
  };

  return (
    <>
      <div className="w-full p-2 flex gap-4 justify-between items-center">
        <div className="w-full grow text-sm text-black">{email}</div>
        <div className="flex gap-2">
          <div className="w-[60px] flex-center text-xs text-black">
            {role === "root" ? "루트" : "일반"}
          </div>
          <div className="w-[45px] flex-center">
            {/*삭제 버튼 */}
            {role !== "root" && (
              <button
                onClick={() => setIsDeleting((prev) => !prev)}
                className="flex-center gap-1"
              >
                <SmDeleteIcon />
                <span className="text-xs font-semibold text-red">삭제</span>
              </button>
            )}
          </div>
        </div>
      </div>
      {/* 관리자 삭제 팝업 */}
      {isDeleting && (
        <Dialog
          title={`'${email}' 님을\n관리자에서 삭제할까요?`}
          isTitleSm
          content="삭제 후 복구할 수 없어요!"
          isWarning
          backBtn="취소"
          onBackBtnClick={() => setIsDeleting((prev) => !prev)}
          redBtn="삭제"
          onBtnClick={onDelete}
        />
      )}
    </>
  );
}
