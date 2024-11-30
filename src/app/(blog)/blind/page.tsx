"use client";

import { LogoIcon } from "@/app/_components/Icons";
import { SmBubbleIcon } from "../_components/Icons";
import { useRouter } from "next/navigation";
import { usePathValue } from "@/app/_hooks/usePathValue";
import { useBlogStore } from "@/app/stores";

export default function BlindPostPage() {
<<<<<<< HEAD
  const { userBlogId } = useBlogStore();
=======
  const { blogId } = useBlogStore();
>>>>>>> origin/develop
  const router = useRouter();
  const previousURL = usePathValue();

  const onClickBack = () => {
    if (previousURL && previousURL !== "/blind") {
      router.push(previousURL);
    } else {
      router.push(`/blog/${userBlogId}`);
    }
  };

  return (
    <div className="w-full flex justify-center bg-bg-1">
      <div className="max-w-800 min-h-screen flex flex-col items-center">
        <div className="flex flex-col items-center mt-20">
          <LogoIcon />
          <div className="h-28" />
          <SmBubbleIcon />
          <span className="whitespace-pre-wrap text-2xl font-semibold text-black mt-2 mb-12">
            {"블라인드 처리된 \n 게시물이에요"}
          </span>
          <button
            onClick={onClickBack}
            className="w-full py-3 border border-border-2 rounded-2xl bg-white text-base text-black font-semibold">
            이전 페이지로
          </button>
        </div>
      </div>
    </div>
  );
}
