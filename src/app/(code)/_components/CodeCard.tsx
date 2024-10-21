import Link from "next/link";
import { Code } from "../_interfaces/interfaces";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCheckToken } from "@/app/_hooks/useCheckToken";

export default function CodeCard({
  id,
  title,
  difficulty,
  participants,
  rate,
}: Code) {
  const { token } = useCheckToken();

  const router = useRouter();

  const [isMounted, setisMounted] = useState(false);

  // 난이도 별 text 색상 변경
  const [difficultyColor, setDifficultyColor] = useState("");
  useEffect(() => {
    if (difficulty === 1) {
      setDifficultyColor("text-blue");
    } else if (difficulty === 2) {
      setDifficultyColor("text-green");
    } else if (difficulty === 3) {
      setDifficultyColor("text-yellow");
    } else if (difficulty === 4) {
      setDifficultyColor("text-orange");
    } else if (difficulty === 5) {
      setDifficultyColor("text-red");
    }
    setisMounted(true);
  }, []);
  return (
    isMounted &&
    difficultyColor && (
      <Link
        href={token ? `/coding-test/${id}` : "/sign-in"}
        className="w-full px-2 py-4 flex justify-between items-center gap-4"
      >
        <div className="w-full flex gap-2 items-center">
          <span
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              router.push(
                `/search?keyword=${id}&tab=POST&category=CODE&order=ACCURACY`,
                { scroll: false }
              );
            }}
            className="w-[60px] text-xs font-semibold text-primary list-text hover:underline"
          >
            #{id}
          </span>
          <div className="w-full grow text-sm text-black">{title}</div>
        </div>
        <div className="flex gap-8">
          <div
            className={`w-10 text-xs font-bold list-text ${difficultyColor}`}
          >
            {difficulty}단계
          </div>
          <div className="w-16 text-xs text-black list-text">
            {participants}명
          </div>
          <div className="w-10 text-xs text-black list-text">{rate}%</div>
        </div>
      </Link>
    )
  );
}
