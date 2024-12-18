import api from "@/app/_api/config";
import Dialog from "@/app/_components/Dialog";
import { useTokenStore } from "@/app/stores";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignOutOrDeleteAccount() {
  const router = useRouter();

  // 회원 탈퇴 상태 관리 state
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  const { accessToken, setAccessToken } = useTokenStore();

  return (
    <>
      <div className="flex flex-col gap-8">
        <button
          onClick={() => {
            localStorage.removeItem("accessToken");
            setAccessToken("");
            router.push("/", { scroll: false });
          }}
          className="edit-btn-red"
        >
          로그아웃
        </button>
        <button
          onClick={() => setIsDeletingAccount((prev) => !prev)}
          className="edit-btn-red"
        >
          회원 탈퇴
        </button>
      </div>
      {isDeletingAccount && (
        <Dialog
          title="회원 탈퇴"
          content={
            "가입된 회원 정보가 전부 삭제됩니다\n삭제된 계정은 복구할 수 없습니다\n회원 탈퇴를 진행하시겠습니까?"
          }
          isWarning
          backBtn="취소"
          onBackBtnClick={() => setIsDeletingAccount((prev) => !prev)}
          redBtn="회원 탈퇴"
          onBtnClick={() => {
            api
              .delete("/user-service/users", {
                headers: { Authorization: accessToken },
              })
              .then((res) => {
                localStorage.clear();
                setAccessToken("");
                router.push("/", { scroll: false });
              })
              .catch((err) => console.log(err));
          }}
        />
      )}
    </>
  );
}
