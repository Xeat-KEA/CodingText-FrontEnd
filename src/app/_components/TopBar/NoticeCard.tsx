import { Push } from "@/app/_interfaces/interfaces";
import Link from "next/link";

export default function NoticeCard({ push }: { push: Push }) {
  return (
    <Link
      // blogId -> postId로 수정 예정
      href={`/blog/post/${push.blogId}`}
      className="w-full px-4 py-3 flex flex-col gap-2"
    >
      <span className="text-xs font-bold text-body">{push.noticeCategory}</span>
      <div className="flex flex-col">
        <span className="text-xs text-black">
          <span className="text-primary-1">{push.sentUserNickName}</span> 님이
          새로운 댓글을 남겼어요
        </span>
        <span className="text-xs text-black">"{push.content}"</span>
      </div>
    </Link>
  );
}
