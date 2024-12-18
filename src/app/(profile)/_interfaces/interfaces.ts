import { ChangeEvent } from "react";

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

export interface UserInfoForm {
  nickName: string;
  profileUrl: string;
  profileMessage: string;
  codeLanguage: string;
}
