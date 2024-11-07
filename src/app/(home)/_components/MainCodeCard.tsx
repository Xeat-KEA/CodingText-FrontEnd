import { useSetDifficultyColor } from "@/app/_hooks/useSetDifficultyColor";
import { MainCode } from "../_interfaces/interfaces";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MainCodeCard({
  codeNum,
  title,
  difficulty,
  algorithm,
  participants,
  rate,
}: MainCode) {
  const difficultyColor = useSetDifficultyColor(difficulty);
  const router = useRouter();
  return (
    <Link
      href={`/coding-test/${codeNum}`}
      className="main-post-card"
      scroll={false}
    >
      {/* 상단 컨테이너 */}
      <div className="post-card-top-container">
        <button
          onClick={(e) => {
            e.preventDefault();
            router.push(`/search?keyword=${codeNum}&category=CODE`, {
              scroll: false,
            });
          }}
          className="code-card-code-number"
        >
          #{codeNum}
        </button>
        <span className={`code-card-difficulty ${difficultyColor}`}>
          {difficulty}단계
        </span>
      </div>
      {/* 중단 컨테이너 */}
      <div className="post-card-content-container">
        {/* 문제 제목 */}
        <span className="main-code-card-title">{title}</span>
        {/* 알고리즘 */}
        <span className="main-code-card-algorithm">{algorithm}</span>
      </div>
      {/* 하단 컨테이너 */}
      <div className="post-card-bottom-container">
        {/* 정답률 */}
        <span className="post-card-views">
          정답률&nbsp;
          <span className="post-card-views-number">
            {rate.toLocaleString()}%
          </span>
        </span>
        {/* 참여자수 */}
        <span className="post-card-views">
          참여자수&nbsp;
          <span className="post-card-views-number">
            {participants.toLocaleString()}명
          </span>
        </span>
      </div>
    </Link>
  );
}
