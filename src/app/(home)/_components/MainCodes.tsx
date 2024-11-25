import { useRouter } from "next/navigation";
import { MainCodeListProps } from "../_interfaces/interfaces";
import { MoreContentArrowIcon } from "./Icons";
import MainCodeCard from "./MainCodeCard";

export default function MainCodeList({
  title,
  subTitle,
  url,
  sliderList,
}: MainCodeListProps) {
  const router = useRouter();

  return (
    <div className="main-container">
      {/* 코드 목록 제목 / 설명 */}
      <div className="main-text-container cursor-pointer">
        <div onClick={() => router.push(url)} className="main-title-container">
          <span className="main-title">{title}</span>
          <MoreContentArrowIcon />
        </div>
        {subTitle && <span className="main-sub-title">{subTitle}</span>}
      </div>
      {/* 코드 목록 */}
      <div className="main-code-list-container">
        {sliderList &&
          sliderList.map((el) => (
            <MainCodeCard
              key={el.codeNum}
              codeNum={el.codeNum}
              title={el.title}
              algorithm={el.algorithm}
              difficulty={el.difficulty}
              participants={el.participants}
              rate={el.rate}
            />
          ))}
      </div>
    </div>
  );
}
