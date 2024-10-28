import SmBackBtn from "@/app/_components/SmBackBtn";
import { SignInTitleProps } from "../_interfaces/interfaces";
import { useRouter } from "next/navigation";

export default function SignInTitle({
  title,
  content,
  hasBackBtn,
}: SignInTitleProps) {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-4 items-center relative">
      <span className="sign-in-title">{title}</span>
      {content && <span className="sign-in-content">{content}</span>}
      {hasBackBtn && (
        <div className="absolute left-0 top-0 -translate-y-full">
          <SmBackBtn content="이전으로" onClick={() => router.back()} />
        </div>
      )}
    </div>
  );
}
