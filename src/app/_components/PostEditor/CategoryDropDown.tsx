import { useOutsideClick } from "@/app/_hooks/useOutsideClick";
import { CategoryDropDownProps } from "@/app/_interfaces/interfaces";
import { useState } from "react";
import { ShowMoreIcon } from "../Icons";

export default function CategoryDropDown({
  list,
  selection,
  onSelectionClick,
  placeholder,
}: CategoryDropDownProps) {
  const [isListOpen, setIsListOpen] = useState(false);
  const ref = useOutsideClick(
    () => isListOpen && setIsListOpen((prev) => !prev)
  );

  return (
    <div
      ref={ref}
      onClick={() => list && setIsListOpen((prev) => !prev)}
      className={`relative flex items-center w-full px-4 py-2 border border-border-2 rounded-lg ${
        isListOpen && "z-10"
      } ${!list ? "bg-bg-1" : "bg-white cursor-pointer"}`}
    >
      <div className={`${isListOpen && "rotate-180"}`}>
        <ShowMoreIcon />
      </div>
      <span
        className={`grow flex justify-center text-xs text-black whitespace-nowrap ${
          !selection && "text-disabled"
        }`}
      >
        {selection ? selection.title : placeholder || "선택"}
      </span>
      {/* 선택 항목 목록 */}
      {isListOpen && (
        <ul className="absolute w-full left-0 top-[calc(100%+8px)] flex flex-col divide-y bg-white border border-border-2 rounded-lg shadow-1 cursor-pointer max-h-[200px] overflow-auto">
          {list &&
            list.map((el, index) => (
              <li
                className="w-full flex justify-center text-xs text-black px-4 py-2"
                onClick={() => onSelectionClick(el)}
                key={index}
              >
                {el.title}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
