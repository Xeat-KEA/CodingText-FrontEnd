import { useOutsideClick } from "@/app/_hooks/useOutsideClick";
import { EditProfileImgDialogProps } from "../_interfaces/interfaces";
import ProfileImgSelection from "@/app/_components/ProfileImgSelection";
import { useState } from "react";

export default function EditProfileImgDialog({
  onBackBtnClick,
  onBtnClick,
  currentImg,
}: EditProfileImgDialogProps) {
  const ref = useOutsideClick(onBackBtnClick);
  const [selectedImg, setSelectedImg] = useState(currentImg);
  return (
    <div className="overlay">
      <div
        ref={ref}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] flex flex-col gap-6 bg-white p-6 rounded-2xl shadow-1"
      >
        <div className="flex flex-col items-center gap-4 py-6">
          <div className="flex flex-col gap-2 text-center">
            <span className="whitespace-pre-wrap text-black text-xl font-semibold">
              {"프로필 사진을\n선택해주세요"}
            </span>
          </div>
        </div>
        <ProfileImgSelection
          seletedImg={selectedImg}
          onSelectionClick={(selected) => setSelectedImg(selected)}
        />
        <div className="flex gap-4">
          {/* 뒤로가기 버튼 */}
          <button onClick={onBackBtnClick} className="btn-default w-full">
            취소
          </button>
          {/* Primary 색상 버튼 */}
          <button
            onClick={() => onBtnClick(selectedImg)}
            className="btn-primary w-full"
          >
            프로필 사진 변경
          </button>
        </div>
      </div>
    </div>
  );
}
