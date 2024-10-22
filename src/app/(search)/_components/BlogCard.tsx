import Image from "next/image";
import { BlogCardProps } from "../_interfaces/interfaces";
import Link from "next/link";

export default function BlogCard({
  userId,
  profileImg,
  nickname,
  status,
}: BlogCardProps) {
  return (
    <Link href={`/blog/${userId}`} className="flex gap-6 items-center py-6">
      <div className="relative w-16 h-16 rounded-full border border-border-2 overflow-hidden shrink-0">
        <Image
          fill
          sizes="100%"
          src={profileImg}
          alt="myProfileImg"
          priority
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-2 w-full justify-center">
        <span className="text-lg font-semibold text-black">{nickname}</span>
        <span className="text-sm text-body h-[40px] overflow-hidden">
          {status}
        </span>
      </div>
    </Link>
  );
}
