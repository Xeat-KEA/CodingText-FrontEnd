import { EditOrCancelBtnProps } from "../_interfaces/interfaces";

export default function EditOrCancelBtn({
  editBtn,
  onEdit,
  onCancel,
}: EditOrCancelBtnProps) {
  return (
    <div className="flex gap-4">
      <button type="submit" onClick={onEdit} className="sm-btn-primary">
        {editBtn}
      </button>
      <button type="button" onClick={onCancel} className="sm-btn-default">
        취소
      </button>
    </div>
  );
}
