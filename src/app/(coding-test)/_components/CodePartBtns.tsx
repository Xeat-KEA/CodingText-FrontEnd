import DropDown from "@/app/_components/DropDown";
import { PROGRAMMING_LANGUAGES } from "@/app/_constants/constants";
import { useCodingTestStore, useWindowSizeStore } from "@/app/stores";
import { useParams, useRouter } from "next/navigation";
import { CodePartBtnsProps } from "../_interface/interfaces";
import { useEffect, useRef, useState } from "react";
import { CODING_BUTTONS } from "../_constants/constants";
import { useCheckToken } from "@/app/_hooks/useCheckToken";
import Link from "next/link";

export default function CodePartBtns({
  onCompile,
  onSubmit,
}: CodePartBtnsProps) {
  const { token } = useCheckToken();

  const router = useRouter();
  const { id } = useParams();

  const { language, setLanguage, setIsPosting, hasSolved, setHasSolved } =
    useCodingTestStore();
  const { windowSize } = useWindowSizeStore();

  // 코드 작성 부분 크기 감지
  const ref = useRef<HTMLDivElement>(null);
  const [isSmall, setIsSmall] = useState(false);
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (ref.current) {
        setIsSmall(ref.current.clientWidth < 600);
      }
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`w-full flex ${
        windowSize > 440 ? "justify-between items-center" : "flex-col items-end"
      } px-6 pt-6 pb-8 gap-4`}
    >
      {/* 언어 설정 */}
      <div className="w-[120px] shrink-0">
        <DropDown
          selection={language.content}
          onSelectionClick={(selected) => setLanguage(selected)}
          list={PROGRAMMING_LANGUAGES}
          isSmall
          showListUpward
        />
      </div>
      {/* 하단 버튼 */}
      {token ? (
        // 로그인 시의 버튼
        <div className="flex gap-4">
          {/* 글 쓰기 버튼 (정답 시에만 활성화) */}
          <button
            onClick={() => setIsPosting(true)}
            className={`${!hasSolved ? "btn-disabled" : "btn-default"} h-10 ${
              isSmall && "!p-0 w-12"
            }`}
            disabled={!hasSolved}
          >
            {!isSmall ? CODING_BUTTONS[0].content : CODING_BUTTONS[0].icon}
          </button>
          {/* 다른 사람 풀이 보기 버튼 */}
          <button
            onClick={() =>
              router.push(`${CODING_BUTTONS[1].url}&keyword=${id}`, {
                scroll: false,
              })
            }
            className={`btn-default h-10 ${isSmall && "!p-0 w-12"}`}
          >
            {!isSmall ? CODING_BUTTONS[1].content : CODING_BUTTONS[1].icon}
          </button>
          {/* 코드 컴파일 후 실행 */}
          <button
            onClick={onCompile}
            className={`btn-default h-10 ${isSmall && "!p-0 w-12"}`}
          >
            {!isSmall ? CODING_BUTTONS[2].content : CODING_BUTTONS[2].icon}
          </button>
          {/* 코드 제출 */}
          <button
            onClick={onSubmit}
            className={`btn-primary h-10 ${isSmall && "!p-0 w-12"}`}
          >
            {!isSmall ? CODING_BUTTONS[3].content : CODING_BUTTONS[3].icon}
          </button>
        </div>
      ) : (
        // 비로그인 시의 버튼
        <Link href="/sign-in" className="btn-primary h-10">
          로그인하기
        </Link>
      )}
    </div>
  );
}
