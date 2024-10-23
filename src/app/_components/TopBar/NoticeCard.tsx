import { NoticeCardProps } from "@/app/_interfaces/interfaces";

export default function NoticeCard({
  category,
  blogId,
  userId,
}: NoticeCardProps) {
  return (
    <div className="w-full px-4 py-3 flex flex-col gap-2">
      <span className="text-xs font-bold text-body">{category}</span>
      <div className="flex flex-col">
        <span className="text-xs text-black">
          {`사용자${userId}`}님이 새로운 댓글을 남겼어요
        </span>
        <span className="text-xs text-black">"좋은 글 잘 봤습니다!"</span>
      </div>
    </div>
  );
}
