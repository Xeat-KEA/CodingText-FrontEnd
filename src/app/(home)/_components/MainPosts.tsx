import { useRouter } from "next/navigation";
import { MainPostsProps } from "../_interfaces/interfaces";
import { MoreContentArrowIcon, SliderNextIcon, SliderPrevIcon } from "./Icons";
import MainPostCard from "./MainPostCard";

export default function MainPosts({
  title,
  subTitle,
  url,
  sliderList,
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
          sliderList.map((el) => (
            <MainPostCard
              key={el.postId}
              postId={el.postId}
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
