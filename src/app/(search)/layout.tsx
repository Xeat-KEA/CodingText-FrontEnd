import TopBar from "@/app/_components/TopBar/TopBar";
import { Suspense } from "react";

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TopBar />
      {/* useSearchParams()를 클라이언트 사이드에서 작동하도록 함 */}
      <Suspense>{children}</Suspense>
    </>
  );
}
