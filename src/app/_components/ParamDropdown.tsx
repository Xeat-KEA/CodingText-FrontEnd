import { useState } from "react";
import { ParamDropdownProps } from "../_interfaces/interfaces";
import { ShowMoreIcon } from "./Icons";
import { useOutsideClick } from "../_hooks/useOutsideClick";
import { useSearchParams } from "next/navigation";
import { useSetParams } from "../_hooks/useSetParams";

export default function ParamDropDown({
  isSmall,
  list,
  paramType,
  placeholder,
}: ParamDropdownProps) {
  const searchParams = useSearchParams();
  // 파라미터 설정을 위한 custom hook 호출
  const setParams = useSetParams();

  const [isListOpen, setIsListOpen] = useState(false);
  const ref = useOutsideClick(
    () => isListOpen && setIsListOpen((prev) => !prev)
  );

  return (
    <div
      ref={ref}
      onClick={() => setIsListOpen((prev) => !prev)}
      className={`relative flex items-center w-full bg-white cursor-pointer border border-border-2 rounded-lg ${
        isSmall ? "px-2 py-[6px]" : "px-4 py-2"
      } ${isListOpen && "z-20"}`}
    >
      <div className={`${isListOpen && "rotate-180"}`}>
        <ShowMoreIcon />
      </div>
      <span className="grow flex justify-center text-xs text-black whitespace-nowrap">
        {searchParams.get(paramType)
          ? searchParams.get(paramType)
          : placeholder}
      </span>
      {/* 선택 항목 목록 */}
      {isListOpen && (
        <ul className="absolute w-full left-0 top-[calc(100%+8px)] flex flex-col divide-y bg-white border border-border-2 rounded-lg shadow-1 cursor-pointer max-h-[200px] overflow-auto">
          {list.map((el, index) => (
            <li
              key={index}
              className={`w-full flex justify-center text-xs text-black ${
                isSmall ? "px-2 py-[6px]" : "px-4 py-2"
              }`}
              onClick={() => setParams("order", el)}
            >
              {el}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
