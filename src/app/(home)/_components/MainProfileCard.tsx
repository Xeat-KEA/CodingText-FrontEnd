import ProfileInfo from "@/app/(code)/_components/ProfileInfo";
import { ProfileCardProps } from "@/app/(code)/_interfaces/interfaces";
import ProfileImgContainer from "@/app/_components/ProfileImgContainer";

export default function MainProfileCard({ userData }: ProfileCardProps) {
  return (
    <div className="lg:w-[360px] w-full flex flex-col gap-6 shrink-0 p-6 border border-border-2 rounded-xl">
      <div className="flex gap-4 items-center">
        <ProfileImgContainer
          width={48}
          height={48}
          src={userData?.profileImg}
        />
        <div className="flex flex-col">
          <span className="text-xs text-body font-bold">{userData?.rank}</span>
          <span className="text-lg text-black">{userData?.nickname}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex max-lg:flex-col gap-2 lg:gap-6">
          <ProfileInfo category="solved" content={userData?.solved!} />
          <ProfileInfo category="registered" content={userData?.registered!} />
        </div>
        <div className="flex max-lg:flex-col gap-2 lg:gap-6">
          <ProfileInfo category="score" content={userData?.score!} />
          <ProfileInfo category="ranking" content={userData?.ranking!} />
        </div>
      </div>
      <div className="flex gap-4">
        <button className="btn-default w-full">내 정보 수정</button>
        <button className="btn-primary w-full">내 블로그로</button>
      </div>
    </div>
  );
}
