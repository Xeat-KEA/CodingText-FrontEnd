import { BannerBubble2 } from "@/app/(home)/_components/Icons";
import { LogoIcon } from "@/app/_components/Icons";
import { SmBubbleIcon } from "./Icons";
import { useRouter } from "next/navigation";

export default function BlindPostContainer() {
    const router = useRouter();
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
                onClick={() => router.back()}
                className="w-4/5 py-6 border border-border-2 rounded-2xl bg-white text-xl text-black font-semibold"
                >
                    이전 페이지로
                </button>
                </div>
            </div>
        </div>
    )
}