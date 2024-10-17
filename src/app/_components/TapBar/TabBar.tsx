import { ITabBar } from "@/app/_interfaces/interfaces";
import { useCodingTestStore, useTabStore } from "@/app/stores";
import { useEffect } from "react";
import DropDown from "../Dropdown";

export default function TabBar({ menuList, dropDownList }: ITabBar) {
  // 전역 변수
  const { tab, setTab } = useTabStore();
  const { language, setLanguage } = useCodingTestStore();

  // 전역 변수 초기값 설정
  useEffect(() => {
    setTab(menuList[0]);
    dropDownList && setLanguage(dropDownList[0]);
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
                "font-bold border-b-[3px] border-primary pt-[3px]"
              }`}
            >
              {el}
            </span>
          </div>
        ))}
      </nav>
      {/* 드롭다운 */}
      {dropDownList && (
        <div className="w-[120px]">
          <DropDown
            selection={language}
            onSelectionClick={(selected) => setLanguage(selected)}
            list={dropDownList}
            isSmall
          />
        </div>
      )}
    </div>
  );
}