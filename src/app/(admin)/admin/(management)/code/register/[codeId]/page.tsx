"use client";

import ManageCode from "@/app/(admin)/_components/ManageCode";
import {
  CodeDetail,
  ManageCodeProps,
} from "@/app/(admin)/_interfaces/interfaces";
import api from "@/app/_api/config";
import { useCheckToken } from "@/app/_hooks/useCheckToken";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function RegisterCodePage() {
  const { codeId } = useParams();
  const { accessToken, isTokenSet } = useCheckToken("/admin/sign-in");

  const fetchCodeDetail = async () => {
    if (accessToken) {
      const response = await api.get(
        `/code-bank-service/admin/register/pendinglists/${codeId}`,
        { headers: { Authorization: accessToken } }
      );
      return response.data.codeWithTestcases;
    } else {
      return null;
    }
  };
  const { data } = useQuery<ManageCodeProps>({
    queryKey: ["codeDetail", isTokenSet],
    queryFn: fetchCodeDetail,
  });

  const onSubmit = (newData: CodeDetail) => {};

  return (
    <ManageCode
      code={data?.code}
      testcases={data?.testcases}
      onSubmit={onSubmit}
    />
  );
}
