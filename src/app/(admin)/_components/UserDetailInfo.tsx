import api from "@/app/_api/config";
import ProfileImgContainer from "@/app/_components/ProfileImgContainer";
import { useQuery } from "@tanstack/react-query";
import DOMPurify from "isomorphic-dompurify";

export default function UserDetailInfo({ userId }: { userId: number }) {
  const fetchData = async () => {
    const response = await api.get("/admin/user", { data: userId });
    return response.data;
  };
  const { data } = useQuery({ queryKey: ["userDetail"], queryFn: fetchData });

  const dummyData = {
    email: "xeatcodingtext@gachon.ac.kr",
    nickname: "코딩텍스트",
    profileImg: "/profileImg3.png",
    status: "안녕하세요 코딩텍스트입니다.",
    blogIntro: "<h2>Hello</h2>",
  };

  const onReset = (
    type: "nickname" | "profileImg" | "status" | "blogIntro"
  ) => {
    // API를 통해 사용자 정보 초기화 후 반환값 재설정 필요
    if (type === "nickname") {
    } else if (type === "profileImg") {
    } else if (type === "status") {
    }
  };

  return (
    <>
      {/* 이메일 */}
      <div className="edit-container">
        <span className="edit-title">이메일</span>
        <span className="text-sm-content">{dummyData.email}</span>
      </div>
      {/* 닉네임 */}
      <div className="edit-container">
        <span className="edit-title">닉네임</span>
        <span className="text-xl-content">{dummyData.nickname}</span>
        <button
          onClick={() => onReset("nickname")}
          className="edit-btn-primary"
        >
          초기화
        </button>
      </div>
      {/* 프로필 사진 */}
      <div className="edit-container">
        <span className="edit-title">프로필 사진</span>
        <ProfileImgContainer
          width={120}
          height={120}
          src={dummyData.profileImg}
        />
        <button
          onClick={() => onReset("profileImg")}
          className="edit-btn-primary"
        >
          초기화
        </button>
      </div>
      {/* 상태 메세지 */}
      <div className="edit-container">
        <span className="edit-title">상태 메세지</span>
        <span className="edit-sm-content">{dummyData.status}</span>
        <button onClick={() => onReset("status")} className="edit-btn-primary">
          초기화
        </button>
      </div>
      {/* 블로그 소개글 */}
      <div className="edit-container">
        <span className="edit-title">블로그 소개글</span>
        <div className="w-full h-[400px] overflow-y-auto border border-border-2 rounded-2xl px-6 py-4">
          <div
            className="prose"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(dummyData.blogIntro),
            }}
          />
        </div>
        <button
          onClick={() => onReset("blogIntro")}
          className="edit-btn-primary"
        >
          초기화
        </button>
      </div>
    </>
  );
}
