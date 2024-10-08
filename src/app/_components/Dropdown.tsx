import { useState } from "react";
import { IDropDown } from "../_interfaces/interfaces";
import { ShowMoreIcon } from "./Icons";

export default function DropDown({
  isSmall,
  selection,
  list,
  onSelectionClick,
  placeholder,
}: IDropDown) {
  const [isListOpen, setIsListOpen] = useState(false);
  return (
    <div
      onClick={() => setIsListOpen((prev) => !prev)}
      className={`relative flex w-full bg-white border border-border-2 rounded-lg cursor-pointer ${
        isSmall ? "px-2 py-[6px]" : "px-4 py-2"
      }`}
    >
      <div className={`${isListOpen && "rotate-180"}`}>
        <ShowMoreIcon />
      </div>
      <span
        className={`grow flex justify-center text-xs text-black ${
          !selection && "text-disabled"
        }`}
      >
        {selection ? selection : placeholder || "선택"}
      </span>
      {/* 선택 항목 목록 */}
      {isListOpen && (
        <ul className="absolute w-full left-0 top-[calc(100%+8px)] flex flex-col divide-y bg-white border border-border-2 rounded-lg shadow-1 cursor-pointer">
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
