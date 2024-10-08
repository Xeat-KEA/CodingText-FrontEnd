import Image from "next/image";
import { IPostCard } from "../_interfaces/interfaces";
import { CommentCountIcon, LikeCountIcon } from "./Icons";

export default function PostCard({
  profileImg,
  nickname,
  createAt,
  title,
  content,
  thumbnail,
  likes,
  comments,
  views,
}: IPostCard) {
  return (
    <div className="w-full flex flex-col gap-2 py-6">
      <div className="w-full flex justify-between items-center">
        {/* 사용자 정보 */}
        <div className="flex gap-2 items-center">
          <div className="w-6 h-6 rounded-full overflow-hidden bg-disabled">
            <Image
              width="24"
              height="24"
              src={profileImg}
              alt={`${nickname}-profileImg`}
            />
          </div>
          <span className="text-xs font-semibold text-body">{nickname}</span>
        </div>
        {/* 날짜 정보 (수정 필요) */}
        <span className="text-xs text-body">2일 전</span>
      </div>
      {/* 게시글 정보 */}
      <div className="w-full h-[120px] flex justify-between items-center gap-6">
        {/* 게시글 내용 */}
        <div className="flex flex-col gap-2">
          <span className="text-lg font-semibold text-black">{title}</span>
          <div className="text-body min-h-[66px]">{content}</div>
        </div>
        {/* 썸네일 (수정 필요) */}
        <div className="w-[160px] h-[120px] rounded-lg bg-disabled"></div>
      </div>
      <div className="w-full flex items-center justify-between">
        {/* 좋아요 / 댓글 개수 */}
        <div className="flex gap-4">
          <div className="flex gap-2 items-center">
            <LikeCountIcon />
            <span className="text-xs text-body">{likes}</span>
          </div>
          <div className="flex gap-2 items-center">
            <CommentCountIcon />
            <span className="text-xs text-body">{comments}</span>
          </div>
        </div>
        {/* 조회수 */}
        <span className="text-xs text-body">조회수 {views}</span>
      </div>
    </div>
  );
}
