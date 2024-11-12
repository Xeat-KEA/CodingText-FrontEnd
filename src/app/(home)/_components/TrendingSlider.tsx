import { SliderProps } from "../_interfaces/interfaces";
import SliderPostCard from "./SliderPostCard";

export default function TrendingSlider({
  title,
  subTitle,
  sliderList,
}: SliderProps) {
  return (
    <div className="main-container">
      <div className="main-text-container">
        <div className="flex items-center gap-2">
          <span className="main-title">{title}</span>
        </div>
        {subTitle && <span className="main-sub-title">{subTitle}</span>}
      </div>
      <div className="main-trending-slider-container">
        {sliderList &&
          sliderList.map((el, index) => (
            <SliderPostCard
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
