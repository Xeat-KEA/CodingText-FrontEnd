import TopBar from "@/app/_components/TopBar/TopBar";

export default function CodingTestLayout({
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
