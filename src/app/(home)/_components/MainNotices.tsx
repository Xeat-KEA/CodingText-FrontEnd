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
        <div className="main-title-container cursor-pointer">
          <span className="main-title">{title}</span>
          <MoreContentArrowIcon />
        </div>
      </div>
      {/* 공지 목록 */}
      <div className="flex flex-col">
        {sliderList &&
          sliderList.map((el) => (
            <MainNoticeCard
              key={el.noticeId}
              noticeId={el.noticeId}
              title={el.title}
              createdAt={el.createdAt}
            />
          ))}
      </div>
    </div>
  );
}
