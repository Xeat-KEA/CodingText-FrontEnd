import DropDown from "@/app/_components/DropDown";
import ProfileImgSelection from "@/app/_components/ProfileImgSelection";
import { PROGRAMMING_LANGUAGES } from "@/app/_constants/constants";
import { SignUpForm } from "../_interfaces/interfaces";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import api from "@/app/_api/config";
import { useEffect, useState } from "react";
import SmCheckBoxBtn from "@/app/_components/SmCheckBoxBtn";

export default function SignUpFormContainer() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<SignUpForm>({
    defaultValues: { useSocialProfile: false },
    mode: "onBlur",
  });

  // 회원가입 중에 토큰 임시 저장 및 localStorage에서의 토큰 삭제
  const [tempToken, setTempToken] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("tempToken");
    setTempToken(token || "");
  }, []);
  useEffect(() => {
    if (tempToken) {
      localStorage.removeItem("tempToken");
    }
  }, [tempToken]);

  const [language, setLanguage] = useState("");

  // 닉네임 중복 검사 validation
  const checkNickNameExists = async (nickname: string) => {
    const { data: isNickNameExists } = await api.post(
      "/user-service/auth/nickname",
      {},
      { params: { nickname }, headers: { Authorization: tempToken } }
    );
    return isNickNameExists ? "이미 가입된 닉네임이에요" : undefined;
  };

  const onValid = async (data: SignUpForm) => {
    // data validation
    if (!data.codeLanguage) {
      setError("codeLanguage", {
        type: "custom",
        message: "언어를 선택해주세요",
      });
      return;
    }
    if (!data.basicProfileUrl && !data.useSocialProfile) {
      setError("basicProfileUrl", {
        type: "custom",
        message: "프로필 사진을 선택해주세요",
      });
      return;
    }

    try {
      const {
        data: { userId, jwtToken },
      } = await api.post("/user-service/auth/signup", data, {
        headers: { Authorization: `Bearer ${tempToken}` },
      });
      localStorage.setItem("accessToken", jwtToken.accessToken);
      localStorage.setItem("refreshToken", jwtToken.refreshToken);
      localStorage.setItem("userId", userId);
      router.push("/sign-up/done");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onValid)} className="flex flex-col gap-10">
      {/* 닉네임 입력 */}
      <div className="relative flex flex-col gap-2">
        <span className="text-sm text-black">닉네임</span>
        <input
          {...register("nickName", {
            required: "닉네임을 입력해주세요",
            pattern: {
              value: /^[가-힣a-zA-Z0-9]{2,8}$/,
              message:
                "한글, 영어, 숫자 2자 ~ 8자 (공백, 초성, 특수문자 입력 불가)",
            },
            validate: async (nickName) => await checkNickNameExists(nickName),
          })}
          className={`sign-in-input ${errors.nickName && "!border-red"}`}
          placeholder="닉네임"
          autoComplete="off"
        />
        {errors.nickName && (
          <span className="absolute top-[calc(100%+4px)] left-0 whitespace-nowrap text-xs font-bold text-red">
            {errors.nickName.message}
          </span>
        )}
      </div>
      {/* 언어 선택 */}
      <div className="flex flex-col gap-2">
        <span className="text-sm text-black">기본 프로그래밍 언어</span>
        <div className="relative">
          <DropDown
            selection={language}
            placeholder="언어를 선택해주세요"
            list={PROGRAMMING_LANGUAGES}
            onSelectionClick={(selected) => {
              setValue("codeLanguage", selected.selection);
              setLanguage(selected.content);
              clearErrors("codeLanguage");
            }}
            isError={errors.codeLanguage !== undefined}
          />
          {errors.codeLanguage && (
            <span className="absolute top-[calc(100%+4px)] left-0 whitespace-nowrap text-xs font-bold text-red">
              {errors.codeLanguage.message}
            </span>
          )}
        </div>
      </div>
      {/* 프로필 사진 선택 */}
      <div className="flex flex-col gap-2 relative">
        <span className="text-sm text-black">프로필 사진 선택</span>
        <ProfileImgSelection
          seletedImg={watch("basicProfileUrl")}
          onSelectionClick={(selected) => {
            setValue("basicProfileUrl", selected);
            clearErrors("basicProfileUrl");
          }}
          isDisabled={watch("useSocialProfile")}
          isError={errors.basicProfileUrl !== undefined}
        />
        <div>
          <SmCheckBoxBtn
            isActive={watch("useSocialProfile")}
            content="소셜 아이디 프로필 사진 사용"
            onClick={() => {
              const currentValue = watch("useSocialProfile");
              setValue("useSocialProfile", !currentValue);
              clearErrors("basicProfileUrl");
            }}
          />
        </div>
        {errors.basicProfileUrl && (
          <span className="absolute top-[calc(100%+4px)] left-0 whitespace-nowrap text-xs font-bold text-red">
            {errors.basicProfileUrl.message}
          </span>
        )}
      </div>
      <button type="submit" className="btn-primary">
        완료
      </button>
    </form>
  );
}
