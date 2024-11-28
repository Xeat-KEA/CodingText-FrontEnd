import EditBtn from "@/app/_components/TipTapEditor/EditBtn";
import { useImageHandler } from "@/app/_hooks/useImageHandler";
import { handleEnter } from "@/app/utils";
import { ChangeEvent, useEffect, useState } from "react";
import EditProfileImg from "./EditProfileImg";
import { PROGRAMMING_LANGUAGES } from "@/app/_constants/constants";
import DropDown from "@/app/_components/DropDown";
import EditProfileImgDialog from "./EditProfileImgDialog";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import api from "@/app/_api/config";
import { UserInfoForm } from "../_interfaces/interfaces";
import { useTokenStore } from "@/app/stores";
import Dialog from "@/app/_components/Dialog";
import { DialogCheckIcon } from "@/app/_components/Icons";

export default function EditProfileFormContainer() {
  const { accessToken, isTokenSet } = useTokenStore();

  const [language, setLanguage] = useState("");

  // API 호출
  const fetchUserData = async () => {
    if (accessToken) {
      const response = await api.get("/user-service/users/userInfo", {
        headers: { Authorization: accessToken },
      });
      return response.data;
    } else {
      return null;
    }
  };
  const { data, isLoading } = useQuery<UserInfoForm>({
    queryKey: ["UserData", isTokenSet],
    queryFn: fetchUserData,
  });

  // 변경사항 전체 취소를 위한 초기값 저장
  const [initialData, setInitialData] = useState<UserInfoForm>();
  useEffect(() => {
    if (data) {
      setInitialData(data);
      setValues(data);
      setLanguage(
        PROGRAMMING_LANGUAGES.find((el) => el.selection === data.codeLanguage)
          ?.content!
      );
    }
  }, [isLoading]);

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

  // 저장 완료 시 Dialog 출력
  const [hasSaved, setHasSaved] = useState(false);

  // React Hook Form
  const { register, handleSubmit, setValue, getValues, watch } =
    useForm<UserInfoForm>({
      mode: "onSubmit",
      defaultValues: initialData,
    });

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
    setIsEditing((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  // 전체 UserInfoForm setValue 사용 함수
  const setValues = (data: UserInfoForm) => {
    setValue("nickName", data.nickName);
    setValue("profileUrl", data.profileUrl);
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
    setValue("profileUrl", IMG_URL);
  };

  // 변경 사항 취소
  const onEditCancel = () => {
    if (initialData) {
      setValues(initialData);
      setIsEditing({
        nickName: false,
        profileMessage: false,
        profileImg: false,
      });
    }
  };

  // 닉네임, 상태 메세지 확인 버튼 클릭 시
  const onSubmitClick = (type: "nickName" | "profileMessage") => {
    if (getValues(type) !== "") {
      setValue(type, getValues(type));
      setIsEditing((prev) => ({
        ...prev,
        [type]: !prev[type],
      }));
    }
  };

  // 프로필 수정 결과 POST
  const onValid = (data: UserInfoForm) => {
    // validation 필요
    if (data) {
      api
        .put("/user-service/users/userInfo", data, {
          headers: { Authorization: accessToken },
        })
        .then((res) => {
          setHasSaved((prev) => !prev);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onValid)} className="flex flex-col gap-8">
        {/* 닉네임 변경 */}
        <div className="edit-container">
          <span className="edit-title">닉네임</span>
          {!isEditing.nickName ? (
            <span className="edit-xl-content">{watch("nickName")}</span>
          ) : (
            <input
              onKeyDown={handleEnter}
              className="sign-in-input"
              {...register("nickName", { required: true })}
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
          img={watch("profileUrl")}
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
        <div className="edit-container">
          <span className="edit-title">상태 메세지</span>
          {!isEditing.profileMessage ? (
            <span className="edit-sm-content">{watch("profileMessage")}</span>
          ) : (
            <input
              onKeyDown={handleEnter}
              {...register("profileMessage", { required: true })}
              className="sign-in-input"
              autoComplete="off"
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
        <div className="edit-container">
          <span className="edit-title">기본 프로그래밍 언어</span>
          <div className="w-[120px]">
            <DropDown
              list={PROGRAMMING_LANGUAGES}
              onSelectionClick={(selected) => {
                setValue("codeLanguage", selected.selection);
                setLanguage(selected.content);
              }}
              selection={language}
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
      {/* 프로필 사진 변경 Dialog (기존 프로필에서 선택) */}
      {isEditing.profileImg && (
        <EditProfileImgDialog
          onBackBtnClick={() =>
            setIsEditing((prev) => ({ ...prev, profileImg: !prev.profileImg }))
          }
          onBtnClick={(img) => {
            setValue("profileUrl", img);
            setIsEditing((prev) => ({ ...prev, profileImg: !prev.profileImg }));
          }}
          currentImg={watch("profileUrl")}
        />
      )}
      {hasSaved && (
        <Dialog
          icon={<DialogCheckIcon />}
          backBtn="확인"
          onBackBtnClick={() => setHasSaved((prev) => !prev)}
          title={"변경 사항이\n저장되었어요!"}
        />
      )}
    </>
  );
}
