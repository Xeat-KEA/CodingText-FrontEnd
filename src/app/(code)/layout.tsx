import { Suspense } from "react";
import TopBar from "../_components/TopBar/TopBar";
import CodeLayoutContainer from "./_components/CodeLayoutContainer";

export default function CodeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TopBar />
      {/* useSearchParams()를 클라이언트 사이드에서 작동하도록 함 */}
      <Suspense>
        <CodeLayoutContainer>{children}</CodeLayoutContainer>
      </Suspense>
    </>
  );
}
