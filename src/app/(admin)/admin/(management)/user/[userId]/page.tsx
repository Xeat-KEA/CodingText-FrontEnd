"use client";

import UserDetailInfo from "@/app/(admin)/_components/UserDetailInfo";
import { AdminUserDetail } from "@/app/(admin)/_interfaces/interfaces";
import api from "@/app/_api/config";
import SaveOrCancelBtn from "@/app/_components/SaveOrCancelBtn";
import { useCheckToken } from "@/app/_hooks/useCheckToken";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";

export default function UserManagementDetailPage() {
  const { accessToken, isTokenSet } = useCheckToken("/admin/sign-in");
  const router = useRouter();
  const { userId } = useParams();

  const onCancel = () => {
    router.push(`/admin/user`);
  };

  const fetchUserInfo = async () => {
    if (accessToken) {
      const response = await api.get(`/user-service/users/init/${userId}`, {
        headers: { Authorization: accessToken },
      });
      return response.data;
    } else {
      return null;
    }
  };
  const { data } = useQuery<AdminUserDetail>({
    queryKey: ["userDetail", isTokenSet],
    queryFn: fetchUserInfo,
  });

  return (
    <>
      {/* 사용자 상세 정보 및 초기화 페이지 */}
      <div className="flex flex-col gap-8 py-8 border-t border-border-2">
        {data && <UserDetailInfo userDetail={data} />}
        <SaveOrCancelBtn saveBtn="변경 사항 저장" onCancel={onCancel} />
      </div>
    </>
  );
}
