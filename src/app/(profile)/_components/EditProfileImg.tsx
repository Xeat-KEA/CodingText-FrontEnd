import { EditProfileImgProps } from "../_interfaces/interfaces";
import ProfileImgContainer from "@/app/_components/ProfileImgContainer";

export default function EditProfileImg({
  img,
  onSelectFromPreset,
  onUploadImg,
}: EditProfileImgProps) {
  return (
    <div className="flex flex-col gap-3">
      <span className="edit-title">프로필 사진</span>
      <ProfileImgContainer width={120} height={120} src={img} />
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
