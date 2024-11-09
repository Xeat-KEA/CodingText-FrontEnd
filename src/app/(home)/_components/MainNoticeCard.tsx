import { useGetYMD } from "@/app/_hooks/useGetYMD";
import { MainNotice } from "../_interfaces/interfaces";
import { useState } from "react";
import Link from "next/link";

export default function MainNoticeCard({
  noticeId,
  title,
  createdAt,
}: MainNotice) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Link
      href={`/notice/${noticeId}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full h-[36px] flex gap-1 justify-between items-center cursor-pointer overflow-hidden"
    >
      {/* 공지사항 제목 */}
      <span
        className={`w-full ${
          isHovered && "underline"
        } text-black text-overflow-ellipsis`}
      >
        {title}
      </span>
      {/* 공지사항 작성일 */}
      <span className="text-xs text-body">{useGetYMD(createdAt)}</span>
    </Link>
  );
}
