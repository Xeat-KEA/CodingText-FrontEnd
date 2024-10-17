import { LinkArrowIcon } from "@/app/_components/Icons";
import Link from "next/link";

export default function MainBanner() {
  return (
    <div
      style={{
        backgroundImage: "url('mainBanner.png')",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="top-container"
    >
      <div className="max-w-1200 py-[120px]">
        <div className="flex flex-col gap-16">
          <div className="flex flex-col gap-4">
            <span
              style={{
                textShadow: "0px 1px 20px rgba(255, 255, 255, 0.45)",
              }}
              className="text-3xl font-semibold text-black whitespace-pre-wrap"
            >
              {"codingtext가 제공하는\n문제를 풀어보세요!"}
            </span>
            <span
              style={{
                textShadow: "0px 1px 20px rgba(255, 255, 255, 0.45)",
              }}
              className="text-xl font-semibold text-body"
            >
              ChatGPT로 원하는 코딩 문제를 만들어 풀 수 있어요!
            </span>
          </div>
          <Link href="/" className="lg-btn text-primary">
            <span className="text-xl font-semibold">문제 풀러 가기</span>
            <LinkArrowIcon />
          </Link>
        </div>
      </div>
    </div>
  );
}
