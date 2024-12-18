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
        <Link href={url} className="main-title-container hover:underline">
          <span className="main-title">{title}</span>
          <MoreContentArrowIcon />
        </Link>
      </div>
      {/* 문제 풀이 기록 목록 */}
      <div className="flex flex-col">
        {sliderList?.length !== 0 ? (
          sliderList?.map((el) => (
            <MainHistoryCard key={el.codeHistoryId} history={el} />
          ))
        ) : (
          <div className="w-full flex flex-col items-center gap-2 bg-bg-1 py-12 rounded-lg">
            <p className="text-body">아직 시도한 문제가 없어요</p>
            <Link
              href="/code/list"
              className="text-sm font-semibold text-primary-1 hover:underline"
            >
              문제 풀러 가기
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
