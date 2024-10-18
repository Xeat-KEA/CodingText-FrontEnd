"use client";

import PostEditor from "@/app/_components/PostEditor";
import { useRouter } from "next/navigation";

export default function NewPostPage() {
  const router = useRouter();

  return (
    <div className="top-container">
      <div className="max-w-1000 h-screen py-20">
        <PostEditor
          onBtnClick={(data) => {
            console.log(data);
          }}
          onCancelClick={() => router.back()}
        />
      </div>
    </div>
  );
}
