import { useForm } from "react-hook-form";
import { SignInForm } from "../_interfaces/interfaces";
import api from "@/app/_api/config";
import { useState } from "react";
import Dialog from "@/app/_components/Dialog";
import { DialogXIcon } from "@/app/_components/Icons";
import { useRouter } from "next/navigation";
import SignInTitle from "@/app/(sign-in)/_components/SignInTitle";
import axios from "axios";

export default function AdminSignInFormContainer() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<SignInForm>();

  // 로그인 실패 여부
  const [isCorrect, setIsCorrect] = useState(true);
  // 관리자 승인 대기 여부
  const [isWaiting, setIsWaiting] = useState(false);
  const onValid = async (data: SignInForm) => {
    console.log(data);
    if (!data.email || !data.password) {
      // 아이디 비밀번호 미입력 시
      return;
    }
    try {
      const response = await api.post("/admin-service/auth/login", data);
      // 관리자 승인 대기 처리
      if (response.data.isWaiting) {
        setIsWaiting(true);
      } else {
        const accessToken = response.data.jwtToken.accessToken;
        console.log(response.data);

        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
          router.push("/admin/user");
        }
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        // 등록되지 않은 계정
        if (err.response?.status === 404) {
          setIsCorrect(false);
        }
        // 승인 대기 중인 계정
        else if (err.response?.status === 403) {
          setIsCorrect(true);
          setIsWaiting((prev) => !prev);
        } else {
          console.error(err);
          setIsCorrect(false);
        }
      }
    }
  };
  return (
    <>
      <div className="sign-in-container">
        <SignInTitle title="관리자 로그인" />
        <form
          onSubmit={handleSubmit(onValid)}
          className="flex flex-col w-full gap-8"
        >
          {/* 아이디 비밀번호 입력 */}
          <div className="flex flex-col gap-6">
            <input
              {...register("email", { required: true })}
              className="sign-in-input"
              placeholder="이메일"
              autoComplete="off"
              type="text"
            />
            <input
              {...register("password", { required: true })}
              className="sign-in-input"
              placeholder="비밀번호"
              autoComplete="off"
              type="password"
            />
          </div>
          {/* 로그인 실패 시의 경고 메세지 */}
          {/* 로그인 / 회원가입 */}
          <div className="relative flex flex-col gap-3 items-center">
            {!isCorrect && (
              <span className="absolute -top-2 -translate-y-full text-xs font-bold text-red">
                등록되지 않은 계정입니다
              </span>
            )}
            <button type="submit" className="btn-primary w-full">
              로그인
            </button>
            <button
              type="button"
              onClick={() => router.push("/admin/sign-up")}
              className="edit-btn text-body font-semibold"
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
      {/* 관리자 승인 대기 시 표시 */}
      {isWaiting && (
        <Dialog
          icon={<DialogXIcon />}
          title={"관리자 승인을\n기다리고 있어요"}
          content={"관리자 승인 처리 후\n관리자로 로그인 할 수 있어요"}
          backBtn="취소"
          onBackBtnClick={() => setIsWaiting((prev) => !prev)}
        />
      )}
    </>
  );
}
