"use client";

import AdminResponseDialogs from "@/app/(admin)/_components/AdminResponseDialogs";
import ManageCode from "@/app/(admin)/_components/ManageCode";
import { CodeDetail } from "@/app/(admin)/_interfaces/interfaces";
import api from "@/app/_api/config";
import Dialog from "@/app/_components/Dialog";
import { useCheckToken } from "@/app/_hooks/useCheckToken";
import { useTiptapStore } from "@/app/stores";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NewCodePage() {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState({
    submit: false,
    error: false,
    done: false,
  });

  const { accessToken } = useCheckToken("/admin/sign-in");
  const postData = async (newData: CodeDetail) => {
    try {
      const response = await api.post("/code-bank-service/admin/add", newData, {
        headers: { Authorization: accessToken },
      });
      setIsDialogOpen((prev) => ({ ...prev, done: !prev.done }));
      setTempData(null);
    } catch (err) {
      setIsDialogOpen((prev) => ({ ...prev, error: !prev.error }));
    }
  };

  const [tempData, setTempData] = useState<CodeDetail | null>();
  const onSubmit = (newData: CodeDetail) => {
    setTempData(newData);
    setIsDialogOpen((prev) => ({ ...prev, submit: !prev.submit }));
  };

  const onError = () =>
    setIsDialogOpen((prev) => ({ ...prev, error: !prev.error }));

  const onDone = () => {
    setIsDialogOpen((prev) => ({ ...prev, done: !prev.done }));
    router.push("/admin/code");
  };

  const { content, setContent } = useTiptapStore();
  useEffect(() => {
    setContent("");
  }, []);

  return (
    <>
      <ManageCode key={content} onAdd={onSubmit} />
      {/* 문제 생성 / 수정 완료 */}
      {isDialogOpen.submit && (
        <Dialog
          title={"새 문제를 생성할까요?"}
          isTitleSm
          backBtn="취소"
          onBackBtnClick={() => {
            setIsDialogOpen((prev) => ({ ...prev, submit: !prev.submit }));
            setTempData(null);
          }}
          primaryBtn="생성"
          onBtnClick={() => tempData && postData(tempData)}
        />
      )}
      <AdminResponseDialogs
        isDone={isDialogOpen.done}
        isError={isDialogOpen.error}
        onDone={onDone}
        onError={onError}
      />
    </>
  );
}
