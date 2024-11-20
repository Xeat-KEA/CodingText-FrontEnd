import { TabBarProps } from "@/app/_interfaces/interfaces";
import { useTabStore } from "@/app/stores";
import { useEffect } from "react";

export default function TabBar({ menuList }: TabBarProps) {
  // 전역 변수
  const { tab, setTab } = useTabStore();

  useEffect(() => {
    setTab(menuList[0]);
  }, []);

  return (
    <div className="w-full h-[52px] flex justify-between items-center shrink-0 border-b border-border-2">
      {/* 탭 버튼 */}
      <nav className="flex h-full">
        {menuList.map((el, index) => (
          <div
            key={index}
            className={`pr-4 cursor-pointer ${index !== 0 && "pl-4"}`}
            onClick={() => setTab(el)}
          >
            <span
              className={`flex items-center text-sm text-black  h-full ${
                (tab ? el === tab : el === menuList[0]) &&
                "font-bold border-b-[3px] border-primary-1 pt-[3px]"
              }`}
            >
              {el}
            </span>
          </div>
        ))}
      </nav>
    </div>
  );
}
