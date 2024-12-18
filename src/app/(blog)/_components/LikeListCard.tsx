import Link from "next/link";
import { Liker } from "../_interfaces/interfaces";
import ProfileImgContainer from "@/app/_components/ProfileImgContainer";

export default function LikeListCard({ liker }: { liker: Liker }) {
  return (
    <Link
      href={liker.blogId ? `/blog/${liker.blogId}` : "#"}
      className="w-full px-4 py-3 flex gap-3 items-center hover:bg-bg-1"
      onClick={(e) => {
        if (!liker.blogId) e.preventDefault();
      }}>
      <ProfileImgContainer width={24} height={24} src={liker.profileUrl} />
      <span className="text-xs text-black font-semibold">{liker.userName}</span>
    </Link>
  );
}
