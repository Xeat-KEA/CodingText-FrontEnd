import { useState } from "react";
import { MultiSelectionCheckIcon, ShowMoreIcon } from "./Icons";
import { IMultiSelectionDropdown } from "../_interfaces/interfaces";
import { useOutsideClick } from "../_hooks/useOutsideClick";

export default function MultiSelectionDropdown({
  placeholder,
  list,
  selectedList,
  onSelectionClick,
}: IMultiSelectionDropdown) {
  const [isListOpen, setIsListOpen] = useState(false);
  const ref = useOutsideClick(
    () => isListOpen && setIsListOpen((prev) => !prev)
  );

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
                onSelectionClick(el);
              }}
              key={index}
            >
              <span
                className={
                  selectedList.indexOf(el) === -1
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
