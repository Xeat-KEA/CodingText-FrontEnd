import TopBar from "@/app/_components/TopBar";
import ProfileSideBar from "../_components/ProfileSideBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TopBar />
      <div className="w-full flex justify-center h-screen pt-16 overflow-hidden">
        <div className="max-w-1200 flex p-12">
          <ProfileSideBar />
          {children}
        </div>
      </div>
    </>
  );
}
