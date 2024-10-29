import { useRouter } from "next/navigation";
import { SignInBtnProps } from "../_interfaces/interfaces";

export default function SignInBtn({
  icon,
  service,
  redirectionURL,
}: SignInBtnProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(redirectionURL)}
      className="sm-btn-default flex-center gap-4"
    >
      {icon}
      <span>{service} 계정으로 로그인</span>
    </button>
  );
}
