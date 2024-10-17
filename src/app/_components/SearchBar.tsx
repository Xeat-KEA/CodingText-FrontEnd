import { useEffect } from "react";
import { ISearchBar } from "../_interfaces/interfaces";
import { useSearchFilterStore } from "../stores";
import DropDown from "./Dropdown";
import { LgSearchIcon, SmSearchIcon } from "./Icons";

export default function SearchBar({ isSmall, searchFilterList }: ISearchBar) {
  const { filter, setFilter } = useSearchFilterStore();
  // 필터 초기값 설정
  useEffect(() => {
    if (searchFilterList !== undefined) {
      setFilter(searchFilterList[0]);
    }
  }, [searchFilterList]);
  return (
    <div className="flex items-center gap-4">
      {searchFilterList && (
        <div className="w-[92px] shrink-0">
          <DropDown
            isSmall
            borderRight
            list={searchFilterList}
            selection={filter ? filter : searchFilterList[0]}
            onSelectionClick={(selected) => setFilter(selected)}
          />
        </div>
      )}
      <form
        className={`flex gap-2 w-full border border-border-2 rounded-full ${
          isSmall ? "px-4 py-2" : "px-6 py-3"
        }`}
      >
        <input
          className={`grow ${isSmall ? "text-xs" : "text-lg font-semibold"}`}
          placeholder="검색어를 입력해주세요"
        />
        <button type="submit">
          {isSmall ? <SmSearchIcon /> : <LgSearchIcon />}
        </button>
      </form>
    </div>
  );
}
