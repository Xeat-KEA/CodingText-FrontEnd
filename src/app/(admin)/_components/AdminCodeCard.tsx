import { Code } from "@/app/(code)/_interfaces/interfaces";
import Dialog from "@/app/_components/Dialog";
import IconBtn from "@/app/_components/IconBtn";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminCodeCard({ code }: { code: Code }) {
  const router = useRouter();

  const [isDeleting, setIsDeleting] = useState(false);
  const onDelete = () => {
    // 문제 삭제 API POST 필요

    setIsDeleting((prev) => !prev);
  };

  return (
    <>
      <div className="w-full px-2 py-4 flex items-center relative">
        <div className="w-[60px] text-xs font-semibold text-primary-1 flex-center whitespace-nowrap shrink-0">
          #{code.codeId}
        </div>
        <span className="w-full grow text-sm text-black whitespace-nowrap">
          {code.title}
        </span>
        <div className="flex gap-4 absolute right-2 top-1/2 -translate-y-1/2">
          <IconBtn
            type="edit"
            content="수정"
            onClick={() => router.push(`/admin/code/${code.codeId}`)}
          />
          <IconBtn
            type="delete"
            content="삭제"
            onClick={() => setIsDeleting((prev) => !prev)}
          />
        </div>
      </div>
      {isDeleting && (
        <Dialog
          title="문제를 삭제할까요?"
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
