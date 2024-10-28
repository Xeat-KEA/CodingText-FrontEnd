import { SignInTitleProps } from "../_interfaces/interfaces";
import SmBackBtn from "./SmBackBtn";

export default function SignInTitle({
  title,
  content,
  hasBackBtn,
}: SignInTitleProps) {
  return (
    <div className="flex flex-col gap-4 items-center relative">
      <span className="sign-in-title">{title}</span>
      {content && <span className="sign-in-content">{content}</span>}
      {hasBackBtn && <SmBackBtn />}
    </div>
  );
}
