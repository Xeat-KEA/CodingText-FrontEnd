"use client";

import DropDown from "@/app/_components/Dropdown";
import EditBtn from "@/app/_components/TipTapEditor/EditBtn";
import { PROGRAMMING_LANGUAGES } from "@/app/_constants/constants";
import Image from "next/image";
import { KeyboardEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { IProfileData } from "../../_interfaces/interfaces";
import { DUMMY_PROFILE_DATA } from "../../_constants/constants";
import SignOutOrDeleteAccount from "../../_components/SignOut";

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
  const onEnterHandling = (e: KeyboardEvent<HTMLInputElement>) => {
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
    setIsEditing({ nickname: false, status: false });
  };

  // 정보 수정 상태 관리 state
  const [isEditing, setIsEditing] = useState({
    nickname: false,
    status: false,
  });

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
                onKeyDown={onEnterHandling}
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
          <div className="flex flex-col gap-3">
            <span className="edit-title">프로필 사진</span>
            <div className="w-[120px] h-[120px] border border-border-2 rounded-full flex justify-center items-center overflow-hidden">
              <Image
                width={120}
                height={0}
                src="/profileImg1.png"
                alt="myProfileImg"
                priority
              />
            </div>
            <div className="flex flex-col gap-1">
              <button className="edit-btn-primary">기본 프로필에서 선택</button>
              <button className="edit-btn-primary">사진 업로드</button>
            </div>
          </div>
          {/* 상태 메세지 변경 */}
          <div className="flex flex-col gap-3">
            <span className="edit-title">상태 메세지</span>
            {!isEditing.status ? (
              <span className="text-black">{data.status}</span>
            ) : (
              <input
                onKeyDown={onEnterHandling}
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
    </>
  );
}
