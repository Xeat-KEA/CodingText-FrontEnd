import { ProgressSpinner } from "primereact/progressspinner";

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center">
      <ProgressSpinner />
      <span>로딩 중이에요!</span>
    </div>
  );
}
