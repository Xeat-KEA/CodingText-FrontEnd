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
    watch,
    formState: { errors },
  } = useForm<SignUpForm>({ mode: "onChange" });
  const onValid = (data: SignUpForm) => {
    const submitForm = { email: data.email, password: data.password };
    api
      .post("/admin-service/auth/signup", submitForm)
      .then((res) => {
        console.log(res);
        setIsDone((prev) => !prev);
      })
      .catch((err) => console.error(err));
  };

  const [isDone, setIsDone] = useState(false);

  const checkEmailExists = async (email: string) => {
    const { data: isEmailExists } = await api.post(
      "/admin-service/auth/email",
      {},
      { params: { email } }
    );
    return isEmailExists ? "이미 가입된 이메일이에요" : undefined;
  };

  return (
    <>
      <div className="sign-in-container">
        <SignInTitle title="관리자 회원가입" />
        <form
          onSubmit={handleSubmit(onValid)}
          className="flex flex-col w-full gap-10"
        >
          {/* 아이디 비밀번호 입력 */}
          <div className="flex flex-col gap-10">
            <div className="relative">
              <input
                {...register("email", {
                  required: "이메일을 입력해주세요",
                  pattern: {
                    value: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
                    message: "이메일이 형식에 맞지 않습니다",
                  },
                  validate: async (email) => await checkEmailExists(email),
                })}
                className={`sign-in-input ${errors.email && "!border-red"}`}
                placeholder="이메일"
                autoComplete="off"
                type="text"
              />
              {errors.email && (
                <span className="form-error-text">{errors.email.message}</span>
              )}
            </div>
            <div className="relative">
              <input
                {...register("password", {
                  required: "비밀번호를 입력해주세요",
                  pattern: {
                    value:
                      /^[A-Za-z\d!#$%^&*()_+={}\[\]|\\:;\"'<>,.?/~`-]{8,16}$/,
                    message:
                      "8 ~ 16자 사이의 영문, 숫자, 특수문자로 입력해주세요",
                  },
                })}
                className={`sign-in-input ${errors.password && "!border-red"}`}
                placeholder="비밀번호"
                autoComplete="off"
                type="password"
              />
              {errors.password && (
                <span className="form-error-text">
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className="relative">
              <input
                {...register("verify", {
                  required: "비밀번호를 다시 입력해주세요",
                  validate: (value) =>
                    watch("password") !== value
                      ? "비밀번호가 일치하지 않아요"
                      : undefined,
                })}
                className={`sign-in-input ${errors.verify && "!border-red"}`}
                placeholder="비밀번호 확인"
                autoComplete="off"
                type="password"
              />
              {errors.verify && (
                <span className="form-error-text">{errors.verify.message}</span>
              )}
            </div>
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
