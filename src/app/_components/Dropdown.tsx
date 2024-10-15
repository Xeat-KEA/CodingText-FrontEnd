import { useState } from "react";
import { IDropDown } from "../_interfaces/interfaces";
import { ShowMoreIcon } from "./Icons";
import { useOutsideClick } from "../_hooks/useOutsideClick";

export default function DropDown({
  isSmall,
  borderRight,
  selection,
  list,
  onSelectionClick,
  placeholder,
}: IDropDown) {
  const [isListOpen, setIsListOpen] = useState(false);
  const ref = useOutsideClick(
    () => isListOpen && setIsListOpen((prev) => !prev)
  );

  return (
    <div
      ref={ref}
      onClick={() => setIsListOpen((prev) => !prev)}
      className={`relative flex items-center w-full bg-white cursor-pointer ${
        isSmall ? "px-2 py-[6px]" : "px-4 py-2"
      } ${
        !borderRight
          ? "border border-border-2 rounded-lg"
          : "border-r border-border-2"
      } ${isListOpen && "z-20"}`}
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
        <ul className="absolute w-full left-0 top-[calc(100%+8px)] flex flex-col divide-y bg-white border border-border-2 rounded-lg shadow-1 cursor-pointer max-h-[200px] overflow-auto">
          {list.map((el, index) => (
            <li
              className={`w-full flex justify-center text-xs text-black ${
                isSmall ? "px-2 py-[6px]" : "px-4 py-2"
              }`}
              onClick={() => onSelectionClick(el)}
              key={index}
            >
              {el}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
