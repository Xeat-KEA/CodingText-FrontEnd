import ProfileImgContainer from "@/app/_components/ProfileImgContainer";
import { useQueryClient } from "@tanstack/react-query";
import DOMPurify from "isomorphic-dompurify";
import { AdminUserDetail } from "../_interfaces/interfaces";
import { useState } from "react";
import AdminResponseDialogs from "./AdminResponseDialogs";
import Dialog from "@/app/_components/Dialog";
import api from "@/app/_api/config";
import { useTokenStore } from "@/app/stores";

export default function UserDetailInfo({
  userDetail,
}: {
  userDetail: AdminUserDetail;
}) {
  const { accessToken, isTokenSet } = useTokenStore();
  const [isDialogOpen, setIsDialogOpen] = useState({
    error: false,
    done: false,
  });
  const [selected, setSelected] = useState<
    "nickName" | "profileUrl" | "profileMessage" | "blogIntro" | ""
  >("");

  const queryClient = useQueryClient();
  const onReset = async (
    type: "nickName" | "profileUrl" | "profileMessage" | "blogIntro"
  ) => {
    try {
      // API를 통해 사용자 정보 초기화 후 반환값 재설정 필요
      if (type === "nickName") {
        const response = await api.post(
          "/user-service/users/init/nickname",
          {},
          {
            headers: { Authorization: accessToken },
            params: { UserId: userDetail.userId },
          }
        );
      } else if (type === "profileUrl") {
        const response = await api.post(
          "/user-service/users/init/profile",
          {},
          {
            headers: { Authorization: accessToken },
            params: { UserId: userDetail.userId },
          }
        );
      } else if (type === "profileMessage") {
        const response = await api.post(
          "/user-service/users/init/message",
          {},
          {
            headers: { Authorization: accessToken },
            params: { UserId: userDetail.userId },
          }
        );
      } else if ((type = "blogIntro")) {
        const response = await api.post(
          "/user-service/users/init",
          {},
          {
            headers: { Authorization: accessToken },
            params: { UserId: userDetail.userId },
          }
        );
      }
      setIsDialogOpen((prev) => ({ ...prev, done: !prev.done }));
    } catch (err) {
      setIsDialogOpen((prev) => ({ ...prev, error: !prev.error }));
    }
  };

  const onError = () =>
    setIsDialogOpen((prev) => ({ ...prev, error: !prev.error }));

  const onDone = () => {
    queryClient.invalidateQueries({
      queryKey: ["userDetail"],
      exact: false,
    });
    setIsDialogOpen((prev) => ({ ...prev, done: !prev.done }));
  };

  return (
    <>
      {/* 이메일 */}
      <div className="edit-container">
        <span className="edit-title">이메일</span>
        <span className="text-sm-content">{userDetail.email}</span>
      </div>
      {/* 닉네임 */}
      <div className="edit-container">
        <span className="edit-title">닉네임</span>
        <span className="text-xl-content">{userDetail.nickName}</span>
        <button
          onClick={() => setSelected("nickName")}
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
          src={userDetail.profileUrl}
        />
        <button
          onClick={() => setSelected("profileUrl")}
          className="edit-btn-primary"
        >
          초기화
        </button>
      </div>
      {/* 상태 메세지 */}
      <div className="edit-container">
        <span className="edit-title">상태 메세지</span>
        <span className="edit-sm-content">{userDetail.profileMessage}</span>
        <button
          onClick={() => setSelected("profileMessage")}
          className="edit-btn-primary"
        >
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
              __html: DOMPurify.sanitize(userDetail.blogIntro),
            }}
          />
        </div>
        <button
          onClick={() => setSelected("blogIntro")}
          className="edit-btn-primary"
        >
          초기화
        </button>
      </div>
      {selected && (
        <Dialog
          backBtn="취소"
          onBackBtnClick={() => setSelected("")}
          title={`${userDetail.nickName} 님의\n${
            selected === "nickName"
              ? "닉네임을"
              : selected === "profileUrl"
              ? "프로필 사진을"
              : selected === "profileMessage"
              ? "상태 메세지를"
              : "블로그 소개글을"
          } 초기화할까요?`}
          isTitleSm
          redBtn="초기화"
          onBtnClick={() => onReset(selected)}
        />
      )}
      <AdminResponseDialogs
        isDone={isDialogOpen.done}
        isError={isDialogOpen.error}
        onDone={onDone}
        onError={onError}
      />
    </>
  );
}
