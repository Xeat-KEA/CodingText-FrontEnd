import { PolicyContainerProps } from "../_interfaces/interfaces";
import SmBackBtn from "./SmBackBtn";

export default function PolicyContainer({
  title,
  content,
}: PolicyContainerProps) {
  return (
    <div className="flex flex-col grow py-16 gap-8 w-full">
      <div className="w-full flex justify-center relative">
        <span className="sign-in-title">{title}</span>
        <SmBackBtn />
      </div>
      <div className="relative grow overflow-y-auto border border-border-2 rounded-2xl">
        <span className="absolute text-black whitespace-pre-wrap px-4 py-3 text-xs">
          {content}
        </span>
      </div>
    </div>
  );
}
