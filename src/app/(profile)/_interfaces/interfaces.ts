import { ChangeEvent } from "react";

export interface IProfileData {
  nickname: string;
  profileImg: string;
  status: string;
  programmingLanguage: string;
}

export interface IEditProfileImg {
  img: string;
  onSelectFromPreset: () => void;
  onUploadImg: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface IEditProfileImgDialog {
  onBackBtnClick: () => void;
  onBtnClick: (img: string) => void;
  currentImg: string;
}
