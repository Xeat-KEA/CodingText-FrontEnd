import { useRouter } from "next/navigation";
import { MainHistoriesProps } from "../_interfaces/interfaces";
import { MoreContentArrowIcon } from "./Icons";
import MainHistoryCard from "./MainHistoryCard";
import Link from "next/link";

export default function MainHistories({
  title,
  url,
  sliderList,
}: MainHistoriesProps) {
  return (
    <div className="main-container">
      {/* 문제 풀이 기록 목록 제목 */}
      <div className="main-text-container">
        <Link href={url} className="main-title-container cursor-pointer">
          <span className="main-title">{title}</span>
          <MoreContentArrowIcon />
        </Link>
      </div>
      {/* 문제 풀이 기록 목록 */}
      <div className="flex flex-col">
        {sliderList &&
          sliderList.map((el) => (
            <MainHistoryCard key={el.codeHistoryId} history={el} />
          ))}
      </div>
    </div>
  );
}
