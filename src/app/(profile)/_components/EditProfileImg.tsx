import Image from "next/image";
import { IEditProfileImg } from "../_interfaces/interfaces";

export default function EditProfileImg({
  img,
  onSelectFromPreset,
  onUploadImg,
}: IEditProfileImg) {
  return (
    <div className="flex flex-col gap-3">
      <span className="edit-title">프로필 사진</span>
      <div className="relative w-[120px] h-[120px] border border-border-2 rounded-full flex justify-center items-center overflow-hidden">
        <Image
          fill
          sizes="100%"
          src={img}
          alt="myProfileImg"
          priority
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-1">
        {/* 기본 프로필에서 선택 */}
        <button
          type="button"
          onClick={onSelectFromPreset}
          className="edit-btn-primary"
        >
          기본 프로필에서 선택
        </button>
        {/* 이미지 직접 업로드 */}
        <input
          id="image"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={onUploadImg}
        />
        <label htmlFor="image" className="edit-btn-primary cursor-pointer">
          사진 업로드
        </label>
      </div>
    </div>
  );
}
