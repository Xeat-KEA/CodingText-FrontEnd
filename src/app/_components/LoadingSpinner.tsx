import { ProgressSpinner } from "primereact/progressspinner";

export default function LoadingSpinner({
  textColor,
}: {
  textColor?: "black" | "white" | "primary";
}) {
  return (
    <div className="w-full h-full flex-center flex-col gap-4">
      <ProgressSpinner
        style={{ width: "50px", height: "50px" }}
        strokeWidth="4"
        animationDuration="1s"
      />
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
