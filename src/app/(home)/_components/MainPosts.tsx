import { useRouter } from "next/navigation";
import { MainPostListProps } from "../_interfaces/interfaces";
import { MoreContentArrowIcon } from "./Icons";
import MainPostCard from "./MainPostCard";

export default function MainPostList({
  title,
  subTitle,
  url,
  sliderList,
  hasRanking,
}: MainPostListProps) {
  const router = useRouter();
  return (
    <div className="main-container">
      {/* 게시글 목록 제목 / 설명 */}
      <div className={`main-text-container`}>
        <div
          onClick={() => url && router.push(url)}
          className={`main-title-container ${
            url && "cursor-pointer hover:underline"
          }`}
        >
          <span className="main-title">{title}</span>
          {url && <MoreContentArrowIcon />}
        </div>
        {subTitle && <span className="main-sub-title">{subTitle}</span>}
      </div>
      {/* 게시글 목록 */}
      <div className="main-post-list-container">
        {sliderList &&
          sliderList.map((el, index) => (
            <MainPostCard
              key={el.articleId}
              post={el}
              ranking={hasRanking ? ((index + 1) as 1 | 2 | 3) : undefined}
            />
          ))}
      </div>
    </div>
  );
}
