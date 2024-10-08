import { useRouter } from "next/navigation";
import { SmBackIcon } from "./Icons";

export default function SmBackBtn() {
  const router = useRouter();
  return (
    <button className="flex items-center gap-1 absolute left-0 top-0 -translate-y-full">
      <SmBackIcon />
      <span onClick={() => router.back()} className="text-xs text-body">
        이전으로
      </span>
    </button>
  );
}
