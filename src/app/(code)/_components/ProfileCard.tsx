import ProfileInfo from "./ProfileInfo";
import { useState } from "react";
import ChatGPTDialog from "./ChatGPTDialog";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ProfileImgContainer from "@/app/_components/ProfileImgContainer";
import { Statistics } from "@/app/_interfaces/interfaces";

export default function ProfileCard({
  statistics,
}: {
  statistics: Statistics;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const pathname = usePathname();
  return (
    <>
      <div className="w-full flex flex-col items-center gap-4 sticky top-24 border p-6 border-border-2 rounded-xl">
        {!statistics ? (
          <>
            <span className="lg:w-[360px] text-black text-lg font-semibold text-center py-6 whitespace-pre-wrap">
              {"로그인이 필요한\n서비스에요"}
            </span>
            <Link href="/sign-in" className="btn-primary w-full">
              로그인
            </Link>
          </>
        ) : (
          <>
            <div className="lg:w-[360px] w-full flex flex-col gap-6 shrink-0">
              <div className="flex gap-4 items-center">
                <ProfileImgContainer
                  width={48}
                  height={48}
                  src={statistics.profileUrl}
                />
                <div className="flex flex-col">
                  <span className="text-xs text-body font-bold">
                    {statistics.tier}
                  </span>
                  <span className="text-lg text-black">
                    {statistics.nickName}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex max-lg:flex-col gap-2 lg:gap-6">
                  <ProfileInfo
                    category="solved"
                    content={statistics.solvedCount}
                  />
                  <ProfileInfo
                    category="registered"
                    content={statistics.registerCount}
                  />
                </div>
                <div className="flex max-lg:flex-col gap-2 lg:gap-6">
                  <ProfileInfo
                    category="score"
                    content={statistics.totalScore}
                  />
                  <ProfileInfo category="ranking" content={statistics.rank} />
                </div>
              </div>
              <div className="flex gap-4 max-sm:flex-col">
                <button
                  onClick={() => setIsDialogOpen((prev) => !prev)}
                  className="btn-primary w-full"
                >
                  ChatGPT로 나만의 문제 만들기
                </button>
                <Link
                  href={
                    pathname === "/code/list" ? "/code/history" : "/code/list"
                  }
                  className="btn-default w-full"
                >
                  {pathname === "/code/list"
                    ? "문제 풀이 기록 보러 가기"
                    : "다른 문제 풀러 가기"}
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
      {isDialogOpen && (
        <ChatGPTDialog
          onBackBtnClick={() => setIsDialogOpen((prev) => !prev)}
        />
      )}
    </>
  );
}
