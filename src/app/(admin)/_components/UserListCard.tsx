import { useGetYMD } from "@/app/_hooks/useGetYMD";
import { UserListCardProps } from "../_interfaces/interfaces";
import Link from "next/link";

export default function UserListCard({ userInfo }: UserListCardProps) {
  return (
    <Link
      href={`/admin/user/${userInfo.userId}`}
      className="w-full h-[36px] px-2 flex gap-4 justify-between items-center cursor-pointer"
    >
      <div className="w-full flex gap-2 overflow-hidden">
        <div className="w-[100px] flex-center text-xs font-semibold text-primary-1 shrink-0">
          {userInfo.nickName}
        </div>
        <div className="w-full grow text-sm text-black text-overflow-ellipsis">
          {userInfo.email}
        </div>
      </div>
      <div className="flex gap-8 shrink-0">
        <div className="w-[80px] flex-center text-xs text-black">
          {userInfo.tier}
        </div>
        <div className="w-[80px] flex-center text-xs text-body">
          {useGetYMD(userInfo.registerDate)}
        </div>
      </div>
    </Link>
  );
}
