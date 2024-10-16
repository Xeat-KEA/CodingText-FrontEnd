import { SearchTabBarProps } from "@/app/_interfaces/interfaces";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import TabBarFilter from "./TabBarFilter";

export default function SearchTabBar({ menuList }: SearchTabBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const setTab = (newTab: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("tab", newTab);
    router.push(`${pathname}?${newParams.toString()}`);
  };

  return (
    <div className="w-full h-[52px] flex justify-between items-center shrink-0 border-b border-border-2">
      {/* 탭 버튼 */}
      <nav className="flex h-full">
        {menuList.map((el, index) => (
          <div
            key={index}
            className={`pr-4 cursor-pointer ${index !== 0 && "pl-4"}`}
            onClick={() => setTab(el.param)}
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
      <TabBarFilter />
    </div>
  );
}
