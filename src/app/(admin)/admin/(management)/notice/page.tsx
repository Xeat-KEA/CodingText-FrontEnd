"use client";

import AdminNoticeContainer from "@/app/(admin)/_components/AdminNoticeContainer";
import { useCheckToken } from "@/app/_hooks/useCheckToken";

export default function AdminNoticePage() {
  const { accessToken, isTokenSet } = useCheckToken("/admin/sign-in");

  return (
    <>
      <AdminNoticeContainer />
    </>
  );
}
