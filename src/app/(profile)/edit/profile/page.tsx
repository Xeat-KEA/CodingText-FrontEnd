"use client";

import DropDown from "@/app/_components/DropDown";
import EditBtn from "@/app/_components/TipTapEditor/EditBtn";
import { PROGRAMMING_LANGUAGES } from "@/app/_constants/constants";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import SignOutOrDeleteAccount from "../../_components/SignOut";
import EditProfileImgDialog from "../../_components/EditProfileImgDialog";
import { useImageHandler } from "@/app/_hooks/useImageHandler";
import EditProfileImg from "../../_components/EditProfileImg";
import { handleEnter } from "@/app/utils";
import { useCheckToken } from "@/app/_hooks/useCheckToken";
import { ProfileData } from "@/app/_interfaces/interfaces";
import api from "@/app/_api/config";

export default function EditProfilePage() {
  // 로그인 여부 확인
  const {} = useCheckToken(true);

  // 화면 갱신을 위한 현재 데이터 state 및 초기값 설정
  const [data, setData] = useState<ProfileData>({
    userId: -1,
    nickName: "",
    codeLanguage: "",
    profileMessage: "",
    profileImg: "/profileImg1.png", // 실제 이미지 받게 되면 수정 필요
  });
  // 변경사항 전체 취소를 위한 초기값 저장
  const [initialData, setInitialData] = useState<ProfileData>();

  // 프로토타입 API 내 정보 수정 GET
  useEffect(() => {
    api.get("/my-page/1").then((res) => {
      const resultData: ProfileData = {
        ...res.data.data,
        profileImg: "/profileImg1.png",
      };
      // 실제 이미지 받게 되면 수정 필요
      setData(resultData);
      setInitialData(resultData);
      setValues(resultData);
    });
  }, []);

  // 정보 수정 상태 관리 state
  const [isEditing, setIsEditing] = useState({
    nickName: false,
    profileMessage: false,
    profileImg: false,
  });

  // 수정 취소를 위한 임시값 저장
  const [tempData, setTempData] = useState({
    nickName: "",
    profileMessage: "",
  });

  // React Hook Form
  const { register, handleSubmit, setValue, getValues } = useForm<ProfileData>({
    mode: "onSubmit",
    defaultValues: initialData,
  });
  const onValid = (data: ProfileData) => {
    console.log(data);
  };

  // 수정 버튼 클릭 시
  const onEditClick = (type: "nickName" | "profileMessage") => {
    setTempData((prev) => ({
      ...prev,
      [type]: getValues(type),
    }));
    setIsEditing((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  // 취소 버튼 클릭 시
  const onCancelClick = (type: "nickName" | "profileMessage") => {
    setValue(type, tempData[type]);
    setData((prev) => ({ ...prev, [type]: tempData[type] }));
    setIsEditing((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  // 확인 버튼 클릭 시
  const onSubmitClick = (type: "nickName" | "profileMessage") => {
    if (getValues(type) !== "") {
      setValue(type, getValues(type));
      setData((prev) => ({
        ...prev,
        [type]: getValues(type),
      }));
      setIsEditing((prev) => ({
        ...prev,
        [type]: !prev[type],
      }));
    }
  };

  // 변경 사항 취소
  const onEditCancel = () => {
    if (initialData) {
      setValues(initialData);
      setData(getValues());
      setIsEditing({
        nickName: false,
        profileMessage: false,
        profileImg: false,
      });
    }
  };

  // 전체 ProfileData setValue 사용 함수
  const setValues = (data: ProfileData) => {
    setValue("userId", data.userId);
    setValue("nickName", data.nickName);
    setValue("profileImg", data.profileImg);
    setValue("codeLanguage", data.codeLanguage);
    setValue("profileMessage", data.profileMessage);
  };

  // Image 처리
  const handleImage = async (files: FileList | null) => {
    // 파일 업로드 취소
    if (files === null) {
      return;
    }

    // 이미지 업로드 및 주소 반환
    const IMG_URL = useImageHandler(files);

    // 반환받은 이미지 주소를 통해 editor에 이미지 삽입
    setData((prev) => ({ ...prev, profileImg: IMG_URL }));
    setValue("profileImg", IMG_URL);
  };

  return (
    <>
      <div className="w-full flex flex-col gap-16 px-6 pt-2 overflow-y-auto">
        <form onSubmit={handleSubmit(onValid)} className="flex flex-col gap-8">
          {/* 닉네임 변경 */}
          <div className="flex flex-col gap-3">
            <span className="edit-title">닉네임</span>
            {!isEditing.nickName ? (
              <span className="text-xl font-semibold text-black">
                {data?.nickName}
              </span>
            ) : (
              <input
                onKeyDown={handleEnter}
                className="sign-in-input"
                {...register("nickName", {
                  value: data?.nickName,
                })}
                autoComplete="off"
              />
            )}
            <EditBtn
              isEditing={isEditing.nickName}
              onEditClick={() => onEditClick("nickName")}
              onCancelClick={() => onCancelClick("nickName")}
              onSubmit={() => onSubmitClick("nickName")}
            />
          </div>
          {/* 프로필 사진 변경 */}
          <EditProfileImg
            img={data.profileImg}
            onSelectFromPreset={() =>
              setIsEditing((prev) => ({
                ...prev,
                profileImg: !prev.profileImg,
              }))
            }
            onUploadImg={(e: ChangeEvent<HTMLInputElement>) => {
              handleImage(e.target.files);
            }}
          />
          {/* 상태 메세지 변경 */}
          <div className="flex flex-col gap-3">
            <span className="edit-title">상태 메세지</span>
            {!isEditing.profileMessage ? (
              <span className="text-black">{data?.profileMessage}</span>
            ) : (
              <input
                onKeyDown={handleEnter}
                {...register("profileMessage", { value: data?.profileMessage })}
                className="sign-in-input"
              />
            )}
            <EditBtn
              isEditing={isEditing.profileMessage}
              onEditClick={() => onEditClick("profileMessage")}
              onCancelClick={() => onCancelClick("profileMessage")}
              onSubmit={() => onSubmitClick("profileMessage")}
            />
          </div>
          {/* 기본 프로그래밍 언어 변경 */}
          <div className="flex flex-col gap-3">
            <span className="edit-title">기본 프로그래밍 언어</span>
            <div className="w-[120px]">
              <DropDown
                list={PROGRAMMING_LANGUAGES}
                onSelectionClick={(selected) => {
                  setValue("codeLanguage", selected.selection);
                  setData((prev) => ({
                    ...prev,
                    codeLanguage: selected.content,
                  }));
                }}
                selection={data?.codeLanguage}
                isSmall
              />
            </div>
          </div>
          {/* 변경 사항 저장 및 취소 */}
          <div className="flex gap-4">
            <button type="submit" className="sm-btn-primary">
              변경 사항 저장
            </button>
            <button
              type="button"
              onClick={onEditCancel}
              className="sm-btn-default"
            >
              취소
            </button>
          </div>
        </form>
        {/* 로그아웃 및 회원 탈퇴 */}
        <SignOutOrDeleteAccount />
      </div>
      {/* 프로필 사진 변경 Dialog (기존 프로필에서 선택) */}
      {isEditing.profileImg && (
        <EditProfileImgDialog
          onBackBtnClick={() =>
            setIsEditing((prev) => ({ ...prev, profileImg: !prev.profileImg }))
          }
          onBtnClick={(img) => {
            setData((prev) => ({ ...prev, profileImg: img }));
            setIsEditing((prev) => ({ ...prev, profileImg: !prev.profileImg }));
          }}
          currentImg={data?.profileImg!}
        />
      )}
    </>
  );
}
