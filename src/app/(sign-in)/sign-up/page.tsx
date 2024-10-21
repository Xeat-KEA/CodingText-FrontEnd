"use client";

import DropDown from "@/app/_components/DropDown";
import { PROGRAMMING_LANGUAGES } from "@/app/_constants/constants";
import { useState } from "react";
import { useForm } from "react-hook-form";
import SmBackBtn from "../_components/SmBackBtn";
import { useRouter } from "next/navigation";
import ProfileImgSelection from "@/app/_components/ProfileImgSelection";
import { SignUpForm } from "../_interfaces/interfaces";

export default function SignUpPage() {
  const router = useRouter();
  const { register, handleSubmit, setValue } = useForm<SignUpForm>();
  const [selectedLang, setSelectedLang] = useState("");
  const [selectedProfileImg, setSelectedProfileImg] =
    useState("/profileImg1.png");

  const onValid = (data: SignUpForm) => {
    // 데이터 post 및 validation 필요
    console.log(data);

    if (!data.lang) {
      console.log("error");
    } else {
      router.push("/sign-up/done");
    }
  };

  return (
    <div className="sign-in-container">
      <div className="flex flex-col gap-4 items-center relative">
        <span className="sign-in-title">회원가입</span>
        <span className="sign-in-content">
          {"거의 다 끝났어요!\n당신의 정보를 입력해주세요"}
        </span>
        <SmBackBtn />
      </div>
      <form onSubmit={handleSubmit(onValid)} className="flex flex-col gap-8">
        {/* 닉네임 입력 */}
        <input
          {...register("nickname", { required: true })}
          className="sign-in-input"
          placeholder="닉네임"
          autoComplete="off"
        />
        {/* 언어 선택 */}
        <div className="flex flex-col gap-2">
          <span className="text-sm text-black">기본 프로그래밍 언어</span>
          <DropDown
            selection={selectedLang}
            placeholder="언어를 선택해주세요"
            list={PROGRAMMING_LANGUAGES}
            onSelectionClick={(selected) => {
              setSelectedLang(selected.content);
              setValue("lang", selected.selection);
            }}
          />
        </div>
        {/* 프로필 사진 선택 */}
        <div className="flex flex-col gap-2">
          <span className="text-sm text-black">프로필 사진 선택</span>
          <ProfileImgSelection
            seletedImg={selectedProfileImg}
            onSelectionClick={(selected) => {
              setSelectedProfileImg(selected);
              setValue("profileImg", selected);
            }}
          />
        </div>
        <button type="submit" className="btn-primary">
          완료
        </button>
      </form>
    </div>
  );
}
