import { LinkArrowIcon } from "@/app/_components/Icons";
import { useCheckToken } from "@/app/_hooks/useCheckToken";
import { useRouter } from "next/navigation";

export default function SubBanner() {
  const { token } = useCheckToken();
  const router = useRouter();
  return (
    <div className="w-full h-[240px] gradient flex justify-center">
      <div className="max-w-1200 flex justify-between items-center">
        <span className="whitespace-pre-wrap text-xl font-bold text-white">
          {"문제를 풀며 정리한 내용으로\n나만의 기술 블로그를 채워보세요!"}
        </span>
        <button
          onClick={() => {
            if (token) {
              router.push(`/blog/${token}`, { scroll: false });
            } else {
              router.push("/sign-in");
            }
          }}
          className="lg-btn text-black"
        >
          <span className="text-xl font-semibold">내 블로그 바로가기</span>
          <LinkArrowIcon />
        </button>
      </div>
    </div>
  );
}
