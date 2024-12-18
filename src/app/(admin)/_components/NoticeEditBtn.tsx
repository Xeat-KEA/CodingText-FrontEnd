import { BpEditIcon } from "@/app/(blog)/_components/Icons";
import IconBtn from "@/app/_components/IconBtn";
import { EditBtnProps } from "@/app/_interfaces/interfaces";

export default function NoticeEditBtn({
  isEditing,
  onEditClick,
  onCancelClick,
  onSubmit,
}: EditBtnProps) {
  return (
    <div className="flex gap-4">
      {!isEditing ? (
        <IconBtn type="edit" content="수정" onClick={onEditClick} />
      ) : (
        <>
          <button
            type="button"
            onClick={onCancelClick}
            className="edit-btn-default">
            취소
          </button>
          <button type="button" onClick={onSubmit} className="edit-btn-primary">
            확인
          </button>
        </>
      )}
    </div>
  );
}
