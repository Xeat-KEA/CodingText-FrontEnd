"use client";

import { LogoIcon } from "@/app/_components/Icons";
import { SmBubbleIcon } from "../../(blog)/_components/Icons";
import { useRouter } from "next/navigation";
import { usePathValue } from "@/app/_hooks/usePathValue";
import { useBlogStore } from "@/app/stores";
import Image from "next/image";

export default function BlindPostPage() {
  const { currentBlogId } = useBlogStore();
  const router = useRouter();
  const previousURL = usePathValue();

  const onClickBack = () => {
    if (previousURL && previousURL !== "/blind") {
      router.push(previousURL);
    } else {
      router.push(`/blog/${currentBlogId}`);
    }
  };

  return (
    <div className="w-full flex justify-center bg-bg-1">
      <div className="max-w-800 min-h-screen flex flex-col items-center">
        <div className="flex flex-col items-center mt-20">
          <LogoIcon />
          <div className="h-28" />
          {/* <SmBubbleIcon /> */}
          <Image 
          src="/blind.png"
          alt={`블라인드 이미지`}
          width={337}
          height={240}
          priority
          />

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
