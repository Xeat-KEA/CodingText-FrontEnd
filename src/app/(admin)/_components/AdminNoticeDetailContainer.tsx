import api from "@/app/_api/config";
import BackBtn from "@/app/_components/BackBtn";
import { useParams, usePathname, useRouter } from "next/navigation";
import DOMPurify from "isomorphic-dompurify";
import { useCalculateDate } from "@/app/_hooks/useCalculateDate";
import { useBase64 } from "@/app/_hooks/useBase64";
import { useEffect, useState } from "react";
import { useTiptapStore } from "@/app/stores";
import TiptapEditor from "@/app/_components/TipTapEditor/TiptapEditor";
import NoticeEditBtn from "./NoticeEditBtn";
import IconBtn from "@/app/_components/IconBtn";
import Dialog from "@/app/_components/Dialog";
import { Notice } from "../_interfaces/interfaces";
import { NoticeForm } from "@/app/_interfaces/interfaces";
import { useCheckToken } from "@/app/_hooks/useCheckToken";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

export default function AdminNoticeDetailContainer() {
  const { accessToken, isTokenSet } = useCheckToken("/admin/sign-in");

  const router = useRouter();
  const params = useParams();

  const [currentNotice, setCurrentNotice] = useState<Notice | null>(null);
  const [noticeData, setNoticeData] = useState("");
  const [noticeTitle, setNoticeTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const { content, setContent } = useTiptapStore();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [noticeToDelete, setNoticeToDelete] = useState<number | null>(null);

  const { register, handleSubmit, setValue } = useForm<NoticeForm>({
    defaultValues: {
      title: noticeTitle,
      content: noticeData,
    },
  });

  // API 호출
  const fetchNoticeData = async () => {
    if (!accessToken) return null;
    const response = await api.get(
      `/admin-service/admins/announce/${params.id}`,
      { headers: { Authorization: accessToken } }
    );
    setCurrentNotice(response.data);
    return response.data;
  };
  const { data, isLoading } = useQuery({
    queryKey: ["noticeData", isTokenSet],
    queryFn: fetchNoticeData,
  });

  const contentDe = data?.content ? useBase64("decode", data.content) : "";

  useEffect(() => {
    if (contentDe) {
      setNoticeData(contentDe);
      setNoticeTitle(data.title);
      setValue("title", data.title);
      setValue("content", contentDe);
    }
  }, [data]);

  // 수정된 내용으로 공지사항 업데이트
  const onValid = async (formData: NoticeForm) => {
    const encodedContent = useBase64("encode", content);
    const updatedNotice = {
      announceId: Number(params.id),
      title: formData.title,
      content: encodedContent,
      adminId: 1, // 관리자 ID 수정 필요
    };

    console.log(updatedNotice);
    try {
      const response = await api.put(
        `/admin-service/admins/announce`,
        updatedNotice,
        {
          headers: { Authorization: accessToken },
        }
      );

      if (response.status === 200) {
        setIsEditing(false);
        setNoticeData(content);
        setNoticeTitle(formData.title);
        router.replace(`/admin/notice/${response.data.announceId}`);
      }
      console.log(response);
    } catch (error) {
      console.error("공지사항 수정 실패:", error);
    }
  };

  // 로직 추가 예정
  const onClickDeleteNotice = (id: number) => {
    setNoticeToDelete(id);
    setIsDeleteDialogOpen(true);
  };
  const confirmDeleteNotice = () => {
    if (noticeToDelete === null) return;
    setIsDeleteDialogOpen(false);
    setNoticeToDelete(null);
    router.replace(`/admin/notice`);

    // 삭제 로직 아직 없음
    // try {
    //   const response = await api.delete(
    //     `admin-service/admins/announce/${noticeToDelete}`,
    //     {
    //       headers: {
    //         Authorization: accessToken, // 필요한 경우 토큰 추가
    //       },
    //     }
    //   );
    //   console.log(response);
    // setIsDeleteDialogOpen(false);
    // setNoticeToDelete(null);
    // router.replace(`/admin/notice`);
    // } catch (error) {
    //   console.error("공지사항 삭제 실패:", error);
    // }
  };

  return (
    <>
      {!isLoading && data && (
        <div className="top-container">
          <div className="flex flex-col w-full max-w-[800px] min-h-screen gap-6">
            <BackBtn
              title="목록으로"
              onClick={() => router.push("/admin/notice", { scroll: false })}
            />

            <div className="flex flex-col gap-2">
              <div className="w-full text-sm text-body font-regular flex justify-between">
                <span>공지사항</span>
                <span>{useCalculateDate(data?.createdDate || "")}</span>
              </div>
              <div className="flex w-full text-xl font-semibold">
                {!isEditing ? (
                  <p className="text-black line-clamp-2">{data.title}</p>
                ) : (
                  <input
                    type="text"
                    {...register("title", { required: "제목을 입력해 주세요" })}
                    onChange={(e) => setNoticeTitle(e.target.value)}
                    className="w-full text-xl font-semibold"
                  />
                )}
              </div>
            </div>

            {/* 구분선 */}
            <hr className="division" />

            {/* 공지사항 내용 */}
            {!isEditing ? (
              <div className="w-full text-black border border-border2 rounded-xl p-4">
                <div
                  className="prose"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(String(noticeData)),
                  }}
                />
              </div>
            ) : (
              <div className="h-[400px]">
                <TiptapEditor />
              </div>
            )}

            {/* 버튼 - 수정 */}
            <div className="flex w-full h-5 justify-end gap-4">
              <NoticeEditBtn
                isEditing={isEditing}
                onEditClick={() => {
                  setContent(noticeData);
                  setIsEditing((prev) => !prev);
                }}
                onCancelClick={() => {
                  setIsEditing((prev) => !prev);
                }}
                onSubmit={handleSubmit(onValid)}
              />
              {/* 버튼 - 삭제 */}
              {!isEditing && (
                <IconBtn
                  type="delete"
                  content="삭제"
                  onClick={() =>
                    onClickDeleteNotice(Number(currentNotice?.announceId))
                  }
                />
              )}
            </div>

            <BackBtn
              title="목록으로"
              onClick={() => router.push("/admin/notice", { scroll: false })}
            />
          </div>
          {/* 삭제 다이얼로그 컴포넌트 */}
          {isDeleteDialogOpen && (
            <Dialog
              title="공지사항을 삭제할까요?"
              content="삭제 후 복구할 수 없어요!"
              isWarning={isDeleteDialogOpen}
              backBtn="취소"
              onBackBtnClick={() => {
                setIsDeleteDialogOpen(false);
                setNoticeToDelete(null);
              }}
              redBtn="삭제"
              onBtnClick={confirmDeleteNotice}
            />
          )}
        </div>
      )}
    </>
  );
}
