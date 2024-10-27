import { useForm } from "react-hook-form";
import { SignInForm } from "../_interfaces/interfaces";
import api from "@/app/_api/config";
import { useState } from "react";

export default function AdminSignInFormContainer() {
  const { register, handleSubmit } = useForm<SignInForm>();

  // 로그인 실패 여부
  const [isCorrect, setIsCorrect] = useState(true);
  const onValid = async (data: SignInForm) => {
    try {
      const response = await api.get("login", { data });
    } catch (err) {
      setIsCorrect(false);
    }
  };
  return (
    <div className="sign-in-container">
      {/* 리팩토링 Merge 후 <SignInTitle title="관리자 로그인" /> */}
      <span className="self-center text-xl font-semibold text-black">
        관리자 로그인
      </span>
      <form
        onSubmit={handleSubmit(onValid)}
        className="flex flex-col w-full gap-8"
      >
        {/* 아이디 비밀번호 입력 */}
        <div className="flex flex-col gap-4">
          <input
            {...register("username", { required: true })}
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
          <button className="btn-primary w-full">로그인</button>
          <button className="edit-btn text-body font-semibold">회원가입</button>
        </div>
      </form>
    </div>
  );
}
