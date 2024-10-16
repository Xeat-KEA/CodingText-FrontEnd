import { useEffect, useState } from "react";
import { MultiSelectionCheckIcon, ShowMoreIcon } from "./Icons";
import { IMultiSelectionDropdown } from "../_interfaces/interfaces";
import { useOutsideClick } from "../_hooks/useOutsideClick";
import { useSetParams } from "../_hooks/useSetParams";
import { useSearchParams } from "next/navigation";

export default function MultiSelectionDropdown({
  placeholder,
  list,
  paramType,
}: IMultiSelectionDropdown) {
  const [paramList, setParamList] = useState<string[]>([]);
  const searchParams = useSearchParams();
  // 파라미터 설정을 위한 custom hook 호출
  const setParams = useSetParams();

  const [isListOpen, setIsListOpen] = useState(false);
  const ref = useOutsideClick(
    () => isListOpen && setIsListOpen((prev) => !prev)
  );

  useEffect(() => {
    // 파라미터 변경 시, URL의 query string에서 초기 파라미터를 가져와서 설정
    const initialParams = searchParams.get(paramType);
    // 초기 파라미터를 배열로 변환
    if (initialParams) {
      setParamList(initialParams.split(","));
    }
  }, [searchParams, paramType]);

  return (
    <div
      ref={ref}
      onClick={() => setIsListOpen((prev) => !prev)}
      className="relative flex w-full bg-white cursor-pointer px-4 py-2 border border-border-2 rounded-lg text-black"
    >
      <div className={`${isListOpen && "rotate-180"}`}>
        <ShowMoreIcon />
      </div>
      <span className="grow flex justify-center text-xs text-black whitespace-nowrap">
        {placeholder}
      </span>
      {/* 선택 항목 목록 */}
      {isListOpen && (
        <ul className="absolute w-full left-0 top-[calc(100%+8px)] flex flex-col divide-y bg-white border border-border-2 rounded-lg shadow-1 cursor-pointer">
          {list.map((el, index) => (
            <li
              className="w-full flex text-xs text-black px-4 py-2 gap-2 items-center"
              onClick={(e) => {
                e.stopPropagation();
                setParams(paramType, {
                  selected: el,
                  list: paramList,
                });
              }}
              key={index}
            >
              <span
                className={
                  !searchParams.get(paramType)?.includes(el)
                    ? "text-disabled"
                    : "text-primary"
                }
              >
                <MultiSelectionCheckIcon />
              </span>
              <span className="w-full grow flex justify-center">{el}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
