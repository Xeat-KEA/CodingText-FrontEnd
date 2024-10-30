import { SaveOrCancelBtnProps } from "../_interfaces/interfaces";

export default function SaveOrCancelBtn({
  saveBtn,
  onCancel,
}: SaveOrCancelBtnProps) {
  return (
    <div className="flex gap-4">
      <button type="button" onClick={onCancel} className="sm-btn-default">
        취소
      </button>
      <button type="submit" className="sm-btn-primary">
        {saveBtn}
      </button>
    </div>
  );
}
