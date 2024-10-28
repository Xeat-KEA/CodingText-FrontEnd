import TopBar from "@/app/_components/TopBar/TopBar";
import ProfileSideBar from "../_components/ProfileSideBar";

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
          <ProfileSideBar />
          {children}
        </div>
      </div>
    </>
  );
}
