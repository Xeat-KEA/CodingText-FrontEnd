import { useGetYMD } from "@/app/_hooks/useGetYMD";
import { UserListCardProps } from "../_interfaces/interfaces";

export default function UserListCard({
  userId,
  nickname,
  email,
  rank,
  signedUpAt,
  onClick,
}: UserListCardProps) {
  return (
    <div
      onClick={onClick}
      className="w-full h-[36px] px-2 flex gap-4 justify-between items-center cursor-pointer"
    >
      <div className="w-full flex gap-2 overflow-hidden">
        <div className="w-[100px] flex-center text-xs font-semibold text-primary-1 shrink-0">
          {nickname}
        </div>
        <div className="w-full grow text-sm text-black text-overflow-ellipsis">
          {email}
        </div>
      </div>
      <div className="flex gap-8 shrink-0">
        <div className="w-[80px] flex-center text-xs text-black">{rank}</div>
        <div className="w-[80px] flex-center text-xs text-body">
          {useGetYMD(signedUpAt)}
        </div>
      </div>
    </div>
  );
}
