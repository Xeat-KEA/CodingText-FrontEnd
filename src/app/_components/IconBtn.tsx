import { BpEditIcon, SmDeleteIcon } from "../(blog)/_components/Icons";
import { IconBtnProps } from "../_interfaces/interfaces";
import { ReportIcon } from "./Icons";

export default function IconBtn({ type, content, onClick }: IconBtnProps) {
  return (
    <button onClick={onClick} className="flex-center gap-1">
      {/* type에 따라 아이콘 세팅 */}
      {type === "edit" && <BpEditIcon />}
      {type === "delete" && <SmDeleteIcon />}
      {type === "report" && <ReportIcon />}
      <span
        className={`text-xs font-semibold whitespace-nowrap ${
          type === "edit" ? "text-primary-1" : "text-red"
        }`}
      >
        {content}
      </span>
    </button>
  );
}