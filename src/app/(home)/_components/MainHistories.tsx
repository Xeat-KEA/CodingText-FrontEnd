import { useRouter } from "next/navigation";
import { MainHistoriesProps } from "../_interfaces/interfaces";
import { MoreContentArrowIcon } from "./Icons";
import MainHistoryCard from "./MainHistoryCard";

export default function MainHistories({
  title,
  url,
  sliderList,
}: MainHistoriesProps) {
  const router = useRouter();

  return (
    <div className="main-container">
      {/* 문제 풀이 기록 목록 제목 */}
      <div className="main-text-container">
        <div
          onClick={() => router.push(url)}
          className="main-title-container cursor-pointer"
        >
          <span className="main-title">{title}</span>
          <MoreContentArrowIcon />
        </div>
      </div>
      {/* 문제 풀이 기록 목록 */}
      <div className="flex flex-col">
        {sliderList &&
          sliderList.map((el) => (
            <MainHistoryCard
              key={el.codeNum}
              codeNum={el.codeNum}
              title={el.title}
              hasSolved={el.hasSolved}
              createdAt={el.createdAt}
            />
          ))}
      </div>
    </div>
  );
}
