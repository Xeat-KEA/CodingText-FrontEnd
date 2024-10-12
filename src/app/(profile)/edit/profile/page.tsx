"use client";

import DropDown from "@/app/_components/Dropdown";
import EditBtn from "@/app/_components/TipTapEditor/EditBtn";
import { PROGRAMMING_LANGUAGES } from "@/app/_constants/constants";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { IProfileData } from "../../_interfaces/interfaces";
import { DUMMY_PROFILE_DATA } from "../../_constants/constants";
import SignOutOrDeleteAccount from "../../_components/SignOut";
import EditProfileImgDialog from "../../_components/EditProfileImgDialog";
import { useImageHandler } from "@/app/_hooks/useImageHandler";
import EditProfileImg from "../../_components/EditProfileImg";

export default function EditProfilePage() {
  // 변경사항 전체 취소를 위한 초기값 저장
  const initialData = DUMMY_PROFILE_DATA;
  // 수정 취소를 위한 임시값 저장
  const [tempData, setTempData] = useState({ nickname: "", status: "" });
  // 화면 갱신을 위한 현재 데이터 state
  const [data, setData] = useState<IProfileData>(DUMMY_PROFILE_DATA);

  // React Hook Form
  const { register, handleSubmit, setValue, getValues } = useForm<IProfileData>(
    { mode: "onSubmit", defaultValues: initialData }
  );
  const onSubmit = (data: IProfileData) => {
    console.log(data);
  };
  // input 내에서 Enter가 눌렸을 경우 Submit이 일어나는 것 방지
  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  // 수정 버튼 클릭 시
  const onEditClick = (type: "nickname" | "status") => {
    setTempData((prev) => ({
      ...prev,
      [type]: getValues(type),
    }));
    setIsEditing((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  // 취소 버튼 클릭 시
  const onCancelClick = (type: "nickname" | "status") => {
    setValue(type, tempData[type]);
    setData((prev) => ({ ...prev, [type]: tempData[type] }));
    setIsEditing((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  // 확인 버튼 클릭 시
  const onSubmitClick = (type: "nickname" | "status") => {
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
    setValue("nickname", initialData.nickname);
    setValue("profileImg", initialData.profileImg);
    setValue("programmingLanguage", initialData.programmingLanguage);
    setValue("status", initialData.status);
    setData(getValues());
    setIsEditing({ nickname: false, status: false, profileImg: false });
  };

  // 정보 수정 상태 관리 state
  const [isEditing, setIsEditing] = useState({
    nickname: false,
    status: false,
    profileImg: false,
  });

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
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
          {/* 닉네임 변경 */}
          <div className="flex flex-col gap-3">
            <span className="edit-title">닉네임</span>
            {!isEditing.nickname ? (
              <span className="text-xl font-semibold text-black">
                {data.nickname}
              </span>
            ) : (
              <input
                onKeyDown={handleEnter}
                className="sign-in-input"
                {...register("nickname", {
                  value: data.nickname,
                })}
              />
            )}
            <EditBtn
              isEditing={isEditing.nickname}
              onEditClick={() => onEditClick("nickname")}
              onCancelClick={() => onCancelClick("nickname")}
              onSubmit={() => onSubmitClick("nickname")}
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
            {!isEditing.status ? (
              <span className="text-black">{data.status}</span>
            ) : (
              <input
                onKeyDown={handleEnter}
                {...register("status", { value: data.status })}
                className="sign-in-input"
              />
            )}
            <EditBtn
              isEditing={isEditing.status}
              onEditClick={() => onEditClick("status")}
              onCancelClick={() => onCancelClick("status")}
              onSubmit={() => onSubmitClick("status")}
            />
          </div>
          {/* 기본 프로그래밍 언어 변경 */}
          <div className="flex flex-col gap-3">
            <span className="edit-title">기본 프로그래밍 언어</span>
            <div className="w-[120px]">
              <DropDown
                list={PROGRAMMING_LANGUAGES}
                onSelectionClick={(selected) => {
                  setValue("programmingLanguage", selected);
                  setData((prev) => ({
                    ...prev,
                    programmingLanguage: selected,
                  }));
                }}
                selection={data.programmingLanguage}
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
          currentImg={data.profileImg}
        />
      )}
    </>
  );
}
