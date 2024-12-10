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
import { useCheckToken } from "@/app/_hooks/useCheckToken";
import { useQuery } from "@tanstack/react-query";

export default function AdminNoticeDetailContainer() {
  const { accessToken, isTokenSet } = useCheckToken("/admin/sign-in");

  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();

  // 방식 수정 필요
  const isAdmin = pathname.includes("/admin");

  const [currentNotice, setCurrentNotice] = useState<Notice | null>(null);

  // API 호출
  const fetchNoticeData = async () => {
    if (!accessToken) return null;
    const response = await api.get(
      `/admin-service/admins/announce/${params.id}`,
      { headers: { Authorization: accessToken } }
    );

    console.log(response);
    setCurrentNotice(response.data);
    return response.data.content;
  };
  const { data: noticData } = useQuery({
    queryKey: ["noticeData"],
    queryFn: fetchNoticeData,
  });

  // 기존 공지사항 내용 디코딩 결과 -> 현재 인코딩 안된 상태로 전달됨
  // const contentDe =
  //   currentNotice && useBase64("decode", currentNotice.content || "");

  const contentDe = currentNotice?.content;

  const [noticeData, setNoticeData] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const { content, setContent } = useTiptapStore();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [noticeToDelete, setNoticeToDelete] = useState<number | null>(null);

  useEffect(() => {
    if (contentDe) {
      setNoticeData(contentDe);
    }
  }, [currentNotice]);

  // 로직 추가 예정
  const onClickDeleteNotice = (id: number) => {
    setNoticeToDelete(id);
    setIsDeleteDialogOpen(true);
  };
  const confirmDeleteNotice = () => {
    if (noticeToDelete === null) return;
    setIsDeleteDialogOpen(false);
    setNoticeToDelete(null);
    router.push(`/admin/notice`);
  };

  return (
    <div className="top-container">
      <div className="flex flex-col w-full max-w-[800px] min-h-screen gap-6">
        <BackBtn
          title="공지사항 내역으로"
          onClick={() => router.push("/admin/notice", { scroll: false })}
        />

        <div className="flex flex-col gap-2">
          <div className="w-full text-sm text-body font-regular flex justify-between">
            <span>공지사항</span>
            <span>{useCalculateDate(currentNotice?.createdDate || "")}</span>
          </div>

          <div className="flex w-full text-xl font-semibold">
            <p className="text-black line-clamp-2">{currentNotice?.title}</p>
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
            onSubmit={() => {
              if (content !== "<p></p>") {
                setNoticeData(content);
                setIsEditing((prev) => !prev);
              }
            }}
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
          title="공지사항 내역으로"
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
  );
}
