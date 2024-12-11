import CodePageContainer from "@/app/(admin)/_components/CodePageContainer";
import { Suspense } from "react";

export default function AdminCodePage() {
  return (
    <Suspense>
      <CodePageContainer />
    </Suspense>
  );
}
