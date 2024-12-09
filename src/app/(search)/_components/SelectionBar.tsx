import { useSearchParams } from "next/navigation";
import TabBarFilter from "./TabBarFilter";
import { useSetParams } from "@/app/_hooks/useSetParams";
import { SelectionBarProps } from "@/app/_interfaces/interfaces";

export default function SelectionBar({ menuList }: SelectionBarProps) {
  const searchParams = useSearchParams();
  const setParams = useSetParams();

  return (
    <div className="w-full flex max-sm:flex-col-reverse justify-between sm:items-center shrink-0 border-b border-border-2 max-sm:gap-4">
      {/* 탭 버튼 */}
      <nav className="flex h-[52px]">
        {menuList.map((el, index) => (
          <div
            key={index}
            className={`pr-4 cursor-pointer ${index !== 0 && "pl-4"}`}
            onClick={() => setParams("tab", el.selection)}
          >
            <span
              className={`flex items-center text-sm text-black  h-full ${
                searchParams.get("tab") === el.selection &&
                "font-bold border-b-[3px] border-primary-1 pt-[3px]"
              }`}
            >
              {el.content}
            </span>
          </div>
        ))}
      </nav>
      {/* 필터링 */}
      {<TabBarFilter />}
    </div>
  );
}
