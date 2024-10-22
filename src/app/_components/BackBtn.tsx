import { useRouter } from "next/navigation";
import { LgBackIcon } from "./Icons";
import { IBackBtn } from "../_interfaces/interfaces";

export default function BackBtn({ title, onClick }:IBackBtn) {
  const router = useRouter();
  

  return (
    <button className="flex items-center gap-1 p-1" onClick={onClick}>
      <LgBackIcon />
      <span className="text-sm text-body font-semibold">
        {title}
      </span>
    </button>
  );
}