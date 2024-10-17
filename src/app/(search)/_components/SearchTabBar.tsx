import { SearchTabBarProps } from "@/app/_interfaces/interfaces";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import TabBarFilter from "./TabBarFilter";
import { useSetParams } from "@/app/_hooks/useSetParams";

export default function SearchTabBar({ menuList }: SearchTabBarProps) {
  const searchParams = useSearchParams();
  const setParams = useSetParams();

  return (
    <div className="w-full h-[52px] flex justify-between items-center shrink-0 border-b border-border-2">
      {/* 탭 버튼 */}
      <nav className="flex h-full">
        {menuList.map((el, index) => (
          <div
            key={index}
            className={`pr-4 cursor-pointer ${index !== 0 && "pl-4"}`}
            onClick={() => setParams("tab", el.param)}
          >
            <span
              className={`flex items-center text-sm text-black  h-full ${
                searchParams.get("tab") === el.param &&
                "font-bold border-b-[3px] border-primary pt-[3px]"
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
