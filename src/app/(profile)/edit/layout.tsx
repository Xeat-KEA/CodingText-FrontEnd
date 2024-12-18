import ProfileSideBar from "@/app/_components/ProfileSideBar";
import TopBar from "@/app/_components/TopBar/TopBar";
import { PROFILE_TAB_LIST } from "../_constants/constants";

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TopBar />
      <div className="top-container h-screen pt-16 overflow-hidden">
        <div className="max-w-1200 flex p-12">
          <ProfileSideBar menuList={PROFILE_TAB_LIST} />
          <div className="w-full flex flex-col gap-8 px-6 pt-2 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
