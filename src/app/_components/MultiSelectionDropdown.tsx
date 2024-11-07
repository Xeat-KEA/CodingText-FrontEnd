import { MouseEvent, useState } from "react";
import { MultiSelectionCheckIcon, ShowMoreIcon } from "./Icons";
import { MultiSelectionDropDownProps } from "../_interfaces/interfaces";
import { useOutsideClick } from "../_hooks/useOutsideClick";
import { useSetParams } from "../_hooks/useSetParams";
import { useSearchParams } from "next/navigation";

export default function MultiSelectionDropDown({
  placeholder,
  list,
  paramType,
}: MultiSelectionDropDownProps) {
  const searchParams = useSearchParams();
  // 파라미터 설정을 위한 custom hook 호출
  const setParams = useSetParams();

  const [isListOpen, setIsListOpen] = useState(false);
  const ref = useOutsideClick(
    () => isListOpen && setIsListOpen((prev) => !prev)
  );

  // 항목 선택 시 파라미터 수정
  const onSelectionClick = (e: MouseEvent, selected: string) => {
    // useOutsideClick 무시
    e.stopPropagation();

    const currentList = searchParams.get(paramType)?.split(",") || [];
    setParams(paramType, {
      selected,
      list: currentList,
    });
  };

  return (
    <div
      ref={ref}
      onClick={() => setIsListOpen((prev) => !prev)}
      className="relative flex w-full bg-white cursor-pointer px-4 py-2 border border-border-2 rounded-lg text-black"
    >
      <div className={`flex items-center ${isListOpen && "rotate-180"}`}>
        <ShowMoreIcon />
      </div>
      <span className="grow flex justify-center items-center text-xs text-black whitespace-nowrap">
        {placeholder}
      </span>
      {/* 선택 항목 목록 */}
      {isListOpen && (
        <ul className="absolute w-full left-0 top-[calc(100%+8px)] flex flex-col divide-y bg-white border border-border-2 rounded-lg shadow-1 cursor-pointer">
          {list.map((el, index) => (
            <li
              className="w-full flex text-xs text-black px-4 py-2 gap-2 items-center"
              onClick={(e) => onSelectionClick(e, el.selection)}
              key={index}
            >
              <span
                className={
                  !searchParams
                    .get(paramType)
                    ?.split(",")
                    .some((item) => item === el.selection)
                    ? "text-disabled"
                    : "text-primary-1"
                }
              >
                <MultiSelectionCheckIcon />
              </span>
              <span className="w-full grow flex justify-center">
                {el.content}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
