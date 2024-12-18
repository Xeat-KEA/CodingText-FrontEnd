"use client";

import AdminResponseDialogs from "@/app/(admin)/_components/AdminResponseDialogs";
import ManageCode from "@/app/(admin)/_components/ManageCode";
import {
  EditCodeDetail,
  ManageCodeProps,
} from "@/app/(admin)/_interfaces/interfaces";
import api from "@/app/_api/config";
import Dialog from "@/app/_components/Dialog";
import { useBase64 } from "@/app/_hooks/useBase64";
import { useCheckToken } from "@/app/_hooks/useCheckToken";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterCodePage() {
  const { codeId } = useParams();
  const { accessToken, isTokenSet } = useCheckToken("/admin/sign-in");
  const router = useRouter();

  const fetchCodeDetail = async () => {
    const response = await api.get(
      `/code-bank-service/admin/register/pendinglists/${codeId}`,
      { headers: { Authorization: accessToken } }
    );
    return response.data;
  };
  const { data } = useQuery<ManageCodeProps>({
    queryKey: ["codeDetail", isTokenSet],
    queryFn: fetchCodeDetail,
    select: (data) => {
      if (data.code) {
        data.code.content = useBase64("decode", data.code.content);
      }
      return data;
    },
    enabled: !!accessToken,
  });

  const [isDialogOpen, setIsDialogOpen] = useState({
    submit: false,
    error: false,
    done: false,
  });

  const postData = async (newData: EditCodeDetail) => {
    try {
      const response = await api.put(
        `/code-bank-service/admin/register/${codeId}/permit`,
        newData,
        {
          headers: { Authorization: accessToken },
        }
      );
      setIsDialogOpen((prev) => ({
        ...prev,
        submit: !prev.submit,
        done: !prev.done,
      }));
      setTempData(null);
    } catch (err) {
      setIsDialogOpen((prev) => ({
        ...prev,
        submit: !prev.submit,
        error: !prev.error,
      }));
    }
  };

  const [tempData, setTempData] = useState<EditCodeDetail | null>();
  const onSubmit = (newData: EditCodeDetail) => {
    setTempData(newData);
    setIsDialogOpen((prev) => ({ ...prev, submit: !prev.submit }));
  };

  const onError = () =>
    setIsDialogOpen((prev) => ({ ...prev, error: !prev.error }));

  const onDone = () => {
    setIsDialogOpen((prev) => ({ ...prev, done: !prev.done }));
    router.push("/admin/code");
  };

  return (
    <>
      <ManageCode
        code={data?.code}
        testcases={data?.testcases}
        onEdit={onSubmit}
      />
      {/* 문제 생성 / 수정 완료 */}
      {isDialogOpen.submit && (
        <Dialog
          title={"문제를 정식으로 등록할까요?"}
          isTitleSm
          backBtn="취소"
          onBackBtnClick={() => {
            setIsDialogOpen((prev) => ({ ...prev, submit: !prev.submit }));
            setTempData(null);
          }}
          primaryBtn="등록"
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
