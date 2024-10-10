"use client";

import DropDown from "@/app/_components/Dropdown";
import EditBtn from "@/app/_components/TipTapEditor/EditBtn";
import { PROGRAMMING_LANGUAGES } from "@/app/_constants/constants";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IProfileData } from "../../_interfaces/interfaces";
import { DUMMY_PROFILE_DATA } from "../../_constants/constants";

export default function EditProfilePage() {
  // 변경사항 전체 취소를 위한 초기값 저장
  const initialData = DUMMY_PROFILE_DATA;
  // 수정 취소를 위한 임시값 저장
  const [tempData, setTempData] = useState({ nickname: "", status: "" });
  // 화면 갱신을 위한 현재 데이터 state
  const [data, setData] = useState<IProfileData>(DUMMY_PROFILE_DATA);

  const { register, handleSubmit, setValue, getValues } = useForm<IProfileData>(
    { mode: "onSubmit", defaultValues: initialData }
  );
  const onSubmit = (data: IProfileData) => {
    console.log(data);
  };

  const [isEditing, setIsEditing] = useState({
    nickname: false,
    status: false,
  });

  return (
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
              className="sign-in-input"
              {...register("nickname", {
                value: data.nickname,
              })}
            />
          )}
          <EditBtn
            isEditing={isEditing.nickname}
            onEditClick={() => {
              setTempData((prev) => ({
                ...prev,
                nickname: getValues("nickname"),
              }));
              setIsEditing((prev) => ({ ...prev, nickname: !prev.nickname }));
            }}
            onCancelClick={() => {
              setValue("nickname", tempData.nickname);
              setData((prev) => ({ ...prev, nickname: tempData.nickname }));
              setIsEditing((prev) => ({ ...prev, nickname: !prev.nickname }));
            }}
            onSubmit={() => {
              if (getValues("nickname") !== "") {
                setValue("nickname", getValues("nickname"));
                setData((prev) => ({
                  ...prev,
                  nickname: getValues("nickname"),
                }));
                setIsEditing((prev) => ({ ...prev, nickname: !prev.nickname }));
              }
            }}
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
              {...register("status", { value: data.status })}
              className="sign-in-input"
            />
          )}
          <EditBtn
            isEditing={isEditing.status}
            onEditClick={() => {
              setTempData((prev) => ({
                ...prev,
                status: getValues("status"),
              }));
              setIsEditing((prev) => ({ ...prev, status: !prev.status }));
            }}
            onCancelClick={() => {
              setValue("status", tempData.status);
              setIsEditing((prev) => ({ ...prev, status: !prev.status }));
            }}
            onSubmit={() => {
              if (getValues("status") !== "") {
                setValue("status", getValues("status"));
                setData((prev) => ({ ...prev, status: getValues("status") }));
                setIsEditing((prev) => ({ ...prev, status: !prev.status }));
              }
            }}
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
                setData((prev) => ({ ...prev, programmingLanguage: selected }));
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
            onClick={() => {
              setValue("nickname", initialData.nickname);
              setValue("profileImg", initialData.profileImg);
              setValue("programmingLanguage", initialData.programmingLanguage);
              setValue("status", initialData.status);
              setData(getValues());
              setIsEditing({ nickname: false, status: false });
            }}
            className="sm-btn-default"
          >
            취소
          </button>
        </div>
      </form>
      <div className="flex flex-col gap-8">
        <button className="edit-btn-red">로그아웃</button>
        <button className="edit-btn-red">회원탈퇴</button>
      </div>
    </div>
  );
}
