import PostCard from "@/app/_components/PostCard";
import { useEffect, useState } from "react";
import { PostResult } from "../_interfaces/interfaces";
import api from "@/app/_api/config";

export default function PostResults() {
  const [result, setResult] = useState<PostResult[]>([]);

  // 프로토타입 더미 데이터 GET
  useEffect(() => {
    api.get("/article-list").then((res) => {
      // 날짜 내림차순
      const sortedData = res.data.data.sort((a: PostResult, b: PostResult) =>
        a.createAt > b.createAt ? -1 : 1
      );
      setResult(sortedData.slice(0, 20));
    });
  }, []);

  return (
    <div className="relative grid grid-cols-2 gap-x-[96px]">
      {result.length !== 0 ? (
        result.map((el, index) => (
          <div
            key={index}
            className={`${index >= 2 && "border-t border-border2"}`}
          >
            <PostCard
              articleId={el.articleId}
              profileImg={`/profileImg${(el.articleId % 6) + 1}.png`}
              nickName={el.nickName}
              createAt={el.createAt}
              title={el.title}
              content={el.content}
              likes={el.likeCount}
              comments={el.replyCount}
              views={el.replyCount} // 조회수 추가 후 수정 필요
              codeId={el.codeId}
            />
          </div>
        ))
      ) : (
        <div>{/* 스켈레톤 UI 구성 예정 */}</div>
      )}
      {/* 가운데 구분선 */}
      <div className="w-[1px] h-[calc(100%-48px)] bg-border-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
}
