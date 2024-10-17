import { DUMMY_BLOG_RESULT_LIST } from "../_constants/constants";
import BlogCard from "./BlogCard";

export default function BlogResults() {
  return (
    <div className="relative grid grid-cols-2 gap-x-[96px]">
      {DUMMY_BLOG_RESULT_LIST.map((el, index) => (
        <div
          key={index}
          className={`${index >= 2 && "border-t border-border2"}`}
        >
          <BlogCard
            id={el.id}
            nickname={el.nickname}
            profileImg={el.profileImg}
            status={el.status}
          />
        </div>
      ))}
      {/* 가운데 구분선 */}
      <div className="w-[1px] h-[calc(100%-48px)] bg-border-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
}
