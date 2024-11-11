import Link from "next/link";
import { Code } from "../_interfaces/interfaces";
import { useRouter } from "next/navigation";
import { useCheckToken } from "@/app/_hooks/useCheckToken";
import { useSetDifficultyColor } from "@/app/_hooks/useSetDifficultyColor";

export default function CodeCard({
  codeId,
  title,
  difficulty,
  participants,
  rate,
}: Code) {
  const { token } = useCheckToken();

  const router = useRouter();

  const difficultyColor = useSetDifficultyColor(difficulty);

  return (
    <Link
      href={token ? `/coding-test/${codeId}` : "/sign-in"}
      className="w-full px-2 py-4 flex justify-between items-center gap-4"
    >
      <div className="w-full flex gap-2 items-center">
        <span
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            router.push(
              `/search?keyword=${codeId}&tab=POST&category=CODE&order=ACCURACY`,
              { scroll: false }
            );
          }}
          className="w-[60px] code-card-code-number list-text"
        >
          #{codeId}
        </span>
        <div className="w-full grow text-sm text-black">{title}</div>
      </div>
      <div className="flex gap-8">
        <div
          className={`w-10 code-card-difficulty list-text ${difficultyColor}`}
        >
          {difficulty}단계
        </div>
        <div className="w-16 text-xs text-black list-text">
          {participants}명
        </div>
        <div className="w-10 text-xs text-black list-text">{rate}%</div>
      </div>
    </Link>
  );
}
