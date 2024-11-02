import { SmBackIcon } from "../(sign-in)/_components/Icons";
import { SmBackBtnProps } from "../_interfaces/interfaces";

export default function SmBackBtn({ content, onClick }: SmBackBtnProps) {
  return (
    <button className="flex items-center gap-1">
      <SmBackIcon />
      <span onClick={onClick} className="text-xs text-body">
        {content}
      </span>
    </button>
  );
}
