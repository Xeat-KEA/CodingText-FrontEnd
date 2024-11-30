import { SmCheckBoxBtnProps } from "../_interfaces/interfaces";
import { SmCheckBoxIcon } from "./Icons";

export default function SmCheckBoxBtn({
  isActive,
  onClick,
  content,
}: SmCheckBoxBtnProps) {
  return (
    <button
      onClick={onClick}
      className="w-fit flex gap-2 items-center text-xs text-black"
      type="button"
    >
      <SmCheckBoxIcon isActive={isActive} />
      {content}
    </button>
  );
}
