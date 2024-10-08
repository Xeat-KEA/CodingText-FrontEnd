import { IToggleBtn } from "../_interfaces/interfaces";

export default function ToggleBtn({ content, state, onClick }: IToggleBtn) {
  return (
    <div className="flex gap-4 items-center">
      <span className="text-xs text-black">{content}</span>
      <div
        onClick={onClick}
        className={`w-10 h-5 rounded-full flex items-center px-[3px] cursor-pointer ${
          state ? "bg-green justify-end" : "bg-disabled justify-start"
        }`}
      >
        <div className="w-[14px] h-[14px] rounded-full bg-white" />
      </div>
    </div>
  );
}
