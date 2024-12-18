import { useRouter } from "next/navigation";
import { MoreContentArrowIcon } from "./Icons";
import MainCodeCard from "./MainCodeCard";
import { MainCodeListProps } from "../_interfaces/interfaces";

export default function MainCodes({
  title,
  subTitle,
  url,
  sliderList,
}: MainCodeListProps) {
  const router = useRouter();

  return (
    <div className="main-container">
      {/* 코드 목록 제목 / 설명 */}
      <div className="main-text-container">
        <div
          onClick={() => router.push(url)}
          className="main-title-container cursor-pointer hover:underline"
        >
          <span className="main-title">{title}</span>
          <MoreContentArrowIcon />
        </div>
        {subTitle && <span className="main-sub-title">{subTitle}</span>}
      </div>
      {/* 코드 목록 */}
      <div className="main-codes-container">
        {sliderList &&
          sliderList.map((el) => (
            <MainCodeCard key={"code" + el.codeId} code={el} />
          ))}
      </div>
    </div>
  );
}
