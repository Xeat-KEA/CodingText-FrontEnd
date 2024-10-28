"use client";

import ProfileSideBar from "@/app/_components/ProfileSideBar";
import { ADMIN_TAB_LIST } from "../_constants/constants";
import SmBackBtn from "@/app/_components/SmBackBtn";
import { useRouter } from "next/navigation";

export default function AdminLayoutContainer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  // 관리자 로그아웃
  const onClick = () => {
    // 토큰 삭제 로직 추가 필요

    router.push("/admin/sign-in");
  };
  return (
    <>
      <div className="top-container h-screen overflow-hidden flex flex-col items-center gap-6 py-12">
        <div className="max-w-1200 h-full flex flex-col gap-6">
          <div className="">
            <SmBackBtn content="로그아웃" onClick={onClick} />
          </div>
          <div className="h-full flex">
            <ProfileSideBar menuList={ADMIN_TAB_LIST} />
            <div className="w-full flex flex-col gap-8 px-6 overflow-y-auto">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
