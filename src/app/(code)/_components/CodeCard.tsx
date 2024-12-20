import Link from "next/link";
import { Code } from "../_interfaces/interfaces";
import { useRouter } from "next/navigation";
import { useSetDifficulty } from "@/app/_hooks/useSetDifficulty";
import { motion } from "framer-motion";
import { DEFAULT_BUTTON_VARIANTS } from "@/app/_constants/constants";

export default function CodeCard({
  codeId,
  title,
  difficulty,
  correctRate,
}: Code) {
  const router = useRouter();

  const [level, color] = useSetDifficulty(difficulty);

  return (
    <Link href={`/coding-test/${codeId}`}>
      <motion.div
        variants={DEFAULT_BUTTON_VARIANTS}
        initial="initial"
        whileHover="hover"
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
          <div className={`w-10 code-card-difficulty list-text ${color}`}>
            {level}단계
          </div>
          <div className="w-16 text-xs text-black list-text">{1}명</div>
          <div className="w-10 text-xs text-black list-text">
            {correctRate?.toFixed(1)}%
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
