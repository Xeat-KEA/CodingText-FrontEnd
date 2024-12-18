import { ProfileInfoProps } from "../_interfaces/interfaces";

export default function ProfileInfo({ category, content }: ProfileInfoProps) {
  // 제목, 단위 설정
  const returnInfo = (isUnit?: boolean) => {
    if (category === "solved") {
      return !isUnit ? "해결한 문제" : "개";
    } else if (category === "registered") {
      return !isUnit ? "정식 등록된 문제" : "개";
    } else if (category === "score") {
      return !isUnit ? "점수" : "점";
    } else if (category === "ranking") {
      return !isUnit ? "등수" : "등";
    }
  };

  return (
    <div className="flex w-full justify-between items-center">
      <span className="text-xs text-black">{returnInfo()}</span>
      <span className="text-sm font-bold text-primary-1">{`${content.toLocaleString()}${returnInfo(
        true
      )}`}</span>
    </div>
  );
}
