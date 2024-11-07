import { MainPostsProps } from "../_interfaces/interfaces";
import MoreContentArrowIcon, { SliderNextIcon, SliderPrevIcon } from "./Icons";
import MainPostCard from "./MainPostCard";

export default function MainPosts({
  title,
  subTitle,
  url,
  sliderList,
}: MainPostsProps) {
  return (
    <div className="main-container">
      <div className="main-text-container">
        <div className="flex items-center gap-2">
          <span className="main-title">{title}</span>
          {url && <MoreContentArrowIcon />}
        </div>
        {subTitle && <span className="main-sub-title">{subTitle}</span>}
      </div>
      <div className="main-slider-container">
        {sliderList &&
          sliderList.map((el, index) => (
            <MainPostCard
              key={index}
              profileImg={el.profileImg}
              username={el.username}
              userId={el.userId}
              title={el.title}
              codeNum={el.codeNum}
              content={el.content}
              likeCounts={el.likeCounts}
              commentCounts={el.commentCounts}
              views={el.views}
              ranking={el.ranking}
              createdAt={el.createdAt}
            />
          ))}
      </div>
    </div>
  );
}
