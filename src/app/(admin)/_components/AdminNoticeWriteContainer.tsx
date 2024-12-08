import BackBtn from "@/app/_components/BackBtn";
import Dialog from "@/app/_components/Dialog";
import { DialogCheckIcon } from "@/app/_components/Icons";
import TiptapEditor from "@/app/_components/TipTapEditor/TiptapEditor";
import { useBase64 } from "@/app/_hooks/useBase64";
import { useTiptapStore } from "@/app/stores";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NoticeForm } from "@/app/_interfaces/interfaces";
import { Notice } from "@/app/_interfaces/interfaces";
import api from "@/app/_api/config";
import { useCheckToken } from "@/app/_hooks/useCheckToken";

export default function AdminNoticeWriteContainer() {
  const { accessToken, isTokenSet } = useCheckToken("/admin/sign-in");
  const router = useRouter();
  const { content, setContent } = useTiptapStore();
  const { register, handleSubmit, setValue } = useForm<NoticeForm>({
    defaultValues: {
      title: "",
      content: "",
    },
  });
  const onValid = async (data: NoticeForm) => {
    const encodedContent = useBase64("encode", content);
    const newNotice: NoticeForm = {
      ...data,
      // content: encodedContent,
    };
    const requestBody = {
      title: newNotice.title,
      content: newNotice.content,
      adminId: 1, // 수정 필요
    };
    try {
      const response = await api.post(
        "/admin-service/admins/announce",
        requestBody,
        {
          headers: { Authorization: accessToken },
        }
      );

      console.log(requestBody);
      if (response.status === 200) {
        setIsSubmitDialogOpen(true);
        router.replace(`/admin/notice/${response.data.announceId}`);
        console.log(response);
      }
    } catch (error) {
      console.error("공지사항 등록 실패:", error);
    }
  };

  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);

  useEffect(() => {
    setContent("");
  }, []);

  return (
    <div className="top-container">
      <div className="flex flex-col w-full max-w-[800px] min-h-screen gap-6">
        <BackBtn
          title="공지사항 내역으로"
          onClick={() => router.push("/admin/notice", { scroll: false })}
        />

        <div className="flex flex-col w-full gap-2">
          {/* 공지사항, 작성 */}
          <div className="w-full text-sm text-body font-regular flex justify-start">
            <span>공지사항</span>
          </div>

          {/* 제목 */}
          <input
            className="grow post-input"
            placeholder="제목을 입력해주세요"
            autoComplete="off"
            {...register("title", { required: "제목을 입력해 주세요" })}
          />
        </div>

        {/* 공지사항 내용 */}
        <div className="h-[400px]">
          {/* <TiptapEditor /> */}
          <textarea
            className="w-full h-full p-2 border border-gray-300 rounded"
            placeholder="공지사항 내용을 입력해주세요"
            {...register("content", { required: "내용을 입력해 주세요" })}
          />{" "}
        </div>

        {/* 하단 버튼 */}
        <div className="flex gap-4 self-end">
          <button
            type="button"
            onClick={() => setIsCancelDialogOpen(true)}
            className="btn-default">
            취소
          </button>
          <button
            type="submit"
            onClick={handleSubmit(onValid)}
            className="btn-primary">
            새 공지사항 등록
          </button>
        </div>
      </div>

      {isCancelDialogOpen && (
        <Dialog
          title={"공지사항 작성을\n그만두시겠어요?"}
          content={
            "작성하던 공지사항은 저장되지 않으며\n이전 페이지로 이동해요"
          }
          backBtn="돌아가기"
          onBackBtnClick={() => setIsCancelDialogOpen((prev) => !prev)}
          redBtn="공지사항 작성 취소"
          onBtnClick={() => router.back()}
        />
      )}
      {isSubmitDialogOpen && (
        <Dialog
          icon={<DialogCheckIcon />}
          title="공지사항이 등록되었어요!"
          content="등록된 공지사항을 확인해보세요"
          backBtn="공지사항 목록으로"
          onBackBtnClick={() => router.push(`/admin/notice`, { scroll: false })}
          primaryBtn="공지사항 페이지로"
          onBtnClick={() => router.push(`/admin/notice/${1}`)}
          blockOutsideClick
        />
      )}
    </div>
  );
}
