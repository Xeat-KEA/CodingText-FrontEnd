import { useRouter } from "next/navigation";
import { MainPostsProps } from "../_interfaces/interfaces";
import { MoreContentArrowIcon } from "./Icons";
import MainPostCard from "./MainPostCard";

export default function MainPosts({
  title,
  subTitle,
  url,
  sliderList,
  hasRanking,
}: MainPostsProps) {
  const router = useRouter();
  return (
    <div className="main-container">
      {/* 게시글 목록 제목 / 설명 */}
      <div className={`main-text-container ${url && "cursor-pointer"}`}>
        <div
          onClick={() => url && router.push(url)}
          className="main-title-container"
        >
          <span className="main-title">{title}</span>
          {url && <MoreContentArrowIcon />}
        </div>
        {subTitle && <span className="main-sub-title">{subTitle}</span>}
      </div>
      {/* 게시글 목록 */}
      <div className="main-posts-container">
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
