import { PolicyContainerProps } from "../_interfaces/interfaces";
import SignInTitle from "./SignInTitle";

export default function PolicyContainer({
  title,
  content,
}: PolicyContainerProps) {
  return (
    <div className="flex flex-col grow py-16 gap-8 w-full">
      <SignInTitle title={title} hasBackBtn />
      <div className="relative grow overflow-y-auto border border-border-2 rounded-2xl">
        <span className="absolute text-black whitespace-pre-wrap px-4 py-3 text-xs">
          {content}
        </span>
      </div>
    </div>
  );
}
