import TopBar from "@/app/_components/TopBar/TopBar";

export default function NoticeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TopBar />
      {children}
    </>
  );
}
