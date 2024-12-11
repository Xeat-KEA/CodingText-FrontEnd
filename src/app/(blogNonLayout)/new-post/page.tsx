import NewPostContainer from "@/app/(blog)/_components/NewPostContainer";
import { Suspense } from "react";

export default function NewPostPage() {
  return (
    <Suspense>
      <NewPostContainer />
    </Suspense>
  );
}
