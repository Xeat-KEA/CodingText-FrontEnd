"use client";

import AdminListCard from "@/app/(admin)/_components/AdminListCard";
import AdminListTopBar from "@/app/(admin)/_components/AdminListTopBar";
import AdminRequestCard from "@/app/(admin)/_components/AdminRequestCard";
import { ADMIN_MANAGEMENT_TAB } from "@/app/(admin)/_constants/constants";
import { Admin } from "@/app/(admin)/_interfaces/interfaces";
import api from "@/app/_api/config";
import TabBar from "@/app/_components/TapBar/TabBar";
import { useCheckToken } from "@/app/_hooks/useCheckToken";
import { useTabStore } from "@/app/stores";
import { useQuery } from "@tanstack/react-query";

export default function AdminManagementPage() {
  const { tab } = useTabStore();
  const { accessToken, isTokenSet } = useCheckToken("/admin/sign-in");

  const fetchAdminList = async () => {
    if (accessToken) {
      const response = await api.get("/admin-service/admins/list", {
        headers: { Authorization: accessToken },
      });
      return response.data;
    } else {
      return null;
    }
  };
  const { data } = useQuery<Admin[]>({
    queryKey: ["adminList", isTokenSet, tab],
    queryFn: fetchAdminList,
    select: (data) => {
      if (tab === "관리자") {
        return data.filter((el) => el.adminRole !== "NONE");
      } else {
        return data.filter((el) => el.adminRole === "NONE");
      }
    },
  });

  return (
    <div className="flex flex-col">
      <TabBar menuList={ADMIN_MANAGEMENT_TAB} />
      <AdminListTopBar tab={tab || "관리자"} />
      <div className="flex flex-col divide-y divide-border-2">
        {tab === "관리자"
          ? data?.map((el) => (
              <AdminListCard
                key={el.id}
                id={el.id}
                email={el.email}
                adminRole={el.adminRole}
              />
            ))
          : data?.map((el) => (
              <AdminRequestCard key={el.id} id={el.id} email={el.email} />
            ))}
      </div>
    </div>
  );
}
