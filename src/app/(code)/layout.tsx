import TopBar from "../_components/TopBar";
import CodeLayout from "./_components/CodeLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TopBar />
      <CodeLayout>{children}</CodeLayout>
    </>
  );
}
