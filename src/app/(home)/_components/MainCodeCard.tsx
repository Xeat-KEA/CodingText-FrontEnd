import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useSetDifficulty } from "@/app/_hooks/useSetDifficulty";
import { Code } from "@/app/(code)/_interfaces/interfaces";
import { ALGORITHM_LIST } from "@/app/_constants/constants";

export default function MainCodeCard({ code }: { code: Code }) {
  const [level, color] = useSetDifficulty(code.difficulty);
  const router = useRouter();
  return (
    <motion.div
      className="bg-primary-2 rounded-xl"
      initial={{ scale: 1, boxShadow: "0px 0px 0px 0px rgba(0, 0, 0, 0.25)" }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Link
        href={`/coding-test/${code.codeId}`}
        className="main-post-card"
        scroll={false}
      >
        {/* 상단 컨테이너 */}
        <div className="post-card-top-container">
          <button
            onClick={(e) => {
              e.preventDefault();
              router.push(`/search?keyword=${code.codeId}&category=CODE`, {
                scroll: false,
              });
            }}
            className="code-card-code-number"
          >
            #{code.codeId}
          </button>
          <span className={`code-card-difficulty ${color}`}>{level}단계</span>
        </div>
        {/* 중단 컨테이너 */}
        <div className="post-card-content-container">
          {/* 문제 제목 */}
          <span className="main-code-card-title">{code.title}</span>
          {/* 알고리즘 */}
          <span className="main-code-card-algorithm">
            {
              ALGORITHM_LIST.find((el) => el.selection === code.algorithm)
                ?.content
            }
          </span>
        </div>
        {/* 하단 컨테이너 */}
        <div className="post-card-bottom-container">
          {/* 정답률 */}
          <span className="code-card-value">
            정답률
            <span className="post-card-views-number">
              {code.correctRate?.toLocaleString()}%
            </span>
          </span>
          {/* 참여자수 */}
          <span className="code-card-value">
            참여자수
            <span className="post-card-views-number">{1}명</span>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
