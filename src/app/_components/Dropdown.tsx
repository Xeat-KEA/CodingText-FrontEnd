import { useState } from "react";
import { ShowMoreIcon } from "./Icons";
import { useOutsideClick } from "../_hooks/useOutsideClick";
import { DropDownProps } from "../_interfaces/interfaces";

export default function DropDown({
  isSmall,
  borderRight,
  selection,
  list,
  onSelectionClick,
  placeholder,
  showListUpward,
}: DropDownProps) {
  const [isListOpen, setIsListOpen] = useState(false);
  const ref = useOutsideClick(
    () => isListOpen && setIsListOpen((prev) => !prev)
  );

  return (
    <div
      ref={ref}
      onClick={() => list?.length !== 0 && setIsListOpen((prev) => !prev)}
      className={`relative flex items-center w-full ${
        isSmall ? "px-2 py-[6px]" : "px-4 py-2"
      } ${
        !borderRight
          ? "border border-border-2 rounded-lg"
          : "border-r border-border-2"
      } ${isListOpen && "z-10"} ${
        list?.length === 0 ? "bg-bg-1" : "bg-white cursor-pointer"
      }`}
    >
      <div className={`${isListOpen && "rotate-180"}`}>
        <ShowMoreIcon />
      </div>
      <span
        className={`grow flex justify-center text-xs text-black whitespace-nowrap ${
          !selection && "text-disabled"
        }`}
      >
        {selection ? selection : placeholder || "선택"}
      </span>
      {/* 선택 항목 목록 */}
      {isListOpen && (
        <ul
          className={`absolute w-full left-0 ${
            !showListUpward ? "top-[calc(100%+8px)]" : "bottom-[calc(100%+8px)]"
          } flex flex-col divide-y bg-white border border-border-2 rounded-lg shadow-1 cursor-pointer max-h-[200px] overflow-auto`}
        >
          {list &&
            list.map((el, index) => (
              <li
                className={`w-full flex justify-center text-xs text-black ${
                  isSmall ? "px-2 py-[6px]" : "px-4 py-2"
                }`}
                onClick={() => onSelectionClick(el)}
                key={index}
              >
                {el.content}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
