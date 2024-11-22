import { LogoIcon } from "@/app/_components/Icons";
import LoadingSpinner from "@/app/_components/LoadingSpinner";

export default function SocialCallBackPage() {
  return (
    <div className="top-container">
      <div className="max-w-400 min-h-screen flex flex-col items-center justify-between py-20">
        <LogoIcon />
        <div className="w-full h-full flex-center">
          <LoadingSpinner />
        </div>
      </div>
    </div>
  );
}
