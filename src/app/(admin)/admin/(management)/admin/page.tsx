"use client";

import AdminListCard from "@/app/(admin)/_components/AdminListCard";
import AdminListTopBar from "@/app/(admin)/_components/AdminListTopBar";
import AdminRequestCard from "@/app/(admin)/_components/AdminRequestCard";
import { ADMIN_MANAGEMENT_TAB } from "@/app/(admin)/_constants/constants";
import TabBar from "@/app/_components/TapBar/TabBar";
import { useTabStore } from "@/app/stores";

export default function AdminManagementPage() {
  const { tab } = useTabStore();

  const dummyAdmin = [
    { email: "admin1@gachon.ac.kr", role: "root" },
    { email: "admin2@gachon.ac.kr", role: "normal" },
    { email: "admin3@gachon.ac.kr", role: "normal" },
    { email: "admin4@gachon.ac.kr", role: "normal" },
    { email: "admin5@gachon.ac.kr", role: "normal" },
  ];
  const dummyRequest = [
    { email: "admin6@gachon.ac.kr" },
    { email: "admin7@gachon.ac.kr" },
    { email: "admin8@gachon.ac.kr" },
    { email: "admin9@gachon.ac.kr" },
    { email: "admin10@gachon.ac.kr" },
  ];

  return (
    <div className="flex flex-col">
      <TabBar menuList={ADMIN_MANAGEMENT_TAB} />
      <AdminListTopBar tab={tab || "관리자"} />
      <div className="flex flex-col divide-y divide-border-2">
        {tab === "관리자" || !tab
          ? dummyAdmin.map((el, index) => (
              <AdminListCard key={index} email={el.email} role={el.role} />
            ))
          : dummyRequest.map((el, index) => (
              <AdminRequestCard key={index} email={el.email} />
            ))}
      </div>
    </div>
  );
}
