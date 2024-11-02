import { SmCheckBoxBtnProps } from "../_interfaces/interfaces";
import { SmCheckBoxIcon } from "./Icons";

export default function SmCheckBoxBtn({
  isActive,
  onClick,
}: SmCheckBoxBtnProps) {
  return (
    <button
      onClick={onClick}
      className="w-fit flex gap-2 items-center text-xs text-black"
    >
      <SmCheckBoxIcon isActive={isActive} />
      모든 사용자에게 전달
    </button>
  );
}
