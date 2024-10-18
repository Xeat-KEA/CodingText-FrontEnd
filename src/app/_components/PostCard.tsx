import Image from "next/image";
import { IPostCard } from "../_interfaces/interfaces";
import { CommentCountIcon, LikeCountIcon, ReportIcon } from "./Icons";
import { useState } from "react";
import { useCalculateDate } from "../_hooks/useCalculateDate";
import Link from "next/link";

export default function PostCard({
  id,
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
  const [isHovered, setIsHovered] = useState(false);
  const date = useCalculateDate(createAt);
  return (
    <Link
      href={`/blog/0/0/0/${id}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full flex flex-col gap-2 py-6 cursor-pointer"
    >
      <div className="w-full flex justify-between items-center">
        {/* 사용자 정보 */}
        <div
          onClick={(e) => {
            // 부모 요소 onClick 실행 방지
            e.stopPropagation();
            // 사용자 클릭 시 해당 사용자 블로그로 이동
          }}
          className="flex gap-2 items-center"
        >
          <div className="w-6 h-6 rounded-full overflow-hidden flex justify-center items-center border border-border-2">
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
        <span className="text-xs text-body">{date}</span>
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
        {!isHovered ? (
          <span className="text-xs text-body">조회수 {views}</span>
        ) : (
          // 사용자 인증 추가 후 내 게시글에는 수정 버튼 필요
          <button
            onClick={(e) => {
              // 부모 요소 onClick 실행 방지
              e.stopPropagation();
              // 신고 로직 추가 필요
              console.log("reported");
            }}
            className="flex gap-1 items-center"
          >
            <ReportIcon />
            <span className="text-xs font-semibold text-red">신고</span>
          </button>
        )}
      </div>
    </Link>
  );
}
