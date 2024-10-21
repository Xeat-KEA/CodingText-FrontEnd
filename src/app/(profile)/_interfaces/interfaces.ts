import { ChangeEvent } from "react";

export interface ProfileData {
  nickname: string;
  profileImg: string;
  status: string;
  programmingLanguage: string;
}

export interface EditProfileImgProps {
  img: string;
  onSelectFromPreset: () => void;
  onUploadImg: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface EditProfileImgDialogProps {
  onBackBtnClick: () => void;
  onBtnClick: (img: string) => void;
  currentImg: string;
}
