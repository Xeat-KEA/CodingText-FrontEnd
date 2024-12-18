"use client";
import AdminNoticeDetailContainer from "@/app/(admin)/_components/AdminNoticeDetailContainer";
import { useCheckToken } from "@/app/_hooks/useCheckToken";

export default function AdminNoticeDetailPage() {
  const { accessToken, isTokenSet } = useCheckToken("/admin/sign-in");

  return (
    <>
      <AdminNoticeDetailContainer />
    </>
  );
}
