"use client";

import SignInTitle from "@/app/(sign-in)/_components/SignInTitle";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { SignUpForm } from "../_interfaces/interfaces";
import { useState } from "react";
import Dialog from "@/app/_components/Dialog";
import { DialogCheckIcon } from "@/app/_components/Icons";
import api from "@/app/_api/config";

export default function AdminSignUpFormContainer() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors },
  } = useForm<SignUpForm>({ mode: "onChange" });
  const onValid = (data: SignUpForm) => {
    if (data.password !== data.verify) {
    } else {
      // API 호출 구현 필요
      const submitForm = { email: data.email, password: data.password };
      api
        .post("/admin-service/auth/signup", submitForm)
        .then((res) => {
          console.log(res);
          setIsDone((prev) => !prev);
        })
        .catch((err) => console.error(err));
    }
  };

  const [isDone, setIsDone] = useState(false);

  return (
    <>
      <div className="sign-in-container">
        <SignInTitle title="관리자 회원가입" />
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
            <input
              {...register("verify", { required: true })}
              className="sign-in-input"
              placeholder="비밀번호 확인"
              autoComplete="off"
              type="password"
            />
          </div>
          {/* 로그인 실패 시의 경고 메세지 */}
          {/* 로그인 / 회원가입 */}
          <div className="relative flex flex-col gap-3 items-center">
            <button type="submit" className="btn-primary w-full">
              관리자 회원가입 신청
            </button>
            <button
              type="button"
              onClick={() => router.push("/admin/sign-in")}
              className="edit-btn text-body font-semibold"
            >
              뒤로
            </button>
          </div>
        </form>
      </div>
      {isDone && (
        <Dialog
          icon={<DialogCheckIcon />}
          title={"관리자 회원가입\n신청이 완료되었어요"}
          content={"관리자 회원가입 승인 후\n관리자로 로그인 할 수 있어요"}
          backBtn="확인"
          onBackBtnClick={() => router.push("/admin/sign-in")}
          blockOutsideClick
        />
      )}
    </>
  );
}
