import { IEditBtn } from "@/app/_interfaces/interfaces";

export default function EditBtn({
  isEditing,
  onEditClick,
  onCancelClick,
  onSubmit,
}: IEditBtn) {
  return (
    <div className="flex gap-4">
      {!isEditing ? (
        <button onClick={onEditClick} className="edit-btn-primary">
          수정
        </button>
      ) : (
        <>
          <button onClick={onCancelClick} className="edit-btn-default">
            취소
          </button>
          <button onClick={onSubmit} className="edit-btn-primary">
            확인
          </button>
        </>
      )}
    </div>
  );
}
