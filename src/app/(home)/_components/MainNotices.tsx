import Link from "next/link";
import { MainNoticesProps } from "../_interfaces/interfaces";
import { MoreContentArrowIcon } from "./Icons";
import MainNoticeCard from "./MainNoticeCard";

export default function MainNotices({
  title,
  url,
  sliderList,
}: MainNoticesProps) {
  return (
    <div className="main-container overflow-hidden">
      {/* 공지 목록 제목 */}
      <div className="main-text-container">
        <Link
          href={url}
          className="main-title-container cursor-pointer hover:underline"
        >
          <span className="main-title">{title}</span>
          <MoreContentArrowIcon />
        </Link>
      </div>
      {/* 공지 목록 */}
      <div className="flex flex-col">
        {sliderList &&
          sliderList.map((el) => (
            <MainNoticeCard
              key={el.announceId}
              announceId={el.announceId}
              createdDate={el.createdDate}
              title={el.title}
            />
          ))}
      </div>
    </div>
  );
}
