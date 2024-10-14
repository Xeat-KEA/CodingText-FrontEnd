import Image from "next/image";
import { IProfileCard } from "../_interfaces/interfaces";
import ProfileInfo from "./ProfileInfo";

export default function ProfileCard({ userData }: IProfileCard) {
  return (
    <div className="w-full flex flex-col items-center p-6 gap-4 border border-border-2 rounded-2xl sticky top-28">
      {!userData ? (
        <>
          <span className="text-black text-lg font-semibold text-center py-6 whitespace-pre-wrap">
            {"로그인이 필요한\n서비스에요"}
          </span>
          <button className="btn-default w-full">로그인</button>
          <button className="btn-primary w-full">회원가입</button>
        </>
      ) : (
        <>
          <div className="relative w-[120px] h-[120px] rounded-full border border-border-2 overflow-hidden">
            <Image
              fill
              sizes="100%"
              src="/profileImg1.png"
              alt="profileImg"
              priority
              className="object-cover"
            />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold text-body">{userData.rank}</span>
            <span className="text-lg font-semibold text-black">
              {userData.nickname}
            </span>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <ProfileInfo category="solved" content={userData.solved} />
            <ProfileInfo category="registered" content={userData.registered} />
            <ProfileInfo category="score" content={userData.score} />
            <ProfileInfo category="ranking" content={userData.ranking} />
          </div>
          <button className="btn-primary w-full">
            ChatGPT로 나만의 문제 만들기
          </button>
          <button className="btn-default w-full">다른 문제 풀러 가기</button>
        </>
      )}
    </div>
  );
}
