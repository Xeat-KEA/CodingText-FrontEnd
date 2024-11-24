import DropDown from "@/app/_components/DropDown";
import ProfileImgSelection from "@/app/_components/ProfileImgSelection";
import { PROGRAMMING_LANGUAGES } from "@/app/_constants/constants";
import { SignUpForm } from "../_interfaces/interfaces";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import api from "@/app/_api/config";
import { useState } from "react";

export default function SignUpFormContainer() {
  const router = useRouter();
  const { register, handleSubmit, setValue, watch } = useForm<SignUpForm>({
    defaultValues: { useSocialProfile: false },
  });
  const token = localStorage.getItem("token");

  const [language, setLanguage] = useState("");

  const [temp, setTemp] = useState();

  const onValid = (data: SignUpForm) => {
    // 데이터 post 및 validation 필요
    console.log(data);

    api
      .post("/user-service/auth/signup", data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setTemp(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={handleSubmit(onValid)} className="flex flex-col gap-8">
      {/* 닉네임 입력 */}
      <input
        {...register("nickName", { required: true })}
        className="sign-in-input"
        placeholder="닉네임"
        autoComplete="off"
      />
      {/* 언어 선택 */}
      <div className="flex flex-col gap-2">
        <span className="text-sm text-black">기본 프로그래밍 언어</span>
        <DropDown
          selection={language}
          placeholder="언어를 선택해주세요"
          list={PROGRAMMING_LANGUAGES}
          onSelectionClick={(selected) => {
            setValue("codeLanguage", selected.selection);
            setLanguage(selected.content);
          }}
        />
      </div>
      {/* 프로필 사진 선택 */}
      <div className="flex flex-col gap-2">
        <span className="text-sm text-black">프로필 사진 선택</span>
        <ProfileImgSelection
          seletedImg={watch("basicProfileUrl")}
          onSelectionClick={(selected) => {
            setValue("basicProfileUrl", selected);
          }}
        />
      </div>
      <button type="submit" className="btn-primary">
        완료
      </button>
    </form>
  );
}
