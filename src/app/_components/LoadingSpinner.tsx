import LoadingAnimation from "./LoadingAnimation";

export default function LoadingSpinner({
  textColor,
}: {
  textColor?: "black" | "white" | "primary";
}) {
  return (
    <div className="w-full h-full flex-center flex-col gap-6">
      <LoadingAnimation />
      <span
        className={`${
          textColor === "primary"
            ? "!text-primary-1"
            : textColor === "white"
            ? "!text-white"
            : "!text-black"
        } text-sm font-semibold`}
      >
        로딩 중이에요!
      </span>
    </div>
  );
}
