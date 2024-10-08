import TopBar from "@/app/_components/TopBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TopBar isCodingPage isLoggedIn />
      {children}
    </>
  );
}
