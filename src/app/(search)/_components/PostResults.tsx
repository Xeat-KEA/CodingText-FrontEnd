import PostCard from "@/app/_components/PostCard";
import { DUMMY_POST_RESULT_LIST } from "../_constants/constants";

export default function PostResults() {
  return (
    <div className="relative grid grid-cols-2 gap-x-[96px]">
      {DUMMY_POST_RESULT_LIST.map((el, index) => {
        return (
          <div
            key={index}
            className={`${index >= 2 && "border-t border-border2"}`}
          >
            <PostCard
              id={index}
              profileImg={el.profileImg}
              nickname={el.nickname}
              createAt={el.createAt}
              title={el.title}
              content={el.content}
              thumbnail={el.thumbnail}
              likes={el.likes}
              comments={el.comments}
              views={el.views}
              codeId={el.codeId}
            />
          </div>
        );
      })}
      {/* 가운데 구분선 */}
      <div className="w-[1px] h-[calc(100%-48px)] bg-border-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
}
