import ProfileInfo from "@/app/(code)/_components/ProfileInfo";
import ProfileImgContainer from "@/app/_components/ProfileImgContainer";
import { Statistics } from "@/app/_interfaces/interfaces";
import Link from "next/link";

export default function MainProfileCard({
  statistics,
}: {
  statistics: Statistics;
}) {
  console.log(statistics);
  return (
    <div className="lg:w-[360px] w-full flex flex-col gap-6 shrink-0 p-6 border border-border-2 rounded-xl">
      <div className="flex gap-4 items-center">
        <ProfileImgContainer
          width={48}
          height={48}
          src={statistics.profileUrl}
        />
        <div className="flex flex-col">
          <span className="text-xs text-body font-bold">{statistics.tier}</span>
          <span className="text-lg text-black">{statistics.nickName}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex max-lg:flex-col gap-2 lg:gap-6">
          <ProfileInfo category="solved" content={statistics.solvedCount} />
          <ProfileInfo
            category="registered"
            content={statistics.registerCount}
          />
        </div>
        <div className="flex max-lg:flex-col gap-2 lg:gap-6">
          <ProfileInfo category="score" content={statistics.totalScore} />
          <ProfileInfo category="ranking" content={statistics.rank} />
        </div>
      </div>
      <div className="flex gap-4">
        <Link href="/edit/profile" className="btn-default w-full">
          내 정보 수정
        </Link>
        <Link
          href={`/blog/${statistics.blogId}`}
          className="btn-primary w-full"
        >
          내 블로그로
        </Link>
      </div>
    </div>
  );
}
